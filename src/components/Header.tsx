import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <a
          href="#start"
          className="brand-link"
          aria-label="Friedemann Webdesign – zum Seitenanfang"
        >
          <Image
            src="/logo.webp"
            alt="Friedemann Webdesign"
            width={240}
            height={131}
            className="brand-logo"
            priority
          />
        </a>
        <nav aria-label="Hauptnavigation" className="header-nav">
          <a href="#leistungen">Leistungen</a>
          <a href="#ueber-mich">Über mich</a>
          <a href="#ablauf">So läuft’s</a>
        </nav>
        <a href="#kontakt" className="button button-dark header-cta">
          <span className="header-cta-long">Projekt besprechen</span>
          <span className="header-cta-short">Kontakt</span>
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
