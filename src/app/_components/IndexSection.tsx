"use client";

import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const indexLinks = [
  {
    id: "completed-projects",
    title: "The Archives",
    description:
      "Chronicles of battle-tested solutions and ancient production code.",
    icon: "lucide:book-open",
  },
  {
    id: "current-projects",
    title: "The Workshop",
    description: "Active enchantments and experimental seeds in progress.",
    icon: "lucide:hammer",
  },
  {
    id: "other-projects",
    title: "The Daydreams",
    description: "Architecting the wonders of tomorrow in the dreaming phase.",
    icon: "lucide:cloud",
  },
];

const projectStats = [
  { label: "Active", count: 1, color: "text-primary", icon: "lucide:sprout" },
  { label: "Planned", count: 4, color: "text-accent", icon: "lucide:compass" },
  { label: "Success", count: 4, color: "text-secondary", icon: "lucide:crown" },
  { label: "Total", count: 9, color: "text-ghibli-oak", icon: "lucide:scroll" },
];

const IndexClouds = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const clouds = containerRef.current.querySelectorAll(".drifting-cloud");

    clouds.forEach((cloud) => {
      gsap.to(cloud, {
        x: "110vw",
        duration: "random(40, 80)",
        repeat: -1,
        ease: "none",
        delay: "random(0, 40)",
        onRepeat: () => {
          gsap.set(cloud, { x: "-20vw", y: `random(0, 100)%` });
        },
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-50"
    >
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="drifting-cloud index-cloud-parallax absolute w-[40rem] h-[20rem] bg-gradient-to-r from-primary/10 via-primary/20 to-transparent blur-[100px] rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: "-20vw",
          }}
        />
      ))}
    </div>
  );
};

export default function IndexSection() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (!mounted || !sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".index-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power3.out",
        clearProps: "opacity,transform",
      });

      // Parallax for Background Clouds
      gsap.to(".index-cloud-parallax", {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Stats card "growth" reveal
      gsap.from(".stat-card-growth", {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".stat-card-growth",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section
      ref={sectionRef}
      id="index"
      className="w-full min-h-screen py-32 px-6 lg:px-24 flex items-center justify-center relative overflow-hidden bg-background"
    >
      {/* Decorative Atmosphere */}
      {mounted && (
        <>
          <IndexClouds />
          <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
            <div className="absolute top-[20%] right-[-5%] w-[30rem] h-[30rem] bg-accent/5 blur-[100px] rounded-full animate-pulse" />
            <div className="absolute bottom-[20%] left-[-5%] w-[25rem] h-[25rem] bg-primary/5 blur-[100px] rounded-full animate-float" />
          </div>
        </>
      )}

      <div ref={containerRef} className="w-full max-w-7xl flex flex-col gap-24 z-10 relative">
        {/* Header */}
        <div className="index-reveal flex flex-col gap-6 text-center md:text-left max-w-4xl">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="h-[2px] w-12 bg-primary/30" />
            <h2 className="text-sm font-black uppercase tracking-[0.5em] text-primary">
              The Path Map
            </h2>
          </div>
          <h1 className="text-4xl md:text-8xl font-black leading-tight font-serif tracking-tight">
            Charting the <br />{" "}
            <span className="ghibli-text-gradient">Technical Wilderness</span>
          </h1>
          <p className="text-lg md:text-3xl text-foreground/60 font-medium italic border-l-4 md:border-l-8 border-primary/20 pl-6 md:pl-10 leading-relaxed md:ml-2">
            &quot;A collection of artifacts, experiments, and production legacy,
            meticulously organized for fellow travelers.&quot;
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          {/* Left: Philosophy & Stats */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-16">
            <div className="index-reveal flex flex-col gap-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30">
                The Philosophy
              </h3>
              <p className="text-lg md:text-xl leading-relaxed text-foreground/70 font-serif text-justify">
                Engineering is more than syntax; it&apos;s the art of creating
                living habitats for humanity. This ledger serves as a map
                through the dense forests of production code and the
                light-filled meadows of side projects.
              </p>
              <div className="flex items-center gap-4 text-primary italic font-serif text-lg">
                <Icon icon="lucide:feather" className="text-2xl" />
                <span>Scroll to explore the chapters.</span>
              </div>
            </div>

            <div className="index-reveal grid grid-cols-2 gap-6">
              {projectStats.map((stat, index) => (
                <div
                  key={index}
                  className="paper-card stat-card-growth p-6 md:p-10 flex flex-col gap-4 group relative overflow-hidden bg-white/40 backdrop-blur-sm"
                >
                  <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-125 transition-all duration-700">
                    <Icon icon={stat.icon} className="text-7xl" />
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest ${stat.color} opacity-80`}
                  >
                    {stat.label}
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl md:text-6xl font-black tracking-tighter transition-transform group-hover:translate-x-1">
                      {stat.count < 10 ? `0${stat.count}` : stat.count}
                    </span>
                    <span className="text-foreground/30 text-xs font-black uppercase tracking-widest">
                      Units
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Navigation */}
          <div className="index-reveal lg:col-span-12 xl:col-span-7 flex flex-col gap-10">
            {indexLinks.map((link, index) => (
              <motion.div
                key={index}
                onClick={() => handleScroll(link.id)}
                whileHover={{ x: 10 }}
                className="paper-card p-6 md:p-12 flex items-center justify-between group cursor-pointer border-primary/10 bg-white/40 hover:bg-white transition-all duration-500 shadow-xl backdrop-blur-sm"
              >
                <div className="flex items-center gap-6 md:gap-10">
                  <div className="p-4 md:p-6 bg-primary/10 rounded-[1.5rem] md:rounded-[2rem] group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-700 animate-float shadow-inner shrink-0">
                    <Icon icon={link.icon} className="text-4xl md:text-6xl" />
                  </div>
                  <div className="flex flex-col gap-1 md:gap-2">
                    <h3 className="text-2xl md:text-4xl font-black tracking-tight font-serif group-hover:text-primary transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm md:text-xl text-foreground/50 font-medium italic">
                      {link.description}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-full border-2 border-border/50 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-500 shadow-sm">
                  <Icon
                    icon="lucide:arrow-down-right"
                    className="text-3xl group-hover:rotate-45 transition-all text-primary"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
