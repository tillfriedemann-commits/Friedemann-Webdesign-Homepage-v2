import { Plus } from "lucide-react";

const questions = [
  {
    question: "Was kostet eine Website bei dir?",
    answer:
      "Das hängt davon ab, was du brauchst: zum Beispiel wie viele Seiten, welche Inhalte und welche Funktionen. Im kostenlosen Erstgespräch klären wir den Umfang. Danach bekommst du ein individuelles Angebot, bevor wir mit der Umsetzung starten.",
  },
  {
    question: "Ich habe noch keine Texte oder Bilder. Ist das ein Problem?",
    answer:
      "Nein, du musst nicht mit einer fertigen Website-Idee kommen. Wir schauen gemeinsam, welche Inhalte sinnvoll sind und was schon vorhanden ist. Welche Unterstützung du dabei brauchst, besprechen wir direkt miteinander.",
  },
  {
    question: "Kannst du meine bestehende Website überarbeiten?",
    answer:
      "Ja. Wir schauen uns deinen bisherigen Auftritt an und besprechen, was besser werden soll. Ob eine gezielte Überarbeitung oder ein neuer Aufbau sinnvoll ist, klären wir anhand deiner Website und deiner Ziele.",
  },
  {
    question: "Kümmerst du dich auch nach dem Start um die Seite?",
    answer:
      "Auf Wunsch übernehme ich die laufende Wartung und Pflege – zum Beispiel Updates, Backups und inhaltliche Anpassungen. Den Umfang stimmen wir persönlich ab.",
  },
  {
    question: "Muss mein Betrieb in Wahrenholz sein?",
    answer:
      "Mein Schwerpunkt sind Betriebe aus Wahrenholz und Umgebung. Wenn du von weiter weg kommst, melde dich trotzdem gern. Vieles lässt sich unkompliziert per Telefon oder E-Mail besprechen.",
  },
];

export default function FAQ() {
  return (
    <section className="section faq-section" aria-labelledby="faq-title">
      <div className="site-container faq-grid">
        <div className="section-heading">
          <p className="eyebrow">Gut zu wissen</p>
          <h2 id="faq-title">Noch eine Frage?</h2>
          <p>
            Hier sind Antworten auf die Dinge, die wir oft vor dem Start klären.
          </p>
          <a href="#kontakt" className="text-link">
            Oder frag mich direkt.
          </a>
        </div>
        <div className="faq-list">
          {questions.map(({ question, answer }) => (
            <details key={question}>
              <summary>
                {question}
                <Plus size={20} aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
