"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-140 text-slate-600 py-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">

          <div>
            <div className="mb-4">
              <img
                src="/logo.webp"
                alt="Friedemann Webdesign Logo"
                className="h-20 w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Dein persönlicher Ansprechpartner für modernes Webdesign und IT-Lösungen im ländlichen Raum.
            </p>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold mb-4">Kontakt</h4>
            <address className="not-italic text-sm space-y-2">
              <p>Kornblumenweg 9</p>
              <p>29399 Wahrenholz</p>
              <p className="pt-2">
                <a href="tel:01608592128" className="hover:text-brand-orange transition-colors">01608592128</a>
              </p>
              <p>
                <a href="mailto:info@friedemann-webdesign.de" className="hover:text-brand-orange transition-colors">info@friedemann-webdesign.de</a>
              </p>
            </address>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold mb-4">Rechtliches</h4>
            <ul className="text-sm space-y-1">
              <li><Link href="/impressum" prefetch={false} className="block py-1.5 hover:text-brand-blue transition-colors">Impressum</Link></li>
              <li><Link href="/datenschutz" prefetch={false} className="block py-1.5 hover:text-brand-blue transition-colors">Datenschutz</Link></li>
              <li><Link href="/agb" prefetch={false} className="block py-1.5 hover:text-brand-blue transition-colors">AGB</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Friedemann Webdesign. Alle Rechte vorbehalten.</p>
          <p className="mt-2 md:mt-0">Mit ❤️ lokal entwickelt.</p>
        </div>
      </div>
    </footer>
  );
}
