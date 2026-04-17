import Link from "next/link";
import { ArrowLeft } from "lucide-react"; 

export default function AGBPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-6 text-slate-800 font-sans">
      <div className="mb-12">
        <Link 
          href="/" 
          prefetch={false}
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-brand-blue transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zur Startseite
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">AGB</h1>
      <section className="space-y-8 leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">§ 1 Geltungsbereich und Anbieter</h2>
          <p className="mb-2">
            (1) Diese Allgemeinen Geschäftsbedingungen gelten für alle Aufträge zwischen Friedemann Webdesign, (nachfolgend „Anbieter“) und seinen Kunden (nachfolgend „Kunde“).
          </p>
          <p>
            (2) Das Angebot richtet sich ausschließlich an Unternehmer im Sinne des § 14 BGB. Abweichende Bedingungen des Kunden werden nicht anerkannt.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">§ 2 Vertragsschluss und Individualvereinbarungen</h2>
          <p className="mb-2">
            (1) Angebote des Anbieters sind freibleibend und unverbindlich.
          </p>
          <p className="mb-2">
            (2) Ein Vertrag kommt durch eine schriftliche Auftragsbestätigung (auch per E-Mail) oder durch den Beginn der Ausführung der Dienstleistung zustande.
          </p>
          <p>
            (3) Da die Preise individuell verhandelt werden, bildet das jeweilige schriftliche Angebot die Primärquelle für den Leistungsumfang und die Vergütung.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">§ 3 Leistungsumfang und Zusatzleistungen</h2>
          <p className="mb-2">
            (1) Der konkrete Leistungsumfang ergibt sich aus dem individuellen Angebot (z. B. „Erstellung einer Website mit max. 5 Unterseiten“, „Einrichtung eines Kontaktformulars“).
          </p>
          <p className="mb-2">
            (2) Alle Leistungen, die nicht ausdrücklich im Angebot aufgeführt sind, gelten als kostenpflichtige Zusatzleistungen (z. B. Logo-Erstellung, Texterstellung, SEO-Optimierung).
          </p>
          <p>
            (3) Browserkompatibilität wird nur für die zum Zeitpunkt der Abnahme aktuellen Versionen von Chrome, Firefox und Safari garantiert.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">§ 4 Korrekturschleifen und Feedback</h2>
          <p className="mb-2">
            (1) Im vereinbarten Preis sind zwei Korrekturrunden für Design und Text inklusive. Eine Korrekturrunde umfasst das gesammelte Feedback des Kunden zu einem Entwurf.
          </p>
          <p>
            (2) Über die zwei Runden hinausgehende Anpassungen sowie größere strukturelle Änderungen nach Beginn einer neuen Projektphase werden nach Aufwand mit dem im Angebot vereinbarten Stundensatz berechnet.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">§ 5 Mitwirkungspflichten des Kunden</h2>
          <p className="mb-2">
            (1) Der Kunde ist verpflichtet, alle für die Erstellung der Website erforderlichen Inhalte (Texte, Bilder, Logos, Zugangsdaten) rechtzeitig und in digital verwertbarer Form zur Verfügung zu stellen.
          </p>
          <p className="mb-2">
            (2) Der Kunde garantiert, dass die bereitgestellten Materialien frei von Rechten Dritter sind und stellt den Anbieter von entsprechenden Ansprüchen frei.
          </p>
          <p>
            (3) Verzögert sich das Projekt durch mangelnde Mitwirkung des Kunden, ist der Anbieter berechtigt, nach angemessener Fristsetzung behelfsmäßig mit Platzhaltern zu arbeiten und das Projekt zur Abnahme vorzulegen.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">§ 6 Zahlungsbedingungen (50/50 Modell)</h2>
          <p className="mb-2">
            (1) Die Vergütung erfolgt in zwei Raten: 50 % der Summe werden bei Auftragsvergabe als Anzahlung fällig. Die restlichen 50 % werden nach Fertigstellung und Abnahme der Website (vor dem Live-Gang) fällig.
          </p>
          <p className="mb-2">
            (2) Rechnungen sind innerhalb der im Angebot genannten Frist (i.d.R. 7 Tage) ohne Abzug zahlbar.
          </p>
          <p>
            (3) Hinweis gemäß § 19 UStG: Im Rahmen der Kleinunternehmerregelung wird keine Umsatzsteuer berechnet und daher nicht ausgewiesen.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">§ 7 Abnahme</h2>
          <p className="mb-2">
            (1) Nach Fertigstellung wird der Kunde zur Abnahme aufgefordert. Die Website gilt als abgenommen, wenn der Kunde nicht innerhalb von 14 Tagen schriftlich wesentliche Mängel rügt (fiktive Abnahme).
          </p>
          <p>
            (2) Unwesentliche Mängel berechtigen nicht zur Verweigerung der Abnahme.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">§ 8 Nutzungsrechte und Urheberbezeichnung</h2>
          <p className="mb-2">
            (1) Der Anbieter räumt dem Kunden ein einfaches Nutzungsrecht für den Betrieb der Website im Internet ein.
          </p>
          <p className="mb-2">
            (2) Die Übertragung der Nutzungsrechte erfolgt erst mit der vollständigen Bezahlung der Gesamtsumme.
          </p>
          <p>
            (3) Der Anbieter ist berechtigt, im Footer der Website dezent auf seine Urheberschaft hinzuweisen (z. B. „Design by Friedemann Webdesign“) und das Projekt als Referenz zu nutzen.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">§ 9 Optionales Hosting und Wartung</h2>
          <p className="mb-2">
            (1) Sofern Hosting-Leistungen vereinbart werden, wird eine Verfügbarkeit von 98 % im Jahresmittel angestrebt.
          </p>
          <p className="mb-2">
            (2) Der Anbieter haftet nicht für Serverausfälle oder technische Störungen, die im Verantwortungsbereich von Drittanbietern liegen.
          </p>
          <p>
            (3) Bei Hosting-Verträgen ist der Kunde für die Einhaltung der gesetzlichen Pflichten (Impressum, Datenschutz) selbst verantwortlich.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">§ 10 Haftungsbeschränkung</h2>
          <p className="mb-2">
            (1) Der Anbieter haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
          </p>
          <p>
            (2) Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten), begrenzt auf den vertragstypischen, vorhersehbaren Schaden.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">§ 11 Schlussbestimmungen</h2>
          <p className="mb-2">
            (1) Es gilt das Recht der Bundesrepublik Deutschland.
          </p>
          <p className="mb-2">
            (2) Gerichtsstand für Kaufleute ist der Sitz des Anbieters.
          </p>
          <p>
            (3) Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt (Salvatorische Klausel).
          </p>
        </div>
      </section>
    </main>
  );
}
