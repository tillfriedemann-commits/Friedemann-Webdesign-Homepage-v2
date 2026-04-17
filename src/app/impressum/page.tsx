import Link from "next/link";
import { ArrowLeft } from "lucide-react"; 

export default function ImpressumPage() {
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
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Impressum</h1>
      <section className="space-y-6 leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold mb-2">Angaben gemäß § 5 TMG</h2>
          <p>
            Till Friedemann<br />
            Kornblumenweg, 9<br />
            29399 Wahrenholz
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Kontakt</h2>
          <p>
            Telefon: 01608592128<br />
            E-Mail: till.friedemann@gmx.de
          </p>
        </div>
        <div className="pt-4 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Quelle: <Link 
              href="https://www.e-recht24.de/impressum-generator.html" 
              prefetch={false}
              className="text-brand-blue hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              e-recht24.de
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
