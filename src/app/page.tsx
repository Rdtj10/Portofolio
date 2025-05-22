import Transition from "@/components/Transition";
import ContactSection from "@/components/partials/ContactSection";
import Footer from "@/components/partials/Footer";
import HeroSection from "@/components/partials/HeroSection";
import IndexSection from "@/components/partials/IndexSection";
import LogoMarquee from "@/components/partials/LogoMarquee";
import AllProjects from "@/modules/AllProjects";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  return (
    <AnimatePresence mode="wait">
      <div className="flex flex-col w-full min-h-screen relative">
        <Transition />
        <HeroSection />
        <LogoMarquee />
        <IndexSection />
        <AllProjects />
        <ContactSection />
        <Footer />
      </div>
    </AnimatePresence>
  );
}
