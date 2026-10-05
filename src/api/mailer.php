<?php
/**
 * ============================================================
 * mailer.php – Sicherer E-Mail-Versand für das Kontaktformular
 * ============================================================
 *
 * Dieses Skript nimmt JSON-kodierte Formulardaten per POST entgegen,
 * validiert sie und versendet eine E-Mail an die Admin-Adresse.
 *
 * Sicherheitsmaßnahmen:
 *   1. Strenge CORS-Header (nur die eigene Domain)
 *   2. Nur POST-Requests erlaubt
 *   3. Honeypot-Feld gegen Spam-Bots
 *   4. Input Sanitization gegen XSS & Header-Injection
 *   5. Strukturierte JSON-Antworten
 *   6. Request-Größenlimit, Feldtypenprüfung und IP-Rate-Limit
 *
 * @author  Friedemann Webdesign
 */

// ──────────────────────────────────────────────────────────────
// 1. KONFIGURATION
// ──────────────────────────────────────────────────────────────

// E-Mail-Adresse, an die Kontaktanfragen gesendet werden
$admin_email = 'info@friedemann-webdesign.de';   // ← ANPASSEN!

// Erlaubte Origin-Domain (für CORS) – ohne Trailing Slash
$allowed_origin = 'https://www.friedemann-webdesign.de';

const MAX_REQUEST_BYTES = 32768;
const RATE_LIMIT_COUNT = 5;
const RATE_LIMIT_WINDOW = 900;

ini_set('display_errors', '0');
set_exception_handler(function (Throwable $error): void {
    // Never expose PHP paths, input values or exception details to visitors.
    error_log('Kontaktformular: interner Verarbeitungsfehler.');
    respond(500, 'error', 'Die Anfrage konnte gerade nicht verarbeitet werden. Bitte versuche es später erneut.');
});

function respond(int $code, string $status, string $message): void
{
    http_response_code($code);
    echo json_encode(['status' => $status, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

/** Shared, locked state outside the web root; do not trust forwarded client IPs. */
function enforce_rate_limit(): void
{
    $directory = getenv('FRIEDEMANN_RATE_LIMIT_DIR') ?: sys_get_temp_dir() . '/friedemann-contact-' . substr(hash('sha256', __DIR__), 0, 16);
    if (!is_dir($directory) && !@mkdir($directory, 0700, true) && !is_dir($directory)) {
        respond(503, 'error', 'Das Formular ist gerade nicht verfügbar. Bitte kontaktiere mich direkt.');
    }
    $file = @fopen($directory . '/requests.json', 'c+');
    if ($file === false) {
        respond(503, 'error', 'Das Formular ist gerade nicht verfügbar. Bitte kontaktiere mich direkt.');
    }
    @chmod($directory . '/requests.json', 0600);
    $deadline = microtime(true) + 0.2;
    while (!flock($file, LOCK_EX | LOCK_NB)) {
        if (microtime(true) >= $deadline) {
            fclose($file);
            respond(503, 'error', 'Das Formular ist gerade ausgelastet. Bitte versuche es später erneut.');
        }
        usleep(10000);
    }
    $raw = stream_get_contents($file, 1048577);
    $state = $raw === '' ? [] : json_decode($raw, true);
    if ($raw === false || strlen($raw) > 1048576 || !is_array($state)) {
        flock($file, LOCK_UN);
        fclose($file);
        respond(503, 'error', 'Das Formular ist gerade nicht verfügbar. Bitte kontaktiere mich direkt.');
    }
    $now = time();
    foreach ($state as $key => $times) {
        $recent = is_array($times) ? array_values(array_filter($times, static function ($stamp) use ($now): bool {
            return is_int($stamp) && $stamp > $now - RATE_LIMIT_WINDOW && $stamp <= $now;
        })) : [];
        if ($recent === []) { unset($state[$key]); } else { $state[$key] = $recent; }
    }
    $client = hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown');
    $attempts = $state[$client] ?? [];
    if (count($attempts) >= RATE_LIMIT_COUNT) {
        $retry = max(1, $attempts[0] + RATE_LIMIT_WINDOW - $now);
        flock($file, LOCK_UN);
        fclose($file);
        header('Retry-After: ' . $retry);
        respond(429, 'error', 'Du hast bereits mehrere Anfragen gesendet. Bitte warte 15 Minuten oder kontaktiere mich direkt.');
    }
    // Bound disk usage even when requests come from many different IPs.
    if (!isset($state[$client]) && count($state) >= 1000) {
        flock($file, LOCK_UN);
        fclose($file);
        respond(503, 'error', 'Das Formular ist gerade ausgelastet. Bitte kontaktiere mich direkt.');
    }
    $attempts[] = $now;
    $state[$client] = $attempts;
    $encoded = json_encode($state);
    rewind($file);
    $written = $encoded !== false && ftruncate($file, 0) && fwrite($file, $encoded) === strlen($encoded) && fflush($file);
    flock($file, LOCK_UN);
    fclose($file);
    if (!$written) {
        respond(503, 'error', 'Das Formular ist gerade nicht verfügbar. Bitte kontaktiere mich direkt.');
    }
}

// ──────────────────────────────────────────────────────────────
// 2. CORS & HTTP-HEADER
// ──────────────────────────────────────────────────────────────

// Content-Type der Antwort: immer JSON mit UTF-8
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

// Browser-CORS für die eigene Domain; der Missbrauchsschutz erfolgt serverseitig.
header('Access-Control-Allow-Origin: ' . $allowed_origin);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Preflight-Request (OPTIONS) sofort beantworten
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ──────────────────────────────────────────────────────────────
// 3. NUR POST ERLAUBEN
// ──────────────────────────────────────────────────────────────

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST, OPTIONS');
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Methode nicht erlaubt. Nur POST-Requests werden akzeptiert.'
    ]);
    exit;
}

