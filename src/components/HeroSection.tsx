"use client";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-sm font-medium text-slate-700 mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse"></span>
              Dein Webdesigner aus der Region
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Professionelles Webdesign – <br className="hidden sm:block" />
              <span className="text-brand-blue">Lokal, Modern, Persönlich.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Ich baue Websites, die neue Kunden für dich gewinnen, und kümmere mich zuverlässig um die gesamte Technik dahinter. Kein Agentur-Chaos, sondern ein direkter Ansprechpartner.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-14 justify-center">
              <a 
                href="#kontakt" 
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-brand-orange hover:bg-[#cc6b00] rounded-full transition-colors shadow-lg shadow-brand-orange/20"
              >
                Kostenloses Erstgespräch buchen
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>

            <div className="flex items-center justify-center gap-4 mb-16">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs overflow-hidden">
                    <span className="text-slate-400">👤</span>
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex text-brand-orange text-sm">
                  ★★★★★
                </div>
                <p className="text-sm font-medium text-slate-900 mt-0.5">Top bewertet lokal</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 text-sm text-slate-600 justify-center">
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

        </div>
      </div>
    </section>
  );
}
