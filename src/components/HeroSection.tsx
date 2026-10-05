import Image from "next/image";
import { ArrowDown, ArrowUpRight, Check, MapPin } from "lucide-react";

export default function HeroSection({ imageUrl }: { imageUrl?: string }) {
  return (
    <section id="start" className="hero" aria-labelledby="hero-title">
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-dot" /> Webdesign aus Wahrenholz
          </p>
          <h1 id="hero-title">
            Deine Website.
            <br />
            Modern gemacht.
            <br />
            <span>Persönlich betreut.</span>
          </h1>
          <p className="hero-description">
            Ich bin Till. Ich baue Websites für Betriebe aus Wahrenholz und
            Umgebung – damit dein Geschäft online genauso gut ankommt wie vor
            Ort.
          </p>
          <div className="hero-actions">
            <a href="#kontakt" className="button button-primary">
              Lass uns sprechen <ArrowUpRight size={19} aria-hidden="true" />
            </a>
            <a href="#leistungen" className="text-link">
              Was ich für dich tun kann{" "}
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          <p className="cta-note">
            Das erste Gespräch ist kostenlos und unverbindlich.
          </p>
          <ul className="hero-assurances" aria-label="Deine Vorteile">
            <li>
              <Check size={15} aria-hidden="true" /> Ein Ansprechpartner
            </li>
            <li>
              <Check size={15} aria-hidden="true" /> Klare Absprachen
            </li>
            <li>
              <Check size={15} aria-hidden="true" /> Für dein Geschäft gemacht
            </li>
          </ul>
        </div>
        <div className="hero-person">
          <div className="portrait-frame">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Till Friedemann, dein persönlicher Ansprechpartner für Webdesign"
                fill
                sizes="(max-width: 767px) 90vw, (max-width: 1100px) 44vw, 480px"
                className="hero-portrait"
                priority
              />
            ) : (
              <div className="portrait-fallback">
                <span>TF</span>
                <p>Persönlich. Von Anfang an.</p>
              </div>
            )}
          </div>
          <div className="person-caption">
            <div>
              <strong>Till Friedemann</strong>
              <span>Dein digitaler Handwerker.</span>
            </div>
            <span className="location-tag">
              <MapPin size={15} aria-hidden="true" /> Wahrenholz
            </span>
          </div>
          <div className="personal-note">
            <span className="personal-note-mark" aria-hidden="true">
              ↳
            </span>{" "}
            Du sprichst mit mir. Ich baue deine Website.
          </div>
        </div>
      </div>
      <div className="site-container hero-bottom">
        <span>Für Handwerk, Praxen & lokale Unternehmen</span>
        <a href="#leistungen">
          Entdecke die Möglichkeiten <ArrowDown size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
