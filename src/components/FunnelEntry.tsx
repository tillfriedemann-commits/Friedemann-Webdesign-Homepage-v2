"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  CircleHelp,
  LayoutTemplate,
  Loader2,
  Mail,
  Phone,
  RefreshCw,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

type Step = "selection" | "contact" | "success";
type FormStatus = "idle" | "loading" | "error";
type ContactData = { name: string; email: string; message: string };
const options = [
  { id: "new", title: "Eine neue Website", icon: LayoutTemplate },
  { id: "rework", title: "Website überarbeiten", icon: RefreshCw },
  { id: "maintenance", title: "Wartung & Pflege", icon: ShieldCheck },
  { id: "other", title: "Eine andere IT-Frage", icon: CircleHelp },
];

export default function FunnelEntry() {
  const [step, setStep] = useState<Step>("selection");
  const [selection, setSelection] = useState<string | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<ContactData>({
    name: "",
    email: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const previousStep = useRef(step);
  const submissionInFlight = useRef(false);

  useEffect(() => {
    if (previousStep.current !== step) {
      headingRef.current?.focus({ preventScroll: true });
      headingRef.current?.scrollIntoView({
        block: "nearest",
        behavior: "instant",
      });
      previousStep.current = step;
    }
  }, [step]);

  useEffect(() => {
    if (status === "error") errorRef.current?.focus();
  }, [status, errorMessage]);

  const goBack = () => {
    setStep("selection");
    setStatus("idle");
    setErrorMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionInFlight.current) return;
    submissionInFlight.current = true;
    setStatus("loading");
    setErrorMessage("");
    try {
      const response = await fetch("/api/mailer.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, selection, website_url: honeypot }),
        signal: AbortSignal.timeout(20000),
      });
      if (!response.headers.get("content-type")?.includes("application/json")) {
        throw new Error("invalid-response");
      }
      const result = await response.json();
      if (!response.ok || result.status !== "success") {
        setErrorMessage(
          result.message ||
            "Deine Anfrage konnte gerade nicht gesendet werden. Bitte versuche es erneut oder schreib mir direkt.",
        );
        setStatus("error");
        return;
      }
      setStep("success");
      setStatus("idle");
      setFormData({ name: "", email: "", message: "" });
      setHoneypot("");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Deine Anfrage konnte gerade nicht gesendet werden. Deine Eingaben bleiben erhalten. Bitte versuche es erneut oder schreib mir direkt.",
      );
    } finally {
      submissionInFlight.current = false;
    }
  };

  const selectedTitle = options.find(
    (option) => option.id === selection,
  )?.title;
  const updateField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <section
      id="kontakt"
      className="section contact-section"
      aria-labelledby="contact-title"
    >
      <div className="site-container contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">Fangen wir mit einem Gespräch an</p>
          <h2 id="contact-title">
            Deine Idee.
            <br />
            Unser erster Schritt.
          </h2>
          <p>
            Eine neue Website, ein frischer Auftritt oder einfach eine Frage?
            Erzähl mir kurz, was du vorhast. Ich melde mich persönlich bei dir.
          </p>
          <ul className="contact-points">
            <li>
              <Check size={17} aria-hidden="true" /> Kostenloses Erstgespräch
            </li>
            <li>
              <Check size={17} aria-hidden="true" /> Unverbindlich kennenlernen
            </li>
            <li>
              <Check size={17} aria-hidden="true" /> Direkt mit mir, ohne Umwege
            </li>
          </ul>
          <div className="direct-contact">
            <p>Lieber direkt Kontakt aufnehmen?</p>
            <a href="mailto:info@friedemann-webdesign.de">
              <Mail size={16} aria-hidden="true" />
              info@friedemann-webdesign.de
            </a>
            <a href="tel:+491608592128">
              <Phone size={16} aria-hidden="true" />
              0160 859 21 28
            </a>
          </div>
        </div>
        <div className="contact-card">
          <div className="form-progress">
            <span>
              {step === "success"
                ? "Danke für dein Vertrauen"
                : "Deine Anfrage"}
            </span>
            <span>
              {step === "selection"
                ? "Schritt 1 von 2"
                : step === "contact"
                  ? "Schritt 2 von 2"
                  : "Anfrage gesendet"}
            </span>
          </div>

          {step === "selection" && (
            <div className="form-stage">
              <h3 ref={headingRef} tabIndex={-1}>
                Wobei kann ich dir helfen?
              </h3>
              <p>Wähle, was am besten zu deiner Idee passt.</p>
              <div className="service-options">
                {options.map(({ id, title, icon: Icon }) => (
                  <button
                    className="service-option"
                    type="button"
                    key={id}
                    onClick={() => {
                      setSelection(id);
                      setStep("contact");
                    }}
                  >
                    <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
                    <span>{title}</span>
                  </button>
                ))}
              </div>
              <p className="selection-footnote">
                Du bist noch unsicher? Wähle einfach „Eine andere IT-Frage“. Wir
                finden gemeinsam heraus, was du brauchst.
              </p>
            </div>
          )}

          {step === "contact" && (
            <div className="form-stage">
              <button
                type="button"
                className="form-back"
                onClick={goBack}
                disabled={status === "loading"}
              >
                <ArrowLeft size={15} aria-hidden="true" /> Auswahl ändern
              </button>
              <h3 ref={headingRef} tabIndex={-1}>
                Erzähl mir von deiner Idee.
              </h3>
              <p>
                Dein Thema: <strong>{selectedTitle}</strong>
              </p>
              <form
                onSubmit={handleSubmit}
                className="contact-form"
                aria-busy={status === "loading"}
              >
                <div className="honeypot" aria-hidden="true">
                  <label htmlFor="website_url">Website-URL</label>
                  <input
                    id="website_url"
                    type="text"
                    name="website_url"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="contact-name">
                    Dein Name / Firma <span>Pflichtfeld</span>
                  </label>
                  <input
                    className="form-input"
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={200}
                    value={formData.name}
                    onChange={updateField}
                    disabled={status === "loading"}
                    placeholder="Wie darf ich dich ansprechen?"
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="contact-email">
                    Deine E-Mail-Adresse <span>Pflichtfeld</span>
                  </label>
                  <input
                    className="form-input"
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={320}
                    value={formData.email}
                    onChange={updateField}
                    disabled={status === "loading"}
                    placeholder="du@dein-betrieb.de"
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="contact-message">
                    Was hast du vor? <span>Pflichtfeld</span>
                  </label>
                  <textarea
                    className="form-input"
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    maxLength={5000}
                    value={formData.message}
                    onChange={updateField}
                    disabled={status === "loading"}
                    aria-describedby="message-help"
                    placeholder="Zum Beispiel: Ich brauche eine Website für meinen Betrieb …"
                  />
                  <span className="field-help" id="message-help">
                    Ein paar Sätze reichen. Die Details besprechen wir
                    persönlich.
                  </span>
                </div>
                {status === "error" && (
                  <div
                    className="form-error"
                    role="alert"
                    tabIndex={-1}
                    ref={errorRef}
                  >
                    <AlertCircle size={19} aria-hidden="true" />
                    <div>
                      {errorMessage}
                      <br />
                      <a href="mailto:info@friedemann-webdesign.de">
                        Direkt per E-Mail schreiben
                      </a>
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  className="button button-primary form-submit"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2
                        size={18}
                        className="spinner"
                        aria-hidden="true"
                      />{" "}
                      Wird gesendet …
                    </>
                  ) : (
                    <>
                      Unverbindlich anfragen{" "}
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </>
                  )}
                </button>
                <p className="form-privacy">
                  Ich nutze deine Angaben, um deine Anfrage zu beantworten. Mehr
                  zur Verarbeitung deiner Daten findest du in der{" "}
                  <Link href="/datenschutz" prefetch={false}>
                    Datenschutzerklärung
                  </Link>
                  .
                </p>
              </form>
            </div>
          )}

          {step === "success" && (
            <div className="form-stage form-success">
              <div className="success-icon">
                <CheckCircle2 size={29} aria-hidden="true" />
              </div>
              <h3 ref={headingRef} tabIndex={-1}>
                Danke! Jetzt bin ich dran.
              </h3>
              <p>
                Deine Anfrage wurde gesendet. Ich melde mich innerhalb von 24
                Stunden persönlich bei dir. Dann sprechen wir über deine Idee
                und die nächsten Schritte.
              </p>
              <button
                className="text-link"
                type="button"
                onClick={() => {
                  setSelection(null);
                  setStep("selection");
                }}
              >
                Eine weitere Frage stellen{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
          )}
          <span role="status" aria-live="polite" className="sr-only">
            {status === "loading"
              ? "Deine Anfrage wird gesendet."
              : step === "success"
                ? "Deine Anfrage wurde erfolgreich gesendet."
                : ""}
          </span>
        </div>
      </div>
    </section>
  );
}
