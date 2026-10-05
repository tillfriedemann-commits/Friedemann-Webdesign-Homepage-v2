import { ArrowUpRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Erst mal kennenlernen.",
    text: "Du erzählst mir von deinem Betrieb und deiner Idee. Ich höre zu, stelle Fragen und wir schauen, wie ich dir helfen kann.",
    note: "Kostenlos & unverbindlich",
  },
  {
    number: "02",
    title: "Gemeinsam einen Plan machen.",
    text: "Wir stimmen Inhalte, Gestaltung und Umfang ab. Du bekommst ein Angebot und weißt, was wir umsetzen und was es kostet.",
    note: "Klare Absprachen",
  },
  {
    number: "03",
    title: "Deine Website geht online.",
    text: "Ich baue deine Seite, wir schauen sie gemeinsam an und feilen an den Details. Nach deiner Freigabe geht sie online.",
    note: "Auf Wunsch weiter betreut",
  },
];

export default function Process() {
  return (
    <section
      id="ablauf"
      className="section process-section"
      aria-labelledby="process-title"
    >
      <div className="site-container">
        <div className="section-heading">
          <p className="eyebrow">Der Weg zu deiner Website</p>
          <h2 id="process-title">
            Eine Idee. Ein Gespräch.
            <br />
            Dann machen wir’s konkret.
          </h2>
          <p>
            Du musst kein Technikexperte sein. Ich begleite dich Schritt für
            Schritt.
          </p>
        </div>
        <ol className="process-grid">
          {steps.map((step) => (
            <li key={step.number}>
              <span className="step-number" aria-hidden="true">
                {step.number}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <span className="step-note">{step.note}</span>
            </li>
          ))}
        </ol>
        <div className="process-bottom">
          <p>
            Die Idee muss noch nicht fertig sein.
            <br />
            <strong>Ein erster Gedanke reicht für unser Gespräch.</strong>
          </p>
          <a href="#kontakt" className="button button-dark">
            Meine Idee besprechen <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
