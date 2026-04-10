import { Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center text-white">
                <Code2 size={18} />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">Friedemann</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Dein persönlicher Ansprechpartner für modernes Webdesign und IT-Lösungen im ländlichen Raum.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Kontakt</h4>
            <address className="not-italic text-sm space-y-2">
              <p>Max-Mustermann-Straße 1</p>
              <p>12345 Musterstadt</p>
              <p className="pt-2">
                <a href="tel:+49123456789" className="hover:text-brand-orange transition-colors">0123 / 456 789</a>
              </p>
              <p>
                <a href="mailto:hallo@friedemann-webdesign.de" className="hover:text-brand-orange transition-colors">hallo@friedemann-webdesign.de</a>
              </p>
            </address>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Rechtliches</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Impressum</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Datenschutz</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AGB</a></li>
            </ul>
          </div>

        </div>
        
        <div className="pt-8 border-t border-slate-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Friedemann Webdesign. Alle Rechte vorbehalten.</p>
          <p className="mt-2 md:mt-0">Mit ❤️ lokal entwickelt.</p>
        </div>
      </div>
    </footer>
  );
}
