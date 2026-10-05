import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-grid">
          <div>
            <a
              href="#start"
              aria-label="Friedemann Webdesign – zum Seitenanfang"
            >
              <Image
                src="/logo.webp"
                alt="Friedemann Webdesign"
                width={240}
                height={131}
                className="footer-logo"
              />
            </a>
            <p>
              Moderne Websites.
              <br />
              Persönlich gemacht in Wahrenholz.
            </p>
          </div>
          <div>
            <h2>Direkt zu mir</h2>
            <address>
              <a href="mailto:info@friedemann-webdesign.de">
                info@friedemann-webdesign.de{" "}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a href="tel:+491608592128">0160 859 21 28</a>
              <span>
                Kornblumenweg 9<br />
                29399 Wahrenholz
              </span>
            </address>
          </div>
          <div>
            <h2>Gut zu wissen</h2>
            <nav aria-label="Rechtliche Informationen">
              <Link href="/impressum" prefetch={false}>
                Impressum
              </Link>
              <Link href="/datenschutz" prefetch={false}>
                Datenschutz
              </Link>
              <Link href="/agb" prefetch={false}>
                AGB
              </Link>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Friedemann Webdesign</span>
          <a href="#start">
            Zurück nach oben <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
