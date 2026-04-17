import Link from "next/link";
import { ArrowLeft } from "lucide-react"; 

export default function DatenschutzPage() {
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
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Datenschutzerklärung</h1>
      
      <div className="space-y-12 leading-relaxed text-slate-700">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Datenschutz auf einen Blick</h2>
          <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Allgemeine Hinweise</h3>
          <p className="mb-4">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
            passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
            persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen
            Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
          </p>
          
          <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Datenerfassung auf dieser Website</h3>
          <p className="font-medium mb-1">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</p>
          <p className="mb-4">
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
            können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.
          </p>
          
          <p className="font-medium mb-1">Wie erfassen wir Ihre Daten?</p>
          <p className="mb-4">
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um
            Daten handeln, die Sie in ein Kontaktformular eingeben.
          </p>
          <p className="mb-4">
            Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. 
            Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung 
            dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
          </p>
          
          <p className="font-medium mb-1">Wofür nutzen wir Ihre Daten?</p>
          <p className="mb-4">
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere
            Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Sofern über die Website Verträge
            geschlossen oder angebahnt werden können, werden die übermittelten Daten auch für Vertragsangebote,
            Bestellungen oder sonstige Auftragsanfragen verarbeitet.
          </p>
          
          <p className="font-medium mb-1">Welche Rechte haben Sie bezüglich Ihrer Daten?</p>
          <p className="mb-4">
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
            gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder
            Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben,
            können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter
            bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
            Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
          </p>
          <p>Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Hosting</h2>
          <p className="mb-4">Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>
          <p className="font-semibold text-slate-900">All-Inkl</p>
          <p className="mb-4">
            Anbieter ist die ALL-INKL.COM - Neue Medien Münnich, Inh. René Münnich, Hauptstraße 68, 02742
            Friedersdorf (nachfolgend All-Inkl). Details entnehmen Sie der Datenschutzerklärung von All-Inkl:{" "}
            <Link href="https://all-inkl.com/datenschutzinformationen/" className="text-brand-blue hover:underline" target="_blank">https://all-inkl.com/datenschutzinformationen/</Link>.
          </p>
          <p className="mb-4">
            Die Verwendung von All-Inkl erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein
            berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website. Sofern eine
            entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art.
            6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den
            Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG
            umfasst. Die Einwilligung ist jederzeit widerrufbar.
          </p>
          <h4 className="font-semibold mt-4 mb-2">Auftragsverarbeitung</h4>
          <p>
            Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes
            geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der
            gewährleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren
            Weisungen und unter Einhaltung der DSGVO verarbeitet.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
          <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Datenschutz</h3>
          <p className="mb-4">
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
            personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie
            dieser Datenschutzerklärung.
          </p>
          <p className="mb-4">
            Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.
            Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende
            Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie
            und zu welchem Zweck das geschieht.
          </p>
          <p className="mb-4">
            Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail)
            Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
            möglich.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Hinweis zur verantwortlichen Stelle</h3>
          <p className="mb-2">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
          <p className="mb-4">
            Till Friedemann<br />
            Kornblumenweg, 9<br />
            29399 Wahrenholz<br />
            Telefon: 01608592128<br />
            E-Mail: till.friedemann@gmx.de
          </p>
          <p className="mb-4">
            Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über
            die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.)
            entscheidet.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Speicherdauer</h3>
          <p>
            Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben
            Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein
            berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen,
            werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer
            personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im
            letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
          </p>

          <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">SSL- bzw. TLS-Verschlüsselung</h3>
          <p>
            Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum
            Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. 
            Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt 
            und an dem Schloss-Symbol in Ihrer Browserzeile.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Datenerfassung auf dieser Website</h2>
          <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Kontaktformular</h3>
          <p className="mb-4">
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
            Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage
            und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre
            Einwilligung weiter.
          </p>
          <p className="mb-4">
            Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit
            der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen
            erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der
            effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer
            Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit
            widerrufbar.
          </p>
          <p>
            Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung
            auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt
            (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – 
            insbesondere Aufbewahrungsfristen – bleiben unberührt.
          </p>
        </section>

        <div className="pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Quelle: <Link 
              href="https://www.e-recht24.de" 
              className="text-brand-blue hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              e-recht24.de
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
