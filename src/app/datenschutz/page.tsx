import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Datenschutzerklärung | Friedemann Webdesign",
  alternates: { canonical: "/datenschutz/" },
};

const sections = [
  ["ueberblick", "Datenschutz auf einen Blick"],
  ["verantwortlich", "Verantwortliche Stelle"],
  ["hosting", "Hosting bei netcup und Serverprotokolle"],
  ["kontakt", "Kontaktformular, E-Mail und Telefon"],
  ["formularschutz", "Schutz des Kontaktformulars"],
  ["sanity", "Bilder und Inhalte von Sanity"],
  ["sicherheit", "Sicherheit und Speicherdauer"],
  ["rechte", "Ihre Rechte"],
];

export default function DatenschutzPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-6 text-slate-800 font-sans">
      <div className="mb-12">
        <Link
          href="/"
          prefetch={false}
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-brand-blue transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
          Zurück zur Startseite
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">
        Datenschutzerklärung
      </h1>
      <p className="text-sm text-slate-500 mb-8">Stand: 5. Oktober 2026</p>
      <nav aria-label="Inhaltsverzeichnis Datenschutz" className="mb-12">
        <h2 className="text-lg font-semibold text-slate-900 mb-3">
          Inhaltsverzeichnis
        </h2>
        <ol className="list-decimal pl-6 space-y-2">
          {sections.map(([id, title]) => (
            <li key={id}>
              <a href={"#" + id} className="underline underline-offset-4">
                {title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="space-y-12 leading-relaxed text-slate-700">
        <section id="ueberblick" aria-labelledby="ueberblick-title">
          <h2
            id="ueberblick-title"
            className="text-2xl font-bold text-slate-900 mb-4"
          >
            1. Datenschutz auf einen Blick
          </h2>
          <p className="mb-4">
            Diese Erklärung beschreibt die Verarbeitung personenbezogener Daten
            beim Besuch von friedemann-webdesign.de und bei einer
            Kontaktaufnahme mit Friedemann Webdesign. Dazu gehören technische
            Verbindungsdaten und Angaben, die Sie mir mit Ihrer Anfrage
            mitteilen.
          </p>
          <p className="mb-4">
            Die Website stellt meine Webdesign-Leistungen vor und ermöglicht die
            Kontaktaufnahme. Auf der öffentlichen Landingpage setze ich keine
            Analyseprogramme, Werbetracker oder Newsletter-Dienste ein. Ihre
            Anfrage dient der persönlichen Bearbeitung Ihres Anliegens.
          </p>
          <p>
            Die Schriftdateien werden zusammen mit der Website von meinem
            Hosting bereitgestellt. Ihr Browser stellt dafür keine Verbindung zu
            Google Fonts her.
          </p>
        </section>
        <section id="verantwortlich" aria-labelledby="verantwortlich-title">
          <h2
            id="verantwortlich-title"
            className="text-2xl font-bold text-slate-900 mb-4"
          >
            2. Verantwortliche Stelle
          </h2>
          <p className="mb-4">
            Verantwortlich für die Verarbeitung personenbezogener Daten auf
            dieser Website ist:
          </p>
          <address className="not-italic">
            Till Friedemann – Friedemann Webdesign
            <br />
            Kornblumenweg 9<br />
            29399 Wahrenholz
            <br />
            Telefon:{" "}
            <a
              href="tel:+491608592128"
              className="underline underline-offset-4"
            >
              0160 859 21 28
            </a>
            <br />
            E-Mail:{" "}
            <a
              href="mailto:till.friedemann@gmx.de"
              className="underline underline-offset-4"
            >
              till.friedemann@gmx.de
            </a>
          </address>
          <p className="mt-4">
            Fragen zum Datenschutz und Anliegen zu Ihren Rechten können Sie an
            diese Kontaktdaten richten.
          </p>
        </section>
        <section id="hosting" aria-labelledby="hosting-title">
          <h2
            id="hosting-title"
            className="text-2xl font-bold text-slate-900 mb-4"
          >
            3. Hosting bei netcup und Serverprotokolle
          </h2>
          <p className="mb-4">
            Die Website wird bei der netcup GmbH, Emmy-Noether-Straße 10, 76131
            Karlsruhe, Deutschland, gehostet. Beim Aufruf werden die für die
            Auslieferung erforderlichen Daten an die Server des
            Hosting-Anbieters übermittelt. netcup ist damit Empfänger
            technischer Daten und als Hosting-Dienstleister in die Verarbeitung
            eingebunden.
          </p>
          <p className="mb-4">
            Mit netcup besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28
            DSGVO. netcup verarbeitet die im Rahmen der beauftragten Leistungen
            anfallenden personenbezogenen Daten nach meinen Weisungen.
          </p>
          <p className="mb-4">
            Dazu gehören insbesondere IP-Adresse, Zeitpunkt und Ziel eines
            Zugriffs, Browser- und Betriebssystemangaben, die zuvor besuchte
            Seite, soweit Ihr Browser diese übermittelt, sowie Statuscodes und
            übertragene Datenmenge. Diese Angaben können in Serverprotokollen
            gespeichert werden, um den Betrieb zu gewährleisten und Fehler oder
            missbräuchliche Zugriffe zu erkennen.
          </p>
          <p className="mb-4">
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Mein berechtigtes
            Interesse ist die zuverlässige Bereitstellung und der Schutz der
            Website. Protokolldaten werden nur so lange gespeichert, wie dies
            für diese Zwecke erforderlich ist. Bei einem konkreten
            Sicherheitsvorfall können relevante Daten bis zur Klärung und,
            soweit erforderlich, zur Durchsetzung oder Abwehr von Ansprüchen
            aufbewahrt werden.
          </p>
          <p>
            Weitere Informationen:{" "}
            <a
              href="https://www.netcup.com/de/kontakt/datenschutzerklaerung"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Datenschutzerklärung von netcup
            </a>
            .
          </p>
        </section>
        <section id="kontakt" aria-labelledby="kontakt-title">
          <h2
            id="kontakt-title"
            className="text-2xl font-bold text-slate-900 mb-4"
          >
            4. Kontaktformular, E-Mail und Telefon
          </h2>
          <p className="mb-4">
            Beim Kontaktformular verarbeite ich Ihren Namen, Ihre
            E-Mail-Adresse, das gewählte Thema und Ihre Nachricht. Die Angaben
            werden über das Hosting verarbeitet und per E-Mail an
            info@friedemann-webdesign.de übermittelt. Bei direktem Kontakt per
            E-Mail oder Telefon verarbeite ich die von Ihnen mitgeteilten
            Kontaktdaten und Informationen zu Ihrem Anliegen.
          </p>
          <p className="mb-4">
            Das Postfach info@friedemann-webdesign.de wird ebenfalls bei netcup
            betrieben. netcup verarbeitet dafür E-Mail-Adressen,
            Nachrichteninhalte und die für Zustellung und Betrieb erforderlichen
            technischen Daten im Rahmen der Auftragsverarbeitung.
          </p>
          <p className="mb-4">
            Die Daten dienen der Beantwortung Ihrer Anfrage, der Klärung von
            Rückfragen und gegebenenfalls der Vorbereitung eines Angebots oder
            einer Zusammenarbeit. Bei Anfragen zu einem Vertrag oder dessen
            Vorbereitung auf Ihren Wunsch ist Art. 6 Abs. 1 lit. b DSGVO die
            Rechtsgrundlage. Bei sonstigen Anliegen beruht die Verarbeitung auf
            Art. 6 Abs. 1 lit. f DSGVO und meinem berechtigten Interesse, an
            mich gerichtete Anfragen zu bearbeiten.
          </p>
          <p className="mb-4">
            Ihre Angaben werden nicht für Newsletter oder Werbekampagnen
            verwendet. Hosting- und E-Mail-Dienstleister können die für die
            technische Verarbeitung erforderlichen Daten erhalten. Darüber
            hinaus erfolgt eine Weitergabe nur, wenn eine rechtliche Grundlage
            besteht, beispielsweise eine gesetzliche Verpflichtung.
          </p>
          <p>
            Anfragen und zugehörige Korrespondenz werden gelöscht, sobald die
            Bearbeitung abgeschlossen ist und keine weitere Aufbewahrung
            erforderlich ist. Bei einer anschließenden Zusammenarbeit,
            gesetzlichen Aufbewahrungspflichten oder erforderlichen Nachweisen
            für Rechtsansprüche werden betroffene Unterlagen entsprechend länger
            aufbewahrt. Name, E-Mail-Adresse und Nachricht sind für die
            Bearbeitung über das Formular erforderlich. Alternativ können Sie
            die direkten Kontaktwege nutzen.
          </p>
        </section>
        <section id="formularschutz" aria-labelledby="formularschutz-title">
          <h2
            id="formularschutz-title"
            className="text-2xl font-bold text-slate-900 mb-4"
          >
            5. Schutz des Kontaktformulars
          </h2>
          <p className="mb-4">
            Gegen Spam und wiederholte automatisierte Anfragen verwendet das
            Formular ein verborgenes Prüffeld und eine Begrenzung pro
            IP-Adresse. Dafür wird auf dem Server ein Hashwert der IP-Adresse
            mit den Zeitpunkten zugelassener Anfragen gespeichert. Dieser
            Hashwert ist pseudonymisiert und wird nicht als anonymer Datensatz
            behandelt.
          </p>
          <p className="mb-4">
            Die Begrenzung berücksichtigt ein Zeitfenster von 15 Minuten.
            Abgelaufene Einträge werden im Rahmen weiterer zugelassener
            Formularanfragen aus dem Sperrspeicher entfernt. Diese Daten dienen
            ausschließlich dem Missbrauchsschutz und werden nicht mit dem Inhalt
            Ihrer Nachricht zu einem Nutzungsprofil zusammengeführt.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Mein berechtigtes
            Interesse ist der Schutz des Formulars und der Mailzustellung vor
            Missbrauch. Ein externer Captcha-Dienst wird dafür nicht
            eingebunden.
          </p>
        </section>
        <section id="sanity" aria-labelledby="sanity-title">
          <h2
            id="sanity-title"
            className="text-2xl font-bold text-slate-900 mb-4"
          >
            6. Bilder und Inhalte von Sanity
          </h2>
          <p className="mb-4">
            Inhalte werden mit Sanity verwaltet, einem Dienst von Sanity AS
            (Norwegen) und Sanity US Inc. (USA). Die Textseiten werden beim
            Erstellen der Website erzeugt und anschließend über netcup
            ausgeliefert. Das Portrait wird direkt vom Bildserver cdn.sanity.io
            geladen. Dabei verbindet sich Ihr Browser mit dem Dienst.
          </p>
          <p className="mb-4">
            Sanity erhält dabei die für den Abruf erforderlichen technischen
            Informationen, insbesondere Ihre IP-Adresse, die angefragte
            Bilddatei und Verbindungs- beziehungsweise Browserdaten. Dies dient
            der Bildauslieferung und Absicherung des Dienstes. Rechtsgrundlage
            meiner Einbindung ist Art. 6 Abs. 1 lit. f DSGVO; mein berechtigtes
            Interesse ist die zuverlässige Darstellung und zentrale Pflege der
            Website. Kontaktformularangaben werden durch den Mailer nicht an
            Sanity übertragen.
          </p>
          <p className="mb-4">
            Bei Sanity und dessen Infrastruktur können Daten auch außerhalb der
            EU beziehungsweise des Europäischen Wirtschaftsraums, insbesondere
            in den USA, verarbeitet werden. Sanity beschreibt die
            Schutzmaßnahmen für internationale Übermittlungen, einschließlich
            Standardvertragsklauseln, in seinen Datenschutz- und
            Vertragsinformationen. Nach der Datenschutzerklärung von Sanity
            werden Protokolldaten innerhalb von 90 Tagen gelöscht oder
            anonymisiert, soweit keine gesetzlichen Gründe entgegenstehen.
          </p>
          <p className="mb-4">
            Weitere Informationen:{" "}
            <a
              href="https://www.sanity.io/legal/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Datenschutzerklärung von Sanity
            </a>{" "}
            und{" "}
            <a
              href="https://www.sanity.io/legal/dpa"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Data Processing Addendum
            </a>
            .
          </p>
          <p>
            Der Redaktionsbereich unter /studio dient der internen Verwaltung
            der Website. Für den Besuch der Landingpage ist keine Anmeldung und
            kein Sanity-Konto erforderlich.
          </p>
        </section>
        <section id="sicherheit" aria-labelledby="sicherheit-title">
          <h2
            id="sicherheit-title"
            className="text-2xl font-bold text-slate-900 mb-4"
          >
            7. Sicherheit und Speicherdauer
          </h2>
          <p className="mb-4">
            Die Website ist über HTTPS erreichbar. Die Verschlüsselung schützt
            die Übertragung zwischen Ihrem Browser und der Website, insbesondere
            beim Absenden des Kontaktformulars. Sie bedeutet keine
            Ende-zu-Ende-Verschlüsselung der anschließenden
            E-Mail-Kommunikation.
          </p>
          <p>
            Soweit oben keine spezielleren Kriterien genannt sind, werden
            personenbezogene Daten gelöscht, sobald der jeweilige Zweck
            entfällt. Gesetzliche Aufbewahrungspflichten bleiben bestehen.
            Während dieser Zeit werden betroffene Unterlagen nur für den
            Aufbewahrungszweck und andere gesetzlich zulässige Zwecke
            verarbeitet.
          </p>
        </section>
        <section id="rechte" aria-labelledby="rechte-title">
          <h2
            id="rechte-title"
            className="text-2xl font-bold text-slate-900 mb-4"
          >
            8. Ihre Rechte
          </h2>
          <p className="mb-4">
            Sie haben nach Maßgabe der DSGVO insbesondere folgende Rechte:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              Auskunft über Ihre verarbeiteten personenbezogenen Daten (Art.
              15).
            </li>
            <li>
              Berichtigung unrichtiger und Ergänzung unvollständiger Daten (Art.
              16).
            </li>
            <li>
              Löschung Ihrer Daten, soweit die Voraussetzungen erfüllt sind
              (Art. 17).
            </li>
            <li>
              Einschränkung der Verarbeitung unter den gesetzlichen
              Voraussetzungen (Art. 18).
            </li>
            <li>
              Datenübertragbarkeit bei automatisierter Verarbeitung auf
              Grundlage einer Einwilligung oder eines Vertrags (Art. 20).
            </li>
            <li>
              Widerruf einer erteilten Einwilligung für die Zukunft; die
              Verarbeitung bis zum Widerruf bleibt rechtmäßig (Art. 7 Abs. 3).
            </li>
          </ul>
          <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
            Widerspruch bei berechtigten Interessen
          </h3>
          <p className="mb-4">
            Werden Ihre Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
            verarbeitet, können Sie aus Gründen Ihrer besonderen Situation
            jederzeit widersprechen (Art. 21 DSGVO). Die Verarbeitung wird dann
            beendet, sofern keine zwingenden schutzwürdigen Gründe überwiegen
            oder die Daten für Rechtsansprüche benötigt werden. Wenden Sie sich
            dafür an die oben genannte verantwortliche Stelle.
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
            Beschwerde bei einer Aufsichtsbehörde
          </h3>
          <p>
            Sie können sich bei einer Datenschutzaufsichtsbehörde beschweren,
            insbesondere in dem Mitgliedstaat Ihres gewöhnlichen Aufenthalts,
            Ihres Arbeitsplatzes oder des vermuteten Verstoßes (Art. 77 DSGVO).
            Für meine Tätigkeit in Niedersachsen ist der{" "}
            <a
              href="https://www.lfd.niedersachsen.de/beschwerde"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Landesbeauftragte für den Datenschutz Niedersachsen
            </a>{" "}
            eine Anlaufstelle.
          </p>
        </section>
      </div>
    </main>
  );
}
