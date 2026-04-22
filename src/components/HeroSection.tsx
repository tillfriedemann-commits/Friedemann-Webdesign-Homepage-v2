"use client";
import React from "react";
import { m } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-24 lg:pt-48 lg:pb-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full flex flex-col items-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-slate-100 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-10">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
                Persönliches Webdesign aus der Region
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
                Moderne Websites. <br />
                <span className="text-brand-orange">Lokal & Persönlich.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-500 mb-12 leading-relaxed max-w-xl mx-auto">
                Websites für regionale Betriebe, die Kunden gewinnen. <br className="hidden sm:block" />
                Ohne Agentur-Chaos, mit echtem Fokus auf dein Geschäft.
              </p>

              <m.div
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <a
                  href="#kontakt"
                  className="inline-flex items-center justify-center px-10 py-5 text-base font-semibold text-white bg-brand-orange hover:bg-slate-900 rounded-full transition-all duration-300 shadow-xl shadow-brand-orange/20"
                >
                  Kostenlos anfragen
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </m.div>
            </m.div>

          </div>
        </div>
    </section>
  );
}



