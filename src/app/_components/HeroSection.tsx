"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const FallingLeaves = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-5 h-7 opacity-20"
        initial={{ y: -50, x: `${Math.random() * 100}%`, rotate: 0 }}
        animate={{
          y: "110vh",
          x: `${Math.random() * 100 + (i % 2 === 0 ? 60 : -60)}%`,
          rotate: 720,
        }}
        transition={{
          duration: 12 + Math.random() * 18,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 15,
        }}
      >
        <div
          className="w-full h-full bg-primary/30 rounded-full"
          style={{ borderRadius: "60% 40% 70% 30% / 50% 50% 50% 50%" }}
        />
      </motion.div>
    ))}
  </div>
);

const FloatingParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full opacity-40 blur-[1px]"
        initial={{
          y: `${Math.random() * 100}%`,
          x: `${Math.random() * 100}%`,
          opacity: 0,
        }}
        animate={{
          y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
          x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: 10 + Math.random() * 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ))}
  </div>
);

export default function HeroSection() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      className="relative flex flex-col items-center justify-center w-full min-h-screen pt-40 pb-32 px-6 lg:px-24 overflow-hidden bg-background"
      id="hero"
    >
      <FallingLeaves />
      <FloatingParticles />

      {/* Atmospheric Background Decor */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[5%] left-[10%] w-[60rem] h-[60rem] bg-secondary/10 blur-[150px] rounded-full animate-float opacity-60" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50rem] h-[50rem] bg-primary/10 blur-[120px] rounded-full animate-float [animation-delay:4s] opacity-60" />
        <div className="absolute top-[20%] right-[10%] w-[15rem] h-[15rem] bg-accent/5 blur-[80px] rounded-full animate-pulse" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl gap-24 lg:gap-32 z-10"
      >
        {/* Left Side: Content */}
        <div className="flex flex-col gap-14 w-full lg:w-3/5 text-center lg:text-left">
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <div className="h-[2px] w-16 bg-primary/30" />
              <span className="text-primary font-black uppercase tracking-[0.6em] text-xs">
                A Digital Craftsman
              </span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85]">
              <span className="block italic text-foreground/20 font-serif text-3xl md:text-5xl mb-4">
                In the quiet meadow of code,
              </span>
              <span className="ghibli-text-gradient inline-block pb-4">
                Ridho Dimas
              </span>
            </h1>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative flex flex-col gap-8"
          >
            <div className="absolute -left-10 top-0 bottom-0 w-2 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent hidden lg:block" />
            <div className="flex flex-col gap-4 pl-0 lg:pl-12">
              <p className="text-2xl md:text-4xl text-foreground/70 font-medium leading-tight font-serif italic text-justify">
                &quot;Weaving digital tapestry with the{" "}
                <span className="text-primary font-bold">
                  patience of a gardener
                </span>{" "}
                and the precision of an architect.&quot;
              </p>
              <div className="flex flex-col gap-6 max-w-xl">
                <p className="text-lg md:text-xl text-foreground/50 font-medium leading-relaxed">
                  Quietly architecting resilient ecosystems in the cloud. My
                  work is a bridge between the complexity of modern engineering
                  and the simple serenity of nature-inspired design.
                </p>

                {/* Current Log / Focus */}
                <div className="paper-card p-8 bg-white/40 backdrop-blur-md border border-primary/10 flex flex-col gap-4 shadow-sm group">
                  <div className="flex items-center gap-3">
                    <Icon
                      icon="lucide:pencil-line"
                      className="text-primary text-xl"
                    />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">
                      Current Expedition Log
                    </span>
                  </div>
                  <p className="text-base text-foreground/70 font-serif italic leading-relaxed">
                    &quot;Currently refining a pedagogical habitat for digital
                    alchemy (Labskill V2). Aiming for 100% architectural harmony
                    by the next solstice.&quot;
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-10 items-center justify-center lg:justify-start mt-6"
          >
            <button
              onClick={() => handleScroll("index")}
              className="px-14 py-8 bg-primary text-primary-foreground rounded-[2rem] font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-[12px_12px_0px_0px_oklch(var(--ghibli-oak)/0.15)] hover:shadow-none group flex items-center gap-6 border-b-8 border-black/10 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" />
              <span className="relative z-10">Step into the Workshop</span>
              <Icon
                icon="lucide:chevrons-right"
                className="group-hover:translate-x-2 transition-transform text-3xl relative z-10"
              />
            </button>

            <div className="flex items-center gap-8 p-6 paper-card bg-white/20 backdrop-blur-sm border-white/40">
              <Link
                href="https://www.linkedin.com/in/ridho-dimas-tj/"
                target="_blank"
                className="hover:scale-125 text-foreground/30 hover:text-secondary transition-all"
                title="LinkedIn"
              >
                <Icon icon="lucide:linkedin" className="text-4xl" />
              </Link>
              <Link
                href="https://www.github.com/Rdtj10"
                target="_blank"
                className="hover:scale-125 text-foreground/30 hover:text-ghibli-oak transition-all"
                title="GitHub"
              >
                <Icon icon="lucide:github" className="text-4xl" />
              </Link>
              <div className="w-[1px] h-10 bg-border/40 mx-2" />
              <Link
                href="https://drive.google.com/file/d/1P3AqgzEzMBH0gWYe0jLbWgje3sbUdJrp/view?usp=sharing"
                target="_blank"
                className="flex flex-col items-center gap-1 group"
              >
                <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                  <Icon icon="lucide:scroll" className="text-3xl" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-accent/60">
                  Journal
                </span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Framed Image */}
        <motion.div
          variants={itemVariants}
          className="relative w-full lg:w-2/5 aspect-[3/4] max-w-[500px]"
        >
          {/* Decorative Layers / Window Look */}
          <div className="absolute inset-[-40px] bg-primary/5 blur-3xl animate-float -z-10" />

          {/* Outer Frame (Wood-like) */}
          <div className="absolute inset-0 border-[20px] border-ghibli-oak/20 rounded-[4rem] shadow-2xl skew-y-1" />

          {/* Inner Frame (Paper/Canvas) */}
          <div className="absolute inset-4 border-[2px] border-primary/20 rounded-[3.5rem] p-4 bg-ghibli-paper/30 backdrop-blur-md shadow-inner">
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden group shadow-2xl sketch-border">
              <Image
                src="/me.png"
                alt="Ridho Dimas"
                fill
                className="object-cover object-top scale-110 group-hover:scale-105 transition-transform duration-[3s] grayscale-[0.3] group-hover:grayscale-0 contrast-[1.1]"
                priority
              />
              {/* Sunlight Glow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Whimsical Talisman / Badge */}
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-16 -left-12 paper-card p-10 flex flex-col items-center justify-center gap-2 bg-white/80 backdrop-blur-xl border-primary/20 shadow-2xl z-20"
          >
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-2 animate-pulse">
              <Icon icon="lucide:flame" className="text-accent text-5xl" />
            </div>
            <div className="flex flex-col items-center leading-none">
              <span className="text-5xl font-black text-secondary tracking-tighter">
                03+
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30 text-center mt-2">
                Great
                <br />
                Voyages
              </span>
            </div>
            {/* Hanging String Decor */}
            <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-[2px] h-10 bg-gradient-to-t from-primary/30 to-transparent" />
          </motion.div>

          {/* Floating Leaves Decor around frame */}
          <div className="absolute top-[-30px] right-[-20px] w-20 h-20 bg-primary/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-10 right-[-40px] p-6 paper-card bg-white/60 backdrop-blur-md shadow-lg rotate-12">
            <Icon
              icon="lucide:leaf"
              className="text-3xl text-secondary animate-float"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
