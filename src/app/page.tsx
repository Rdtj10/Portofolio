import Transition from "@/components/Transition";
import CompletedProjectsSection from "@/components/modules/CompletedProjectSection";
import ContactSection from "@/components/modules/ContactSection";
import Footer from "@/components/modules/Footer";
import HeroSection from "@/components/modules/HeroSection";
import IndexSection from "@/components/modules/IndexSection";
import LogoMarquee from "@/components/modules/LogoMarquee";
import PendingProjectSection from "@/components/modules/PendingProjectSection";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  return (
    <AnimatePresence mode="wait">
      <div className="flex flex-col w-full min-h-screen relative">
        <Transition />
        <HeroSection />
        <LogoMarquee />
        <IndexSection />
        <CompletedProjectsSection />
        <PendingProjectSection />
        <ContactSection />
        <Footer />
      </div>
    </AnimatePresence>
  );
}