// ──────────────────────────────────────────────────────────────
// 4. JSON-INPUT LESEN & DEKODIEREN
// ──────────────────────────────────────────────────────────────

$content_type = strtolower(trim(explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0]));
if ($content_type !== 'application/json') {
    respond(415, 'error', 'Bitte sende die Anfrage im JSON-Format.');
}
if (isset($_SERVER['CONTENT_LENGTH']) && (float) $_SERVER['CONTENT_LENGTH'] > MAX_REQUEST_BYTES) {
    respond(413, 'error', 'Die Anfrage ist zu groß. Bitte kürze deine Nachricht.');
}
// Read at most the limit plus one byte, including requests without Content-Length.
$input = fopen('php://input', 'rb');
$raw_input = $input === false ? false : stream_get_contents($input, MAX_REQUEST_BYTES + 1);
if ($input !== false) { fclose($input); }
if ($raw_input === false) { respond(400, 'error', 'Die Anfrage konnte nicht gelesen werden.'); }
if (strlen($raw_input) > MAX_REQUEST_BYTES) { respond(413, 'error', 'Die Anfrage ist zu groß. Bitte kürze deine Nachricht.'); }
$decoded = json_decode($raw_input, false, 16);

if (json_last_error() !== JSON_ERROR_NONE || !($decoded instanceof stdClass)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Ungültiges JSON-Format.'
    ]);
    exit;
}
$data = (array) $decoded;
foreach (['name', 'email', 'message', 'selection', 'website_url'] as $field) {
    if (array_key_exists($field, $data) && !is_string($data[$field])) {
        respond(400, 'error', 'Die Formularfelder müssen Text enthalten.');
    }
}

// ──────────────────────────────────────────────────────────────
// 5. HONEYPOT-PRÜFUNG (Spam-Schutz)
// ──────────────────────────────────────────────────────────────

// Wenn das versteckte Feld "website_url" einen Wert enthält,
// hat ein Bot das Formular ausgefüllt.
// → Wir antworten mit HTTP 200 (Success-Fake), senden aber KEINE Mail.
$honeypot = isset($data['website_url']) ? trim($data['website_url']) : '';

if ($honeypot !== '') {
    // Fake-Erfolg: Der Bot denkt, es hat geklappt
    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'message' => 'Vielen Dank für deine Nachricht!'
    ]);
    exit;
}

// ──────────────────────────────────────────────────────────────
// 6. PFLICHTFELDER EXTRAHIEREN & BEREINIGEN
// ──────────────────────────────────────────────────────────────

/**
 * Bereinigt einen String gegen XSS und Header-Injection.
 * - Entfernt Zeilenumbrüche (Schutz vor Header-Injection)
 * - Escaped HTML-Sonderzeichen
 * - Entfernt führende/nachfolgende Leerzeichen
 */
