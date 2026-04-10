import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-sm font-medium text-slate-600 mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
              Dein Webdesigner aus der Region
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Professionelles Webdesign – <br className="hidden sm:block" />
              <span className="text-brand-blue">Lokal, Modern, Persönlich.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
              Ich baue Websites, die neue Kunden für dich gewinnen, und kümmere mich zuverlässig um die gesamte Technik dahinter. Kein Agentur-Chaos, sondern ein direkter Ansprechpartner.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a 
                href="#kontakt" 
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-brand-orange hover:bg-[#cc6b00] rounded-full transition-colors shadow-lg shadow-brand-orange/20"
              >
                Kostenloses Erstgespräch buchen
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-blue" />
                <span>100% DSGVO Konform</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-blue" />
                <span>Hosting in Deutschland</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-blue" />
                <span>Lokaler Ansprechpartner</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative lg:ml-auto w-full max-w-md mx-auto lg:max-w-none"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-slate-100 relative">
              {/* Platzhalter für dein freigestelltes Porträtfoto */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-8 text-center border-2 border-dashed border-slate-300 rounded-3xl m-4">
                <div className="w-24 h-24 bg-slate-200 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-4xl">👋</span>
                </div>
                <p className="font-medium text-slate-600">Platzhalter für dein Porträt</p>
                <p className="text-sm mt-2">Ein sympathisches, professionelles Bild von dir schafft sofort Vertrauen.</p>
              </div>
            </div>
            
            {/* Dekoratives Element */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">5.0</span>
                </div>
                <div>
                  <div className="flex text-brand-orange text-sm">
                    ★★★★★
                  </div>
                  <p className="text-sm font-medium text-slate-900 mt-1">Top bewertet lokal</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
