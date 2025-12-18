"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: "/card/labskillv2-2.png",
    desc: "Refined, modern UI/UX design with dark mode support.",
    alt: "Modern UI/UX Design Screenshot",
  },
  {
    src: "/card/labskillv2-1.png",
    desc: "Optimized data fetching using React Query for superior performance.",
    alt: "React Query Implementation Screenshot",
  },
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    };
  },
};

export default function CurrentProjectSection() {
  const [[current, direction], setCurrentState] = useState([0, 0]);
  const sectionRef = useRef(null);
  const contextRef = useRef<gsap.Context | null>(null);

  const paginate = (newDirection: number) => {
    setCurrentState([
      (current + newDirection + images.length) % images.length,
      newDirection,
    ]);
  };

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.revert();
    }

    contextRef.current = gsap.context(() => {
      const card = document.querySelector(".current-project-card");
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%", // Trigger earlier on mobile
              toggleActions: "play none none reverse",
            },
            delay: 0.3,
          }
        );
      }

      gsap.fromTo(
        ".current-header-element",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
          },
        }
      );
    }, sectionRef);

    return () => {
      contextRef.current?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full dark:bg-[#1A1A2E] bg-[#F4F4F9] min-h-screen h-fit px-6 lg:px-24 flex flex-col gap-10 py-12 md:py-28 transition-all duration-500"
      id="current-projects"
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl dark:text-yellow-300 text-yellow-600 font-extrabold tracking-tight current-header-element">
          🚧 Project In Progress
        </h1>
        <p className="mt-2 md:text-xl dark:text-gray-300 text-gray-600 max-w-3xl mx-auto current-header-element">
          Actively pushing boundaries and implementing new technologies on my
          current focus project.
        </p>
      </div>

      <div className="current-project-card flex flex-col md:flex-row w-full gap-0 transition-all duration-700 bg-white dark:bg-[#202033] rounded-3xl overflow-hidden shadow-2xl hover:shadow-2xl/80 group">
        <div className="md:w-1/3 w-full flex flex-col justify-between px-6 py-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700">
          <div>
            <span className="text-sm font-semibold text-orange-500 dark:text-orange-400">
              FEATURED PROJECT
            </span>
            <h2 className="text-4xl font-extrabold dark:text-white mt-1 mb-4 tracking-tight">
              Labskill V2
            </h2>
            <p className="dark:text-white/70 text-gray-700 text-base mb-6">
              Labskill V2 is a complete platform overhaul to enhance the
              learning experience, focusing on modern architecture, performance,
              and intuitive user interaction.
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-bold dark:text-white mb-3 flex items-center gap-2">
              <Icon icon="lucide:target" className="text-[#A78BFA]" />
              Key Development Goals
            </h3>
            <ul className="space-y-2 text-sm dark:text-gray-400 text-gray-600">
              <li className="flex items-center gap-2">
                <Icon icon="lucide:code-square" className="text-green-500" />
                Next.js App Router migration.
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="lucide:zap" className="text-yellow-500" />
                Performance optimization (React Query/Caching).
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="lucide:sparkles" className="text-[#A78BFA]" />
                Full UI/UX redesign (Modern & Minimalist).
              </li>
            </ul>
            <a
              href="#"
              className="mt-6 inline-flex items-center text-sm font-semibold dark:text-[#A78BFA] text-[#4F46E5] hover:underline"
            >
              View Development Log
              <Icon icon="lucide:arrow-right" className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="md:w-2/3 w-full relative min-h-[400px] md:min-h-[500px]">
          <div className="relative w-full h-full bg-gray-900 overflow-hidden flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={current}
                className="absolute w-full h-full"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <Image
                  src={images[current].src}
                  alt={images[current].alt}
                  priority={current === 0}
                  fill
                  style={{ objectFit: "cover" }}
                  className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.03] opacity-80" // Efek subtle hover scale
                />

                <motion.div
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 md:p-8 flex flex-col justify-end"
                  key={`desc-${current}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-xl font-bold">{images[current].desc}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs font-mono opacity-70">
                      {current + 1} / {images.length} Screenshots
                    </span>
                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full font-medium">
                      In Development
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => paginate(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white/80 p-3 rounded-full hover:bg-white/20 transition-colors duration-300 z-10 shadow-lg"
              aria-label="Previous image"
            >
              <Icon icon="lucide:chevron-left" className="h-5 w-5" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white/80 p-3 rounded-full hover:bg-white/20 transition-colors duration-300 z-10 shadow-lg"
              aria-label="Next image"
            >
              <Icon icon="lucide:chevron-right" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
