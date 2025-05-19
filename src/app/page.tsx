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
        <div className="relative">
          <PendingProjectSection />
          {/* Overlay for "Under Improvement" */}
          <div className="absolute inset-0 bg-black/70 bg-opacity z-30 flex flex-col items-center justify-center pointer-events-none pt-28">
            <span className="flex items-center gap-2 text-white text-2xl font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                />
              </svg>
              Under improvement with{" "}
              <span className="font-bold text-blue-400">t3-oss</span>
            </span>
          </div>
        </div>
        <ContactSection />
        <Footer />
      </div>
    </AnimatePresence>
  );
}
