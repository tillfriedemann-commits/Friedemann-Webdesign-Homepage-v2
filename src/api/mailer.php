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
 *
 * @author  Friedemann Webdesign
 */

// ──────────────────────────────────────────────────────────────
// 1. KONFIGURATION
// ──────────────────────────────────────────────────────────────

// E-Mail-Adresse, an die Kontaktanfragen gesendet werden
$admin_email = 'info@friedemann-webdesign.de';   // ← ANPASSEN!

// Erlaubte Origin-Domain (für CORS) – ohne Trailing Slash
$allowed_origin = 'https://friedemann-webdesign.de'; // ← Für Localhost-Test; in Produktion auf deine Domain ändern!

// ──────────────────────────────────────────────────────────────
// 2. CORS & HTTP-HEADER
// ──────────────────────────────────────────────────────────────

// Content-Type der Antwort: immer JSON mit UTF-8
header('Content-Type: application/json; charset=utf-8');

// CORS-Header setzen – nur die eigene Domain darf zugreifen
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

$raw_input = file_get_contents('php://input');
$data = json_decode($raw_input, true);

if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Ungültiges JSON-Format.'
    ]);
    exit;
}

// ──────────────────────────────────────────────────────────────
// 5. HONEYPOT-PRÜFUNG (Spam-Schutz)
// ──────────────────────────────────────────────────────────────

// Wenn das versteckte Feld "website_url" einen Wert enthält,
// hat ein Bot das Formular ausgefüllt.
// → Wir antworten mit HTTP 200 (Success-Fake), senden aber KEINE Mail.
$honeypot = isset($data['website_url']) ? trim($data['website_url']) : '';

if (!empty($honeypot)) {
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
$name = isset($data['name']) ? sanitize_input($data['name']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$message = isset($data['message']) ? sanitize_message($data['message']) : '';
$selection = isset($data['selection']) ? sanitize_input($data['selection']) : 'Nicht angegeben';

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
function get_length($str)
{
    return function_exists('mb_strlen') ? mb_strlen($str, 'UTF-8') : strlen($str);
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

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode([
        'status' => 'error',
        'message' => implode(' ', $errors)
    ]);
    exit;
}

// E-Mail-Adresse nach Validierung ebenfalls sanitizen
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
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Versand via mail()
// Versand via mail()
// HINWEIS: Auf Localhost wird der Versand simuliert, da meist kein Mail-Server konfiguriert ist.
if ($_SERVER['REMOTE_ADDR'] === '127.0.0.1' || $_SERVER['REMOTE_ADDR'] === '::1') {
    $mail_sent = true;
} else {
    $mail_sent = mail($admin_email, $subject, $body, $headers);
}

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
