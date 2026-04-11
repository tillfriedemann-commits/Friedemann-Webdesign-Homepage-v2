"use client";
import { motion } from "motion/react";
import { ArrowRight, Quote } from "lucide-react";

const caseStudies = [
  {
    client: "Zahnarztpraxis Dr. Müller",
    situation: "Veraltete Website aus 2010, nicht auf Smartphones lesbar, keine Online-Terminbuchung.",
    solution: "Ich habe eine moderne, beruhigende Website entwickelt und ein einfaches Termin-Tool integriert.",
    result: "40% weniger telefonische Terminanfragen, mehr Zeit für die Patienten vor Ort."
  },
  {
    client: "Schreinerei Holzwerk",
    situation: "Gute Arbeit, aber online unsichtbar. Keine Bilder der tollen Projekte im Netz.",
    solution: "Aufbau einer Portfolio-Website mit Fokus auf großformatige Bilder und lokales SEO.",
    result: "Regelmäßige Anfragen aus dem direkten Umkreis über das neue Kontaktformular."
  }
];

export default function Portfolio() {
  return (
    <section className="py-24 bg-brand-blue text-white" id="referenzen">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Meine Referenzen
          </h2>
          <p className="text-brand-blue-100 text-lg max-w-2xl text-slate-300">
            Ergebnisse sprechen lauter als Worte. Hier sind einige Beispiele, wie ich lokalen Betrieben bereits geholfen habe.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {caseStudies.map((study, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-semibold mb-6 text-brand-orange">{study.client}</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Ausgangslage</h4>
                  <p className="text-slate-200">{study.situation}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Meine Lösung</h4>
                  <p className="text-slate-200">{study.solution}</p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-sm font-semibold text-brand-orange uppercase tracking-wider mb-2">Ergebnis</h4>
                  <p className="text-white font-medium">{study.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 sm:p-12 text-slate-900 text-center max-w-4xl mx-auto relative"
        >
          <Quote className="w-12 h-12 text-brand-orange/20 mx-auto mb-6" />
          <p className="text-xl sm:text-2xl font-medium leading-relaxed mb-8">
            "Die Zusammenarbeit war unkompliziert und extrem schnell. Endlich haben wir eine Website, die genau das ausstrahlt, wofür unser Betrieb steht. Absolute Empfehlung!"
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
            <div className="text-left">
              <p className="font-bold text-slate-900">Max Mustermann</p>
              <p className="text-sm text-slate-500">Geschäftsführer, Musterbetrieb GmbH</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
