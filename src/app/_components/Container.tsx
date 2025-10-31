import Transition from "@/components/Transition";
import HeroSection from "./HeroSection";
import LogoMarquee from "./LogoMarquee";
import IndexSection from "./IndexSection";
import ContactSection from "./ContactSection";
import AllProjects from "@/modules/AllProjects";
import Footer from "./Footer";
import VisitorDisplay from "@/components/VisitorDisplay";

export default function Container() {
  return (
    <section className="flex flex-col w-full min-h-screen relative">
      <Transition />
      <HeroSection />
      <LogoMarquee />
      <IndexSection />
      <AllProjects />
      <ContactSection />
      <Footer />
      <VisitorDisplay />
    </section>
  );
}
