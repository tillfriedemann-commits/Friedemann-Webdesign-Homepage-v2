"use client";
import { motion } from "motion/react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <img
            src="/logo.png"
            alt="Friedemann Webdesign Logo"
            className="h-24 w-auto object-contain py-1"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center px-5 sm:px-6 py-2 sm:py-2.5 text-sm font-medium text-white bg-brand-blue hover:bg-brand-blue/90 rounded-full transition-colors"
          >
            <span className="sm:hidden">Kontakt</span>
            <span className="hidden sm:inline">Kostenloses Erstgespräch</span>
          </a>
        </motion.div>
      </div>
    </header>
  );
}
