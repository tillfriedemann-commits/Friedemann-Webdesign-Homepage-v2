import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Services from "../components/Services";
import AboutMe from "../components/AboutMe";
// import Portfolio from "../components/Portfolio";
import FunnelEntry from "../components/FunnelEntry";
import Footer from "../components/Footer";
import { client } from "../lib/sanity/client";

async function getAboutMeImage() {
  const query = `*[_type == "aboutMe"][0].aboutMeImage`;
  const image = await client.fetch(query);
  return image;
}

export default async function Page() {
  const aboutMeImage = await getAboutMeImage();

  return (
    <div className="relative min-h-screen bg-white selection:bg-brand-orange/20 selection:text-brand-orange">
      <Header />
      <main className="relative">
        <HeroSection />
        <Services />
        <AboutMe image={aboutMeImage} />
        {/* <Portfolio /> */}
        <FunnelEntry />
      </main>
      <Footer />
    </div>
  );
}
