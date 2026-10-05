<?php
// Run inside the isolated PHP container documented in security/README.md.
// No SMTP service or network access is needed; mail() uses a local capture stub.
if (($argv[1] ?? '') === '--submit') {
    $context = stream_context_create(['http' => [
        'method' => 'POST', 'header' => "Content-Type: application/json\r\n",
        'content' => json_encode(['name' => 'Test', 'email' => 'test@example.invalid', 'message' => 'Parallel test']),
        'ignore_errors' => true, 'timeout' => 5,
    ]]);
    file_get_contents('http://127.0.0.1:8088/mailer.php', false, $context);
    preg_match('/HTTP\/\S+ (\d+)/', $http_response_header[0] ?? '', $matches);
    echo $matches[1] ?? '0';
    exit;
}
putenv('PHP_CLI_SERVER_WORKERS=4');
$server = proc_open([
    PHP_BINARY, '-d', 'sendmail_path=/bin/sh /project/security/tests/mail-stub.sh',
    '-S', '127.0.0.1:8088', '-t', '/project/src/api',
], [0 => ['pipe', 'r'], 1 => ['file', '/tmp/php-server.log', 'a'], 2 => ['file', '/tmp/php-server.log', 'a']], $pipes);
if (!is_resource($server)) { throw new RuntimeException('PHP server failed to start'); }

function check(bool $condition, string $label): void {
    if (!$condition) { throw new RuntimeException($label); }
    echo "PASS: $label\n";
}

function request(string $body, int $expected, string $label, string $method = 'POST', string $contentType = 'application/json', bool $chunked = false): array {
    if ($chunked) {
        $socket = fsockopen('127.0.0.1', 8088, $errno, $error, 3);
        fwrite($socket, "POST /mailer.php HTTP/1.1\r\nHost: localhost\r\nContent-Type: application/json\r\nTransfer-Encoding: chunked\r\nConnection: close\r\n\r\n" . dechex(strlen($body)) . "\r\n" . $body . "\r\n0\r\n\r\n");
        $response = stream_get_contents($socket);
        fclose($socket);
        [$headerText, $responseBody] = explode("\r\n\r\n", $response, 2);
        $headers = explode("\r\n", $headerText);
    } else {
        $context = stream_context_create(['http' => [
            'method' => $method, 'header' => "Content-Type: $contentType\r\n",
            'content' => $body, 'ignore_errors' => true, 'timeout' => 3,
        ]]);
        $responseBody = file_get_contents('http://127.0.0.1:8088/mailer.php', false, $context);
        $headers = $http_response_header ?? [];
    }
    preg_match('/HTTP\/\S+ (\d+)/', $headers[0] ?? '', $matches);
    check((int) ($matches[1] ?? 0) === $expected, "$label (HTTP $expected)");
    if ($expected !== 204) {
        $json = json_decode($responseBody, true);
        check(is_array($json) && is_string($json['status'] ?? null) && is_string($json['message'] ?? null), "$label: structured JSON");
    }
    return $headers;
}

