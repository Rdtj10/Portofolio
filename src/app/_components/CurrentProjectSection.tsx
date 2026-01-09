"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import { gsap } from "gsap";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/utils/cn";

const images = [
  {
    src: "/card/labskillv2-2.png",
    desc: "Refining the essence of user delight through organic design systems.",
    alt: "Modern UI/UX Design Screenshot",
  },
  {
    src: "/card/labskillv2-1.png",
    desc: "A symphony of clean code and high-performance architecture.",
    alt: "Performance Implementation Screenshot",
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 200, damping: 25 },
      opacity: { duration: 0.3 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 500 : -500,
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: "spring", stiffness: 200, damping: 25 },
      opacity: { duration: 0.3 },
    },
  }),
};

const BackgroundAtmosphere = () => (
  <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
    {/* Floating Clouds/Glows */}
    <div className="absolute top-[10%] left-[-10%] w-[50rem] h-[50rem] bg-secondary/10 blur-[130px] rounded-full animate-pulse" />
    <div className="absolute bottom-[20%] right-[-10%] w-[40rem] h-[40rem] bg-primary/10 blur-[110px] rounded-full animate-float [animation-delay:2s]" />

    {/* Decorative Seeds */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-primary/20 rounded-full"
        initial={{ y: "100%", x: `${Math.random() * 100}%`, opacity: 0 }}
        animate={{
          y: "-10%",
          x: `${Math.random() * 100 + (i % 2 === 0 ? 10 : -10)}%`,
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: 15 + Math.random() * 20,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 15,
        }}
      />
    ))}
  </div>
);

