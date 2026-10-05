import Image from "next/image";
import {
  ArrowUpRight,
  MessageCircle,
  Handshake,
  GraduationCap,
} from "lucide-react";

const benefits = [
  {
    icon: MessageCircle,
    title: "Du sprichst direkt mit mir.",
    text: "Von der ersten Idee bis zur fertigen Seite. Ich kenne dein Projekt und kümmere mich selbst darum.",
  },
  {
    icon: Handshake,
    title: "Wir klären alles gemeinsam.",
    text: "Was brauchst du wirklich? Was kostet es? Was passiert als Nächstes? Wir besprechen das verständlich und verbindlich.",
  },
  {
    icon: GraduationCap,
    title: "Design trifft technisches Know-how.",
    text: "Mein Informatikstudium ist die Grundlage. Dein Geschäft und deine Kunden geben die Richtung vor.",
  },
];

export default function AboutMe({ imageUrl }: { imageUrl?: string }) {
  return (
    <section
      id="ueber-mich"
      className="section about-section"
      aria-labelledby="about-title"
    >
      <div className="site-container about-grid">
        <div className="about-intro">
          <p className="eyebrow">Persönlich statt kompliziert</p>
          <h2 id="about-title">
            Eine gute Website beginnt mit einem guten Gespräch.
          </h2>
          <p>
            Hallo, ich bin Till – Informatikstudent und Webdesigner aus
            Wahrenholz. Ich helfe lokalen Unternehmen, ihre Arbeit auch online
            sichtbar zu machen.
          </p>
          <div className="about-person">
            {imageUrl ? (
              <Image
                src={imageUrl}
                width={60}
                height={60}
                alt=""
                className="about-avatar"
                sizes="60px"
              />
            ) : (
              <span className="about-avatar avatar-initials" aria-hidden="true">
                TF
              </span>
            )}
            <div>
              <strong>Till Friedemann</strong>
              <span>Ein Mensch. Ein Ansprechpartner.</span>
            </div>
          </div>
          <a href="#kontakt" className="text-link">
            Lernen wir uns kennen <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="about-benefits">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div className="about-benefit" key={title}>
              <span className="about-benefit-icon">
                <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
