import CompletedProjectsSection from "@/modules/CompletProjectSection";
import HeroSection from "@/modules/HeroSection";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen relative">
      <HeroSection />
      <div className="absolute top-[calc(100vh-50px)] left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex flex-col bg-[#4B4A5D] px-6 py-3 rounded-xl shadow-md h-fit gap-2">
          <div className="flex flex-row  gap-6">
            <Link
              href="https://labskill.co"
              className="flex items-center justify-center w-40 h-20 bg-[#383444] rounded-lg"
            >
              <Image
                src="/labskill.webp"
                alt="labskill"
                height={1000}
                width={1000}
                className="w-20"
              />
            </Link>
            <Link
              href="https://kawanstudy.com"
              className="flex items-center justify-center w-40 h-20 bg-[#383444] rounded-lg"
            >
              <Image
                src="/kawanstudy.webp"
                alt="kawanstudy"
                height={1000}
                width={1000}
                className="w-30"
              />
            </Link>
          </div>
        </div>
      </div>
      <CompletedProjectsSection />
    </div>
  );
}