try {
    for ($i = 0; $i < 40; $i++) {
        $socket = @fsockopen('127.0.0.1', 8088, $errno, $error, 0.1);
        if ($socket) { fclose($socket); break; }
        usleep(50000);
    }
    $valid = ['name' => 'Test Person', 'email' => 'test@example.invalid', 'message' => 'Fiktive Testanfrage.', 'selection' => 'new', 'website_url' => ''];
    request('', 405, 'GET rejected', 'GET');
    request('', 204, 'OPTIONS preflight', 'OPTIONS');
    request('{}', 415, 'Wrong media type', 'POST', 'text/plain');
    foreach (['{broken', '[]', 'null', '"text"', '42'] as $body) { request($body, 400, 'Malformed/non-object JSON'); }
    foreach (array_keys($valid) as $field) {
        foreach ([[], (object) ['nested' => 'value'], null, 12, true] as $wrongType) {
            $input = $valid;
            $input[$field] = $wrongType;
            request(json_encode($input), 400, "Wrong type for $field");
        }
    }
    request('{}', 422, 'Missing required fields');
    foreach (['name' => str_repeat('a', 201), 'email' => "test@example.invalid\r\nBcc: injected@example.invalid", 'message' => str_repeat('a', 5001), 'selection' => 'unknown'] as $field => $value) {
        request(json_encode(array_replace($valid, [$field => $value])), 422, "Invalid/overlong $field");
    }
    request(json_encode(array_replace($valid, ['message' => str_repeat('a', 33000)])), 413, 'Body cap with Content-Length');
    request(json_encode(array_replace($valid, ['message' => str_repeat('a', 33000)])), 413, 'Body cap without Content-Length', 'POST', 'application/json', true);
    request(json_encode(array_replace($valid, ['website_url' => 'spam.invalid'])), 200, 'Honeypot fake success');
    request(json_encode(array_replace($valid, ['website_url' => '0'])), 200, 'Non-empty numeric-text honeypot');
    check(!file_exists('/tmp/mail-stub.log'), 'Rejected requests and honeypot sent no mail');
    $unicode = array_replace($valid, ['message' => str_repeat('😀', 5000)]);
    request(json_encode($unicode, JSON_UNESCAPED_UNICODE), 200, '5000 Unicode characters accepted');
    for ($i = 0; $i < 4; $i++) { request(json_encode($valid), 200, 'Valid submission accepted'); }
    $headers = request(json_encode($valid), 429, 'Sixth submission rate limited');
    check((bool) preg_grep('/^Retry-After: [1-9]\d*$/i', $headers), 'Rate limit supplies Retry-After');
    check(substr_count(file_get_contents('/tmp/mail-stub.log'), '--- TEST MAIL ---') === 5, 'Exactly five messages captured by stub');
    check(!str_contains(file_get_contents('/tmp/mail-stub.log'), 'Bcc: injected'), 'Header injection never reaches mail');
    file_put_contents(getenv('FRIEDEMANN_RATE_LIMIT_DIR') . '/requests.json', '{broken');
    request(json_encode($valid), 503, 'Corrupt rate-limit state fails closed');
    chmod(getenv('FRIEDEMANN_RATE_LIMIT_DIR') . '/requests.json', 0000);
    request(json_encode($valid), 503, 'Unavailable rate-limit storage fails closed');
    chmod(getenv('FRIEDEMANN_RATE_LIMIT_DIR') . '/requests.json', 0600);
    file_put_contents(getenv('FRIEDEMANN_RATE_LIMIT_DIR') . '/requests.json', '{}');
    unlink('/tmp/mail-stub.log');
    $clients = [];
    for ($i = 0; $i < 12; $i++) {
        $process = proc_open([PHP_BINARY, __FILE__, '--submit'], [0 => ['pipe', 'r'], 1 => ['pipe', 'w'], 2 => ['file', '/tmp/client-errors.log', 'a']], $clientPipes);
        $clients[] = [$process, $clientPipes];
    }
    $statuses = [];
    foreach ($clients as [$process, $clientPipes]) {
        fclose($clientPipes[0]);
        $statuses[] = trim(stream_get_contents($clientPipes[1]));
        fclose($clientPipes[1]);
        proc_close($process);
    }
    $counts = array_count_values($statuses);
    check(($counts[200] ?? 0) === 5 && ($counts[429] ?? 0) === 7, 'Parallel requests cannot bypass rate limit');
    check(substr_count(file_get_contents('/tmp/mail-stub.log'), '--- TEST MAIL ---') === 5, 'Parallel requests captured exactly five mails');
    file_put_contents(getenv('FRIEDEMANN_RATE_LIMIT_DIR') . '/requests.json', '{}');
    touch('/tmp/mail-stub.fail');
    request(json_encode($valid), 500, 'Failed mail delivery never reports success');
    echo "All contact-mailer security checks passed. No real mail sent.\n";
} finally {
    proc_terminate($server);
    proc_close($server);
}
