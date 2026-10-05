# Strix-Test mit GPT-6 Luna: Quellcodeprüfung abgeschlossen

Datum: 5. Oktober 2026

Nach diesem Scan wurden die Empfehlungen teilweise umgesetzt und separat geprüft. Aktueller Implementierungs- und Validierungsstand: `../implementation.md`. Der folgende Strix-Bericht dokumentiert den Quellcodestand vor diesen Änderungen.

## Aktuelles Ergebnis

Der Strix-Lauf `friedemann-strix-b7844dfcc780406_4b43` wurde mit `chatgpt/gpt-6-luna` über die ChatGPT-Abo-Anmeldung abgeschlossen. `run.json` meldet `completed`, `coverage.json` bestätigt den regulären Abschluss mit `finished_by_tool`, und der Prozess endete mit Exitcode 0. Strix weist 0 USD für die Abo-Nutzung aus; der Lauf verbraucht dennoch das Nutzungskontingent des Abos.

**Keine verifizierte, ausnutzbare Sicherheitslücke wurde gemeldet.** Das ist kein Nachweis, dass die produktive Website vollständig sicher ist.

Der unveränderte Strix-Bericht liegt lokal unter `reports/strix_runs/friedemann-strix-b7844dfcc780406_4b43/penetration_test_report.md`. Rohdaten sind per `.gitignore` vom Repository ausgeschlossen.

## Umfang und Grenzen

- Geprüft wurde eine temporäre Kopie des aktuellen Quellcodes einschließlich PHP-Mailer, Kontaktformular, statischem Export, Deployment-Workflow und Sanity-Konfiguration.
- Strix führte Quellcodeanalysen, Semgrep-/AST-Prüfungen, eine Suche nach Geheimnissen und eine offline ausgeführte Abhängigkeitsprüfung durch.
- PHP war in der Sandbox nicht verfügbar: keine dynamischen PHP- oder durchgängigen Formulartests. Kein echter Mailversand.
- Hosting, tatsächliche PHP-Ausführung und Sanity-Berechtigungen wurden nicht remote getestet. Ein Export-Build und dynamische Browserprüfungen waren nicht Bestandteil dieses Strix-Laufs.
- Die Abhängigkeitsprüfung lieferte 156 Paket-/Versionstreffer (128 eindeutige CVE-/Paketpaare). Nur ausgewählte Treffer wurden hinsichtlich ihrer Anwendbarkeit geprüft; die übrigen sind offen. Sie sind keine 156 bestätigten Lücken in der Landingpage.

## Empfohlene nächste Schritte

1. Im PHP-Mailer einzelne JSON-Felder als Strings prüfen und eine Request-Größenbegrenzung vor dem Decodieren ergänzen. Formularmissbrauch durch geeignete Rate-Limits begrenzen. Diese Punkte sind Hinweise aus der Quellcodeprüfung, keine dynamisch bestätigten Exploits.
2. Mailer lokal mit PHP und einem Mail-Stub testen: falsche Feldtypen, übergroße Requests, wiederholte Anfragen und Fehlerantworten.
3. Auf einem kontrollierten Hosting-Ziel PHP-Ausführung, Schutz vor Auslieferung des PHP-Quellcodes und effektive Serverlimits prüfen.
4. Abhängigkeitstreffer einzeln bewerten und betroffene Pakete aktualisieren; Sanity-Lese-/Schreibberechtigungen im Projekt prüfen. GitHub Actions auf unveränderliche Commit-SHAs festlegen.

Durch den Scan wurden keine Anwendungsdateien verändert. Es wurde nichts veröffentlicht und keine Sicherheitskorrektur eingespielt.

## Frühere Versuche

Die Strix-Beispielmodelle `chatgpt/gpt-5.4` und `chatgpt/gpt-5.3-codex` wurden vom Abo-Endpunkt abgelehnt. Ein anschließender Sol-Lauf wurde auf Wunsch des Nutzers beendet und durch den erfolgreichen Luna-Lauf ersetzt.

### Gemini-Versuch

- Strix 1.7.0; Docker mit Linux-Containern; Sandbox `ghcr.io/usestrix/strix-sandbox:1.3.0`.
- Ziel: temporäre Kopie des aktuellen Projektquellcodes, einschließlich PHP-Mailer und Deployment-Workflow.
- Modus: standard, vollständiger Quellcodeumfang. Keine Freigabe für Tests an der Live-Seite, Sanity oder echten E-Mail-Versand.
- Google lehnte das zunächst gewählte `gemini-2.5-pro` mit HTTP 404 ab: für neue Nutzer nicht mehr verfügbar.
- Anschließend wurde der Scan mit `gemini/gemini-3.1-flash-lite` gestartet.

### Abbruchgrund

Google antwortete wiederholt mit HTTP 429 / RESOURCE_EXHAUSTED für `GenerateContentInputTokensPerModelPerMinute-FreeTier`, Limit 250.000 Eingabetokens pro Minute. Der Scan wurde deshalb gestoppt; auch der zugehörige Docker-Container wurde gestoppt. Es wurde kein kostenpflichtiger Tarif eingerichtet.

Der SARIF-Zwischenstand enthält keine Befunde. Das ist **kein bestandener Sicherheitstest**: Die Analyse wurde nicht abgeschlossen, und es liegen keine belastbaren Ergebnisse zur Sicherheit der Anwendung vor.

Der Lauf heißt `friedemann-strix-a43893f2592e413_015a`; seine lokal ignorierten Rohdaten liegen unter `reports/strix_runs/`. Da der Prozess beendet wurde, kann `run.json` weiterhin den veralteten Status `running` enthalten. Dieser Bericht dokumentiert den tatsächlichen Abbruch.

Strix weist geschätzte Modellkosten aus; diese sind keine Google-Abrechnung. Der verwendete Zugang wurde vom Nutzer als kostenlos bestätigt, und die Google-Fehlermeldung bezeichnet ausdrücklich das Free-Tier-Limit.

Dieser frühere Abbruch wurde durch den oben dokumentierten abgeschlossenen Luna-Lauf abgelöst.
