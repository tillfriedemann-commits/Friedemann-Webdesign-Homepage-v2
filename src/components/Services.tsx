import {
  ArrowUpRight,
  LayoutTemplate,
  Wrench,
  Lightbulb,
  Check,
} from "lucide-react";

const services = [
  {
    number: "01",
    icon: LayoutTemplate,
    title: "Eine Website, die zu dir passt.",
    description:
      "Für deinen Betrieb, deine Praxis oder deine Idee. Ich gestalte und entwickle deinen Auftritt so, dass Besucher verstehen, was du anbietest – und leicht Kontakt aufnehmen können.",
    benefits: [
      "Individuelles Design statt Baukasten",
      "Auf Smartphone und Desktop lesbar",
      "Klare Inhalte und kurze Kontaktwege",
    ],
    link: "Meine Website besprechen",
    featured: true,
  },
  {
    number: "02",
    icon: Wrench,
    title: "Gut betreut. Auch danach.",
    description:
      "Du kümmerst dich um dein Geschäft. Ich kümmere mich um Updates, Backups und Änderungen an deiner Website – nach gemeinsamer Absprache.",
    benefits: [
      "Wartung und Sicherheitsupdates",
      "Neue Inhalte und Anpassungen",
      "Ein vertrauter Ansprechpartner",
    ],
    link: "Über Betreuung sprechen",
    featured: false,
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "Technik, die den Alltag erleichtert.",
    description:
      "Ein neues E-Mail-Postfach, eine Online-Terminbuchung oder eine andere digitale Frage? Wir schauen gemeinsam, welche Lösung dir wirklich hilft.",
    benefits: [
      "E-Mail und digitale Werkzeuge",
      "Terminbuchung für deine Kunden",
      "Verständlich erklärt und eingerichtet",
    ],
    link: "Meine Frage stellen",
    featured: false,
  },
];

export default function Services() {
  return (
    <section
      id="leistungen"
      className="section services-section"
      aria-labelledby="services-title"
    >
      <div className="site-container">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Was ich für dich tun kann</p>
            <h2 id="services-title">
              Du hast das Geschäft.
              <br />
              Ich kümmere mich ums Digitale.
            </h2>
          </div>
          <p>
            Von der ersten Website bis zur laufenden Pflege. Persönlich
            abgestimmt, verständlich erklärt und passend zu deinem Alltag.
          </p>
        </div>
        <div className="service-grid">
          {services.map(
            ({
              number,
              icon: Icon,
              title,
              description,
              benefits,
              link,
              featured,
            }) => (
              <article
                key={number}
                className={`service-card${featured ? " service-card-featured" : ""}`}
              >
                <div className="service-card-top">
                  <span className="service-icon">
                    <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="card-number">{number}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <ul>
                  {benefits.map((benefit) => (
                    <li key={benefit}>
                      <Check size={15} aria-hidden="true" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <a href="#kontakt" className="text-link">
                  {link}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
