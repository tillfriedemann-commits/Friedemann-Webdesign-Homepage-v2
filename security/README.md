# Kontaktformular: Schutz und Tests

Der PHP-Mailer akzeptiert nur JSON-Objekte mit Textfeldern. Name, E-Mail und Nachricht sind Pflichtfelder; die optionalen Felder `selection` und `website_url` müssen ebenfalls Strings sein. Der gesamte Request ist auf 32 KiB begrenzt, auch ohne Content-Length. Nachrichten dürfen maximal 5.000 Unicode-Zeichen enthalten. Ungültige Themen werden zurückgewiesen.

Nach der Validierung sind maximal fünf Anfragen je Client-IP in einem rollenden Zeitfenster von 15 Minuten zulässig. Auch fehlgeschlagene Versandversuche zählen, damit Mailserverfehler nicht für wiederholte Aufrufe missbraucht werden. Das Limit liefert HTTP 429 und `Retry-After`. Gemeinsam genutzte IP-Adressen teilen dieses Limit. Weitergeleitete IP-Header werden absichtlich nicht vertraut; bei einem Reverse Proxy muss die tatsächliche Client-IP serverseitig korrekt eingerichtet sein.

Die Sperrdaten enthalten nur IP-Hashes und Zeitstempel. Abgelaufene Einträge werden beim nächsten Zugriff entfernt. Die Datei wird mit `flock()` gegen parallele Änderungen geschützt und ist auf 1.000 aktive IP-Einträge begrenzt. Sie liegt standardmäßig im PHP-Temp-Verzeichnis, außerhalb des Webroots. Optional kann das Hosting ein privates, schreibbares Verzeichnis über `FRIEDEMANN_RATE_LIMIT_DIR` festlegen. Dieses Verzeichnis niemals in `httpdocs` legen. Bei fehlendem Schreibzugriff oder beschädigten Sperrdaten gibt das Formular HTTP 503 zurück und versendet keine Mail.

## Lokale Tests

Im Projektverzeichnis, mit Docker und Linux-Containern:

```powershell
docker run --rm --user 65534:65534 --network none --read-only --tmpfs /tmp:rw,nosuid,size=16m --mount "type=bind,source=$PWD,target=/project,readonly" -e FRIEDEMANN_RATE_LIMIT_DIR=/tmp/contact-rate php:8.3-cli@sha256:f1ed6d1fd0aa769ab94ca307b9deaf55fbc18434315b70e319cd79078515cd2b php /project/security/tests/contact-mailer.php
```

Die Tests prüfen ungültige Typen, Methoden, Medientypen, Zeichengrenzen, Header-Injection, Größenlimits mit und ohne Content-Length, Honeypot, erfolgreiche Anfragen, Sperren einschließlich paralleler Zugriffe und beschädigte Sperrdaten. Ein lokaler sendmail-Stub erfasst Testmails im isolierten Container; echter Versand und externe Netzwerkzugriffe sind ausgeschlossen. Der Deployment-Workflow führt diese Tests vor dem Upload aus.

## Vor dem Deployment auf dem Hosting prüfen

- PHP 8.3 oder eine kompatible unterstützte Version und funktionierendes `mail()` konfigurieren. Auch lokale Anfragen melden nur noch Erfolg, wenn `mail()` erfolgreich war; automatische Erfolgssimulation anhand der IP wurde entfernt.
- Schreibzugriff auf den privaten Speicher der Sperrdaten prüfen. Bei mehreren Hosts muss der Speicher gemeinsam genutzt werden oder das Limit am gemeinsamen Gateway eingerichtet werden.
- Sicherstellen, dass `/api/mailer.php` durch PHP ausgeführt wird und niemals als Quellcode ausgeliefert wird. Ein statischer Webserver allein genügt nicht.
- Im Webserver ebenfalls ein Request-Limit und passende Zeitlimits festlegen. Das PHP-Limit begrenzt die Verarbeitung in der Anwendung; das Hosting kann den Request vorher puffern.
- Sanity-Dataset-Sichtbarkeit und Studio-Schreibrechte im vorhandenen Sanity-Projekt kontrollieren. Remote Berechtigungsänderungen wurden nicht vorgenommen.

GitHub Actions sind auf Commit-SHAs festgelegt; Dependabot schlägt wöchentliche Updates für Actions und npm-Pakete vor. Änderungen werden erst mit dem nächsten Push wirksam; es wurde nichts veröffentlicht.
