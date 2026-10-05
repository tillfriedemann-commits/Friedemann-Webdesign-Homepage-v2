# Umsetzung der Strix-Empfehlungen

Stand: 5. Oktober 2026. Änderungen sind lokal; nichts wurde veröffentlicht.

## Kontaktformular

- Nur POST mit `application/json` und einem JSON-Objekt. Alle bekannten Formularfelder müssen Strings sein, bevor String-Funktionen darauf zugreifen.
- Maximal 32 KiB Request-Body. Sowohl Content-Length als auch die tatsächlich gelesenen Bytes werden begrenzt; maximal 32 KiB plus ein Prüfbyte werden eingelesen.
- Pflichtfelder, Zeichengrenzen und zulässige Themen werden serverseitig geprüft. Unicode-Zeichen werden auch ohne mbstring korrekt gezählt.
- Höchstens fünf gültige Anfragen je IP in 15 Minuten; HTTP 429 mit Retry-After bei Überschreitung. Die gemeinsame Sperrdatei wird außerhalb des Webroots gespeichert und bei parallelen Anfragen gesperrt. Nicht verfügbarer oder beschädigter Sperrspeicher verhindert den Versand mit HTTP 503.
- Interne Fehler werden nicht an Besucher ausgegeben. Der PHP-Versionsheader wurde entfernt; API-Antworten sind nicht cachebar und enthalten `nosniff`.
- Die frühere automatische Erfolgssimulation für localhost wurde entfernt. `mail()` muss tatsächlich erfolgreich sein; lokale Tests verwenden stattdessen einen Mail-Stub.

## Abhängigkeiten und Deployment

Die aktuelle npm-Advisory-Prüfung meldete vor den Updates 43 betroffene Pakete: 3 kritisch, 24 hoch, 13 mittel und 3 niedrig. Nach kompatiblen Updates und Entfernung der unbenutzten Express-, dotenv- und Gemini-Abhängigkeiten sind es **15: 0 kritisch, 10 hoch, 5 mittel**.

Aktualisierte Lockfile-Versionen unter anderem: Next.js 16.3.8, React/React DOM 19.3.0, Sanity 5.31.2, next-sanity 12.4.5 und PostCSS 8.5.23. Die bisherigen Hauptversionen wurden beibehalten. npm ci mit dem geänderten Lockfile lief erfolgreich.

Die 15 verbleibenden Meldungen betreffen die Sanity-Werkzeuge und deren Abhängigkeiten: adm-zip, braces/micromatch/globby, js-yaml und uuid sowie abhängige Pakete. Sie werden **nicht als behoben oder nicht relevant erklärt**. npm schlägt hierfür ein erzwungenes Downgrade der Sanity-Hauptabhängigkeit vor; das wurde nicht angewendet. Die Landingpage hat keinen Upload-/Archiv-/YAML-Verarbeitungsendpunkt, aber die Werkzeugkette muss weiter gepflegt und die betroffenen Funktionen einzeln bewertet werden. Rohdaten: `strix/reports/npm-before.json` und `strix/reports/npm-after.json` (lokal ignoriert).

Die next-sanity-v12-Warnung zu Next.js 16 betrifft `defineLive`/`SanityLive`, die in diesem Projekt nicht verwendet werden. Ein zusätzlicher Major-Wechsel wurde für diese Änderung nicht vorgenommen. Referenz: https://www.sanity.io/docs/help/nextjs-16-sanitylive-status

GitHub Actions sind auf verifizierte Commit-SHAs festgelegt, Checkout speichert keine Credentials, und der Workflow hat nur Leserechte auf Repository-Inhalte. Dependabot ist für wöchentliche Paket-/Action-Updates konfiguriert. Der Workflow führt die isolierten PHP-Tests vor dem FTP-Upload aus.

## Validierung und verbleibende Hosting-Schritte

Die PHP-8.3-Tests verwenden einen schreibgeschützten Projekt-Mount, keinen Netzwerkzugang, einen unprivilegierten Benutzer und ausschließlich einen lokalen Mail-Stub. Geprüft werden Feldtypen, JSON-Form, Methoden, Medientypen, Länge und Unicode, Content-Length und Chunked-Requests, Honeypot, Header-Injection, Rate-Limit einschließlich zwölf paralleler Anfragen, beschädigter/nicht zugänglicher Sperrspeicher und die Fehlerantwort bei fehlgeschlagenem Versand. Die PHP-Tests und Syntaxprüfung sind erfolgreich. Der Produktionsbuild mit Next.js 16.3.8 einschließlich TypeScript-Prüfung und statischem Export sowie die YAML-Prüfung der Workflows sind erfolgreich.

Die produktive PHP-Konfiguration, Mailzustellung, private Schreibrechte, Webserverlimits, Schutz vor Auslieferung von PHP-Quellcode sowie Sanity-Berechtigungen benötigen weiterhin eine Prüfung auf dem Hosting beziehungsweise im Sanity-Projekt. Zugangsdaten oder Berechtigungen wurden dort nicht geändert. Einrichtung und Testbefehl: `README.md` in diesem Verzeichnis.
