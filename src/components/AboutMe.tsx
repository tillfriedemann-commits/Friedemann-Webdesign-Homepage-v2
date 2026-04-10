import { motion } from "motion/react";
import { Check } from "lucide-react";

export default function AboutMe() {
  const benefits = [
    "Direkter Kontakt ohne Projektmanager",
    "Schnelle und flexible Umsetzung",
    "Faire Preise ohne Agentur-Overhead",
    "Technisches Know-how aus dem Informatikstudium"
  ];

  return (
    <section className="py-24 bg-white" id="ueber-mich">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 relative">
               {/* Platzhalter für ein Bild von dir in Aktion (z.B. am Laptop) */}
               <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-8 text-center border-2 border-dashed border-slate-300 rounded-3xl m-4">
                <p className="font-medium text-slate-600">Bild: Du bei der Arbeit</p>
                <p className="text-sm mt-2">Zeigt dich authentisch an deinem Arbeitsplatz.</p>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-blue/10 rounded-full blur-2xl -z-10"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-6">
              Hallo, ich bin dein <br/>
              <span className="text-brand-blue">digitaler Handwerker.</span>
            </h2>
            
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed mb-8">
              <p>
                Als Informatikstudent aus der Region habe ich mich darauf spezialisiert, lokalen Unternehmen zu einem professionellen digitalen Auftritt zu verhelfen. 
              </p>
              <p>
                Warum die Zusammenarbeit mit mir als Solo-Freelancer für dich der beste Weg ist? Ganz einfach: Bei mir gibt es keine Warteschleifen, keine wechselnden Ansprechpartner und keine versteckten Kosten.
              </p>
              <p>
                Du sprichst immer direkt mit demjenigen, der deine Website auch baut. Das spart Zeit, Nerven und Budget.
              </p>
            </div>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-800 font-medium">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
