# Friedemann Webdesign – Landingpage

## Ziel und Zielgruppe

Kontaktanfragen von Handwerksbetrieben, Praxen und lokalen Unternehmen in Wahrenholz und Umgebung. Till ist der sichtbare persönliche Ansprechpartner. Die Seite erklärt Angebot und Zusammenarbeit und führt in ein kostenloses, unverbindliches Erstgespräch.

## Gestalterische Richtung

Ruhige, moderne Gestaltung mit warmen Flächen, großen klaren Überschriften und dem echten Portrait aus Sanity. Ein dunkler persönlicher Abschnitt setzt einen bewussten Kontrast. Keine erfundenen Kundenstimmen, Referenzen, Kennzahlen oder Auszeichnungen.

UI UX Pro Max liefert die überprüften Grundprinzipien: klare Nutzenüberschrift, Vertrauensaufbau, wiederholte Kontaktwege und wenige Formularfelder. Die generische violette Generator-Palette und Serifenschrift wurden nicht übernommen; bestehende Markenfarben und Inter bestimmen das konkrete Design.

## Farben und Schrift

| Rolle                        | Wert    |
| ---------------------------- | ------- |
| Hintergrund                  | #faf8f4 |
| Text und dunkler Abschnitt   | #15394a |
| Sekundärer Text              | #52616a |
| CTA und orange Textakzente   | #b64e16 |
| CTA bei Hover                | #943e10 |
| Helle Textakzente auf Dunkel | #edb084 |
| Linien                       | #deded6 |

Inter für Überschriften und Fließtext. Fließtexte 14–17 px, mobile Formulare mindestens 16 px. Kleine Metainformationen 10–12 px. Headline mit engem Zeichenabstand, Fließtext mit großzügiger Zeilenhöhe. Logo bleibt im ursprünglichen Farbton; Textakzente verwenden das dunklere Orange.

## Seitenaufbau

1. Sticky Header mit Navigation und Kontaktlink.
2. Hero: konkretes Angebot, Till, Wahrenholz, Portrait, Erstgespräch.
3. Drei Leistungen mit Nutzen und Kontaktwegen.
4. Persönlicher Bereich: direkter Kontakt, klare Absprachen, Informatikstudium.
5. Ablauf: Gespräch → Angebot → Umsetzung und Freigabe.
6. FAQ zu Umfang, Inhalten, Überarbeitung, Betreuung und Region.
7. Kontakt: Leistung wählen → Name, E-Mail und Nachricht → Versandbestätigung.
8. Footer mit Kontaktdaten und bestehenden rechtlichen Seiten.

## Interaktion und Barrierefreiheit

- Native Links, Buttons und details/summary für die FAQ.
- Keine Inhalte, die erst durch eine Scrollanimation sichtbar werden.
- Sichtbare Fokusindikatoren, Skip-Link und Scrollabstand zum Sticky Header.
- Fokus auf die neue Überschrift bei Formularwechsel, auf die Fehlermeldung bei Versandfehler.
- Sichtbare Labels, Autocomplete, Pflichtfeldkennzeichnung, Statusansagen.
- Honeypot, doppelte Übermittlung blockieren, Versandtimeout, Eingaben bei Fehler erhalten.
- Keine Telefonnummer als Pflichtfeld. Telefon und E-Mail sind alternative Kontaktwege.
- Reduced Motion deaktiviert sanftes Scrollen und dekorative Übergänge.
- Einspaltige Darstellung auf mobilen Geräten; Layout muss auch bei 320 px funktionieren.

## Technik

Next.js Static Export auf dem bestehenden PHP-Hosting. Portrait aus Sanity, Hero-Bild priorisiert, restliche Bilder lazy geladen. Der Workflow kopiert src/api/mailer.php nach out/api/mailer.php vor dem FTP-Upload. Die lokale statische Vorschau sendet keine E-Mails; echter Versand benötigt PHP und die Hosting-Mailkonfiguration.
