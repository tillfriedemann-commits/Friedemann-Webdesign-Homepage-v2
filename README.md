# Friedemann Webdesign

Landingpage von Till Friedemann für persönliche, unkomplizierte Websites für Betriebe aus Wahrenholz und Umgebung.

## Lokal entwickeln

Voraussetzung: Node.js 22 oder neuer.

```sh
npm ci
npm run dev
```

Die Vorschau ist unter http://localhost:3000 erreichbar. Das Portrait wird aus dem vorhandenen Sanity-Projekt geladen. Falls es nicht verfügbar ist, zeigt die Seite eine neutrale Darstellung mit den Initialen.

## Produktionsbuild

```sh
npm run build
```

Next.js erzeugt den statischen Export im Ordner `out/`. Zum lokalen Prüfen kann dieser Ordner mit einem statischen Webserver bereitgestellt werden.

## Kontaktformular und Hosting

Das Formular sendet an `/api/mailer.php`. Der PHP-Mailer liegt in `src/api/mailer.php`. Der GitHub-Workflow kopiert ihn nach dem Build in `out/api/` und lädt den Export zum vorhandenen Netcup-Hosting hoch.

Der Versand benötigt ein PHP-fähiges Hosting und die dortige Mailkonfiguration. Next.js dev und ein lokaler statischer Webserver führen PHP nicht aus. In einer solchen Vorschau lässt sich der Fehlerzustand prüfen, aber keine echte E-Mail versenden.

Das Formular begrenzt Requests auf 32 KiB und gültige Anfragen auf fünf je IP innerhalb von 15 Minuten. Die Sperrdaten benötigen ein privates, schreibbares Verzeichnis außerhalb des Webroots. Einrichtung und isolierte PHP-Tests sind in [security/README.md](security/README.md) beschrieben.

## Inhalte und Gestaltung

- Portrait: Sanity, Dokumenttyp `aboutMe`.
- Leistungen, Ablauf, FAQ und Kontaktdaten: `src/components/`.
- Gestaltung und responsive Regeln: `src/index.css`.
- Designentscheidungen: `design-system/friedemann-webdesign/MASTER.md`.
- Rechtliche Seiten: `src/app/impressum/`, `src/app/datenschutz/`, `src/app/agb/`.

Die Landingpage enthält keine erfundenen Kundenreferenzen oder Testimonials.