export default function CurrentProjectSection() {
  const [mounted, setMounted] = useState(false);
  const [[current, direction], setCurrentState] = useState([0, 0]);
  const sectionRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const paginate = (newDirection: number) => {
    setCurrentState([
      (current + newDirection + images.length) % images.length,
      newDirection,
    ]);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".current-reveal", {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-40 px-6 lg:px-24 flex flex-col gap-24 overflow-hidden bg-background"
      id="current-projects"
    >
      {mounted && (
        <>
          <BackgroundAtmosphere />

          <div className="current-reveal flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-12 bg-primary/30" />
              <h2 className="text-sm font-black uppercase tracking-[0.5em] text-primary">
                The Workshop
              </h2>
              <div className="h-[2px] w-12 bg-primary/30" />
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter font-serif leading-none">
              Active <span className="ghibli-text-gradient">Enchantments</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/60 font-medium italic max-w-2xl px-4">
              &quot;Currently nurturing the next generation of digital habitats,
              where code meets the whimsical rhythm of nature.&quot;
            </p>
          </div>

          <div className="current-reveal p-1">
            <div className="paper-card flex flex-col xl:flex-row w-full max-w-7xl mx-auto overflow-hidden bg-card/60 backdrop-blur-md shadow-2xl skew-x-[-1deg]">
              {/* Left Side: Info */}
              <div className="xl:w-2/5 w-full flex flex-col justify-between p-12 md:p-20 border-b xl:border-b-0 xl:border-r border-border/50 bg-white/40">
                <div className="flex flex-col gap-10">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_20px_oklch(var(--primary-params))]" />
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-primary">
                      In Bloom
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter font-serif leading-none">
                      Labskill <span className="text-primary italic">V2</span>
                    </h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30 ml-1">
                      Project Code: LS-2024
                    </p>
                  </div>

                  <div className="flex flex-col gap-6">
                    <p className="text-xl text-foreground/70 leading-relaxed font-serif text-justify border-l-8 border-secondary/20 pl-8 italic">
                      A gentle reimagining of our learning habitat. We&apos;re
                      architecting a space where curiosity flows without
                      friction, powered by an invisible but potent engine of
                      innovation.
                    </p>
                    <p className="text-base text-foreground/50 font-serif leading-relaxed">
                      This iteration focuses on the symbiosis between
                      high-performance architecture and human-centric design,
                      ensuring every interaction feels as natural as the wind
                      through the trees.
                    </p>
                  </div>

                  <div className="flex flex-col gap-8 mt-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground/30">
                      Foundational Principles
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                      {[
                        {
                          icon: "lucide:wind",
                          label: "Fluidity",
                          text: "Zero-friction navigation",
                          color: "text-secondary",
                        },
                        {
                          icon: "lucide:sprout",
                          label: "Sustainability",
                          text: "Carbon-neutral logic",
                          color: "text-primary",
                        },
                        {
                          icon: "lucide:sparkles",
                          label: "Wonder",
                          text: "Micro-delightful details",
                          color: "text-accent",
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-6 p-6 bg-white/60 rounded-3xl border border-border/30 group hover:border-primary/40 transition-all shadow-inner"
                        >
                          <div
                            className={cn(
                              "p-4 rounded-[1.5rem] bg-white shadow-sm transition-transform group-hover:scale-110",
                              item.color
                            )}
                          >
                            <Icon icon={item.icon} className="text-3xl" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">
                              {item.label}
                            </span>
                            <span className="text-sm font-black text-foreground/70 uppercase tracking-widest">
                              {item.text}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href="#"
                  className="mt-16 flex items-center justify-between p-10 bg-primary/5 rounded-[2rem] hover:bg-primary/10 transition-all group border border-primary/20 shadow-sm"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-black text-[10px] uppercase tracking-[0.4em] text-primary/60 group-hover:text-primary transition-colors">
                      The Workshop Diary
                    </span>
                    <span className="text-xs text-foreground/40 font-serif italic">
                      Viewing 12 current entry...
                    </span>
                  </div>
                  <div className="w-14 h-14 flex items-center justify-center bg-white rounded-full shadow-md group-hover:scale-110 transition-all">
                    <Icon
                      icon="lucide:feather"
                      className="text-2xl text-primary"
                    />
                  </div>
                </Link>
              </div>

              {/* Right Side: Slider */}
              <div className="xl:w-3/5 w-full relative min-h-[600px] md:min-h-[900px] bg-ghibli-oak/20 overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[current].src}
                      alt={images[current].alt}
                      fill
                      className="object-cover opacity-90 transition-transform duration-[10s] hover:scale-110"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent border-t border-white/10" />

                    <div className="absolute bottom-16 left-16 md:left-24 right-16 md:right-24">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col gap-6"
                      >
                        <div className="paper-card p-10 md:p-14 bg-white/40 backdrop-blur-xl border-white/40 shadow-2xl relative overflow-hidden">
                          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
                          <p className="text-3xl md:text-5xl font-black tracking-tight text-foreground font-serif leading-tight">
                            &quot;{images[current].desc}&quot;
                          </p>
                        </div>

                        <div className="flex items-center gap-8 px-6">
                          <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span className="text-xs font-black tracking-[0.4em] text-foreground/40 uppercase">
                              Chapter {current + 1}
                            </span>
                          </div>
                          <div className="h-[1px] flex-grow bg-foreground/10" />
                          <span className="text-xs font-black tracking-[0.4em] text-foreground/40 uppercase">
                            OF {images.length}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="absolute top-16 right-16 flex gap-6 z-10">
                  <button
                    onClick={() => paginate(-1)}
                    className="w-16 h-16 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-[1.5rem] border border-white/50 hover:bg-white transition-all active:scale-90 shadow-xl group"
                  >
                    <Icon
                      icon="lucide:arrow-left"
                      className="text-3xl text-primary group-hover:-translate-x-1 transition-transform"
                    />
                  </button>
                  <button
                    onClick={() => paginate(1)}
                    className="w-16 h-16 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-[1.5rem] border border-white/50 hover:bg-white transition-all active:scale-90 shadow-xl group"
                  >
                    <Icon
                      icon="lucide:arrow-right"
                      className="text-3xl text-primary group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
