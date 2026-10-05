import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Services from "../components/Services";
import AboutMe from "../components/AboutMe";
import Process from "../components/Process";
import FAQ from "../components/FAQ";
import FunnelEntry from "../components/FunnelEntry";
import Footer from "../components/Footer";
import { client } from "../lib/sanity/client";
import { urlFor } from "../lib/sanity/image";

export const metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "Friedemann Webdesign – persönlich, unkompliziert, modern",
    description:
      "Till Friedemann gestaltet Websites für Betriebe aus Wahrenholz und Umgebung. Besprechen wir deine Idee im kostenlosen Erstgespräch.",
    url: "/",
    locale: "de_DE",
    type: "website",
  },
};

async function getAboutMeImage() {
  const query = `*[_type == "aboutMe"][0].aboutMeImage`;
  try {
    const image = await client.fetch(query);
    return image
      ? urlFor(image).width(960).height(1040).fit("crop").auto("format").url()
      : undefined;
  } catch {
    console.warn("Das Portrait konnte nicht aus Sanity geladen werden.");
    return undefined;
  }
}

export default async function Page() {
  const aboutMeImage = await getAboutMeImage();

  return (
    <div>
      <a href="#main-content" className="skip-link">
        Zum Inhalt springen
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <HeroSection imageUrl={aboutMeImage} />
        <Services />
        <AboutMe imageUrl={aboutMeImage} />
        <Process />
        <FAQ />
        <FunnelEntry />
      </main>
      <Footer />
    </div>
  );
}
