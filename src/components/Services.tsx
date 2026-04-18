"use client";
import { m } from "motion/react";
import { LayoutTemplate, Wrench, Lightbulb } from "lucide-react";

const services = [
  {
    icon: <LayoutTemplate className="w-8 h-8 text-brand-orange" />,
    title: "Webdesign & Entwicklung",
    description: "Ich gestalte und programmiere maßgeschneiderte Websites, die exakt zu deinem Handwerksbetrieb oder deiner Praxis passen. Modern, schnell und optimiert für Smartphones."
  },
  {
    icon: <Wrench className="w-8 h-8 text-brand-orange" />,
    title: "Wartung & Pflege",
    description: "Du hast keine Zeit für updates? Mein Sorglos-Paket übernimmt das für dich. Ich kümmere mich um Backups, Sicherheit und inhaltliche Anpassungen auf Zuruf."
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-brand-orange" />,
    title: "Individuelle IT-Lösungen",
    description: "Egal ob es um die Einrichtung von E-Mail-Postfächern, Terminbuchungs-Systemen oder andere digitale Hürden geht – ich finde eine Lösung nach persönlicher Absprache."
  }
];

export default function Services() {
  return (
    <section className="py-24 bg-slate-50" id="leistungen">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="max-w-3xl mx-auto text-center mb-20">
          <m.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-6"
          >
            Du hast keine Zeit für komplizierte Technik?
          </m.h2>
          <m.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            Viele lokale Betriebe ärgern sich über schlechte Auffindbarkeit im Netz oder unpersönliche Großagenturen, bei denen man nur eine Nummer ist. Ich ändere das. Ich nehme dir die Technik ab, damit du dich auf dein Kerngeschäft konzentrieren kannst.
          </m.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}
