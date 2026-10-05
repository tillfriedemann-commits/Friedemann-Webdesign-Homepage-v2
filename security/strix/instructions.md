# Scan scope: Friedemann Webdesign

Assess the supplied source snapshot of this Next.js static-export landing page and its PHP contact mailer. This is a security assessment, not a UI review. Report verified vulnerabilities with reproduction steps and remediation advice. Do not claim that an unexecuted test passed.

## Scope

- Review the complete source, including src/api/mailer.php, client form submission, static export configuration, and Sanity integration.
- Run dynamic proofs of concept only against test services you start inside the Strix sandbox.
- The source snapshot is disposable. Do not change or access the original checkout on the host.
- Do not scan friedemann-webdesign.de, its hosting, Sanity, Google, or any other third-party or production service. Public endpoints referenced in the source are not authorization to scan them.
- Do not send real email. If dynamic PHP testing is possible, route mail to a local stub or disable delivery for the test process. Do not infer mailer behavior from a static HTTP server that cannot execute PHP.
- Do not extract, request, transmit, or include credentials or personal visitor data in reports.

## Priorities

1. Contact mailer: JSON parsing and type validation; malformed objects and arrays; input length and request-size limits; email-header injection; error handling; abuse controls and resource exhaustion using only small bounded requests.
2. Contact form: response handling, duplicate submission, timeout behavior, honeypot handling, and handling of server error content.
3. Static export: accidental source or secret exposure and any assumptions about executing PHP on the deployment target.
4. Sanity integration: whether public configuration discloses credentials or permits unintended writes. Do not perform remote write attempts.
5. Dependencies: use the supplied package-lock.json; distinguish verified applicability from generic vulnerability matches.
6. Security headers and browser protections: identify configuration gaps separately from exploitable vulnerabilities; runtime hosting headers are outside this source-only scan.

## Report

For each finding, include severity, affected file and line, concrete evidence, a bounded proof of concept, impact, and recommended fix. Explicitly list tests blocked by missing PHP, runtime dependencies, credentials, or network scope. Distinguish completed analysis from an early budget or turn-limit stop.
