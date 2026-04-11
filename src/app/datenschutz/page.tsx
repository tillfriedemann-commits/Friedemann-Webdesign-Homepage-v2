import Link from "next/link";
import { ArrowLeft } from "lucide-react"; 

export default function DatenschutzPage() {
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
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Datenschutz</h1>
      <section className="space-y-8 leading-relaxed">
        <div>
          <p className="italic text-slate-500 mb-4">[Hier folgt der rechtsgültige Text]</p>
        </div>
      </section>
    </main>
  );
}
