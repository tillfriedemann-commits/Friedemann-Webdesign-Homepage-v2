import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MonitorSmartphone, RefreshCw, ShieldCheck, HelpCircle, ArrowRight } from "lucide-react";

type Step = "selection" | "contact" | "success";

export default function FunnelEntry() {
  const [step, setStep] = useState<Step>("selection");
  const [selection, setSelection] = useState<string | null>(null);

  const options = [
    { id: "new", title: "Neue Website", icon: <MonitorSmartphone className="w-6 h-6" /> },
    { id: "rework", title: "Website überarbeiten", icon: <RefreshCw className="w-6 h-6" /> },
    { id: "maintenance", title: "Regelmäßige Pflege", icon: <ShieldCheck className="w-6 h-6" /> },
    { id: "other", title: "Sonstige IT-Frage", icon: <HelpCircle className="w-6 h-6" /> },
  ];

  const handleSelect = (id: string) => {
    setSelection(id);
    setStep("contact");
  };

  return (
    <section className="py-24 bg-slate-50" id="kontakt">
      <div className="max-w-3xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Lass uns dein Projekt besprechen
          </h2>
          <p className="text-lg text-slate-600">
            Kein langes Formular. Klick einfach an, wobei ich dir helfen kann.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-10 min-h-[400px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            
            {step === "selection" && (
              <motion.div
                key="selection"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full flex flex-col justify-center"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">Wobei kann ich dich unterstützen?</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(opt.id)}
                      className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-slate-100 hover:border-brand-orange hover:bg-orange-50 transition-all group text-center"
                    >
                      <div className="text-slate-400 group-hover:text-brand-orange mb-3 transition-colors">
                        {opt.icon}
                      </div>
                      <span className="font-medium text-slate-700 group-hover:text-brand-orange transition-colors">
                        {opt.title}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === "contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full flex flex-col justify-center"
              >
                <button 
                  onClick={() => setStep("selection")}
                  className="text-sm text-slate-500 hover:text-slate-900 mb-6 inline-flex items-center"
                >
                  ← Zurück zur Auswahl
                </button>
                <h3 className="text-xl font-semibold text-slate-900 mb-6">Wie kann ich dich am besten erreichen?</h3>
                
                <form 
                  onSubmit={(e) => { e.preventDefault(); setStep("success"); }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Dein Name / Firma</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all" placeholder="Max Mustermann" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Telefonnummer oder E-Mail</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all" placeholder="Für einen schnellen Rückruf" />
                  </div>
                  <button 
                    type="submit"
                    className="w-full flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-brand-blue hover:bg-brand-blue/90 rounded-xl transition-colors mt-6"
                  >
                    Anfrage absenden
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                  <p className="text-xs text-center text-slate-500 mt-4">
                    Deine Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
                  </p>
                </form>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <ShieldCheck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Vielen Dank!</h3>
                <p className="text-slate-600">
                  Ich habe deine Anfrage erhalten und melde mich innerhalb von 24 Stunden persönlich bei dir.
                </p>
                <button 
                  onClick={() => { setStep("selection"); setSelection(null); }}
                  className="mt-8 text-brand-orange font-medium hover:underline"
                >
                  Neue Anfrage stellen
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
