"use client";
import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MonitorSmartphone,
  RefreshCw,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";

// ──────────────────────────────────────────────────────────────
// Typen
// ──────────────────────────────────────────────────────────────

type Step = "selection" | "contact" | "success";
type FormStatus = "idle" | "loading" | "error";

interface FormData {
  name: string;
  email: string;
  message: string;
}

// ──────────────────────────────────────────────────────────────
// URL zum PHP-Mailer-Skript anpassen, falls nötig
// ──────────────────────────────────────────────────────────────

const MAILER_URL = "https://friedemann-webdesign.de/api/mailer.php"; // ← Für Localhost-Test; in Produktion auf "/mailer.php" ändern!

// ──────────────────────────────────────────────────────────────
// Komponente
// ──────────────────────────────────────────────────────────────

export default function FunnelEntry() {
  const [step, setStep] = useState<Step>("selection");
  const [selection, setSelection] = useState<string | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Formularfelder
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  // Honeypot-Feld (muss immer leer bleiben)
  const [honeypot, setHoneypot] = useState("");

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ────────────────────────────────────────────────────────────
  // Formulardaten per fetch() an mailer.php senden
  // ────────────────────────────────────────────────────────────

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(MAILER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          selection: selection,
          // Honeypot-Feld: wird vom PHP-Backend geprüft
          website_url: honeypot,
        }),
      });

      const result = await response.json();

      if (result.status === "success") {
        setStep("success");
        setStatus("idle");
        // Formular zurücksetzen
        setFormData({ name: "", email: "", message: "" });
        setHoneypot("");
      } else {
        setStatus("error");
        setErrorMessage(
          result.message || "Ein Fehler ist aufgetreten. Bitte versuche es erneut."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Verbindungsfehler. Bitte prüfe deine Internetverbindung und versuche es erneut."
      );
    }
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

            {/* ─── Schritt 1: Service-Auswahl ─── */}
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

            {/* ─── Schritt 2: Kontaktformular ─── */}
            {step === "contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full flex flex-col justify-center"
              >
                <button
                  onClick={() => { setStep("selection"); setStatus("idle"); setErrorMessage(""); }}
                  className="text-sm text-slate-500 hover:text-slate-900 mb-6 inline-flex items-center"
                >
                  ← Zurück zur Auswahl
                </button>
                <h3 className="text-xl font-semibold text-slate-900 mb-6">Erzähl mir von deinem Projekt</h3>

                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* ═══ HONEYPOT – Unsichtbar für echte Nutzer ═══ */}
                  <div
                    aria-hidden="true"
                    className="opacity-0 absolute -z-50 overflow-hidden"
                    style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
                  >
                    <label htmlFor="website_url">Website-URL</label>
                    <input
                      type="text"
                      id="website_url"
                      name="website_url"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 mb-1">
                      Dein Name / Firma
                    </label>
                    <input
                      required
                      type="text"
                      id="contact-name"
                      name="name"
                      maxLength={200}
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all disabled:opacity-50"
                      placeholder="Max Mustermann"
                    />
                  </div>

                  {/* E-Mail */}
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 mb-1">
                      Deine E-Mail-Adresse
                    </label>
                    <input
                      required
                      type="email"
                      id="contact-email"
                      name="email"
                      maxLength={320}
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all disabled:opacity-50"
                      placeholder="max@beispiel.de"
                    />
                  </div>

                  {/* Nachricht */}
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 mb-1">
                      Deine Nachricht
                    </label>
                    <textarea
                      required
                      id="contact-message"
                      name="message"
                      rows={4}
                      maxLength={5000}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all resize-none disabled:opacity-50"
                      placeholder="Erzähl mir kurz, was du dir vorstellst…"
                    />
                  </div>

                  {/* ═══ Fehlermeldung ═══ */}
                  <AnimatePresence>
                    {status === "error" && errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
                      >
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit-Button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-brand-blue hover:bg-brand-blue/90 rounded-xl transition-colors mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        Wird gesendet…
                      </>
                    ) : (
                      <>
                        Anfrage absenden
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-slate-500 mt-4">
                    Deine Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
                  </p>
                </form>
              </motion.div>
            )}

            {/* ─── Schritt 3: Erfolg ─── */}
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