function sanitize_input(string $input): string
{
    // Zeilenumbrüche entfernen (Header-Injection-Schutz)
    $clean = str_replace(["\r", "\n"], '', $input);
    // HTML-Sonderzeichen escapen (XSS-Schutz)
    $clean = htmlspecialchars($clean, ENT_QUOTES, 'UTF-8');
    return trim($clean);
}

/**
 * Bereinigt mehrzeiligen Text (für die Nachricht).
 * Zeilenumbrüche bleiben erhalten, HTML wird escaped.
 */
function sanitize_message(string $input): string
{
    $clean = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    return trim($clean);
}

// Felder extrahieren
$name = isset($data['name']) ? trim($data['name']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$message = isset($data['message']) ? trim($data['message']) : '';
$selection = $data['selection'] ?? 'other';

// ──────────────────────────────────────────────────────────────
// 7. VALIDIERUNG
// ──────────────────────────────────────────────────────────────

$errors = [];

if (empty($name)) {
    $errors[] = 'Bitte gib deinen Namen an.';
}

if (empty($email)) {
    $errors[] = 'Bitte gib deine E-Mail-Adresse an.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Bitte gib eine gültige E-Mail-Adresse an.';
}

if (empty($message)) {
    $errors[] = 'Bitte schreibe eine Nachricht.';
}

// Maximallängen prüfen (DoS-Schutz)
function get_length(string $str): int
{
    return function_exists('mb_strlen') ? mb_strlen($str, 'UTF-8') : preg_match_all('/./us', $str);
}

if (get_length($name) > 200) {
    $errors[] = 'Der Name ist zu lang (max. 200 Zeichen).';
}
if (get_length($email) > 320) {
    $errors[] = 'Die E-Mail-Adresse ist zu lang.';
}
if (get_length($message) > 5000) {
    $errors[] = 'Die Nachricht ist zu lang (max. 5000 Zeichen).';
}
if (!in_array($selection, ['new', 'rework', 'maintenance', 'other'], true)) {
    $errors[] = 'Bitte wähle ein gültiges Thema.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode([
        'status' => 'error',
        'message' => implode(' ', $errors)
    ]);
    exit;
}

// E-Mail-Adresse nach Validierung ebenfalls sanitizen
enforce_rate_limit();
$name = sanitize_input($name);
$message = sanitize_message($message);
$email = filter_var($email, FILTER_SANITIZE_EMAIL);

// ──────────────────────────────────────────────────────────────
// 8. E-MAIL ZUSAMMENBAUEN & VERSENDEN
// ──────────────────────────────────────────────────────────────

// Service-Auswahl menschenlesbar machen
$service_labels = [
    'new' => 'Neue Website',
    'rework' => 'Website überarbeiten',
    'maintenance' => 'Regelmäßige Pflege',
    'other' => 'Sonstige IT-Frage',
];
$service_display = $service_labels[$selection] ?? $selection;

// Betreff
$subject = '=?UTF-8?B?' . base64_encode('Neue Kontaktanfrage von ' . $name) . '?=';

// E-Mail-Body (Plain Text)
$body = "Neue Kontaktanfrage über das Webformular\n";
$body .= "========================================\n\n";
$body .= "Name:     {$name}\n";
$body .= "E-Mail:   {$email}\n";
$body .= "Service:  {$service_display}\n\n";
$body .= "Nachricht:\n";
$body .= "----------------------------------------\n";
$body .= $message . "\n";
$body .= "----------------------------------------\n\n";
$body .= "Gesendet am: " . date('d.m.Y \u\m H:i \U\h\r') . "\n";

// E-Mail-Header (UTF-8, Reply-To auf Absender)
$headers = "From: Webformular <info@friedemann-webdesign.de>\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "MIME-Version: 1.0\r\n";

// Tests configure sendmail_path to a local stub; success always reflects mail().
$mail_sent = @mail($admin_email, $subject, $body, $headers);

// ──────────────────────────────────────────────────────────────
// 9. ANTWORT ZURÜCKGEBEN
// ──────────────────────────────────────────────────────────────

if ($mail_sent) {
    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'message' => 'Vielen Dank! Deine Nachricht wurde erfolgreich gesendet.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Beim Versenden ist ein Fehler aufgetreten. Bitte versuche es später erneut.'
    ]);
}
