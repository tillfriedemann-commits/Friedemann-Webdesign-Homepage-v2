import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Services from "../components/Services";
import AboutMe from "../components/AboutMe";
import Portfolio from "../components/Portfolio";
import FunnelEntry from "../components/FunnelEntry";
import Footer from "../components/Footer";

export default function Page() {
  return (
    <div className="relative min-h-screen bg-white selection:bg-brand-orange/20 selection:text-brand-orange">
      <Header />
      <main className="relative">
        <HeroSection />
        <Services />
        <AboutMe />
        <Portfolio />
        <FunnelEntry />
      </main>
      <Footer />
    </div>
  );
}
