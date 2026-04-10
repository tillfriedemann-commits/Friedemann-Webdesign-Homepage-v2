import { motion } from "motion/react";
import { Code2 } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          {/* Platzhalter für dein Logo - hier kannst du später dein img-Tag einfügen */}
          <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center text-white">
            <Code2 size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-brand-blue leading-none tracking-tight">Friedemann</span>
            <span className="text-sm text-slate-500 leading-none mt-1">Webdesign</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <a 
            href="#kontakt" 
            className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-brand-blue hover:bg-brand-blue/90 rounded-full transition-colors"
          >
            Kostenloses Erstgespräch
          </a>
        </motion.div>
      </div>
    </header>
  );
}
