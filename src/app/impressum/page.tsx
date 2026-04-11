import Link from "next/link";
import { ArrowLeft } from "lucide-react"; 

export default function ImpressumPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-6 text-slate-800 font-sans">
      <div className="mb-12">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-brand-blue transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zur Startseite
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Impressum</h1>
      <section className="space-y-8 leading-relaxed">
        <div>
          <p className="italic text-slate-500 mb-4">[Hier folgt der rechtsgültige Text]</p>
          <h2 className="text-xl font-semibold mb-2">Angaben gemäß § 5 TMG</h2>
          <p>
            [Name / Firma]<br />
            [Straße Hausnummer]<br />
            [PLZ Ort]
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Kontakt</h2>
          <p>
            Telefon: [Telefonnummer]<br />
            E-Mail: [E-Mail-Adresse]
          </p>
        </div>
      </section>
    </main>
  );
}
