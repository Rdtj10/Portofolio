"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/utils/cn";
import Image from "next/image";
import ProjectsDialog from "../../components/ProjectsDialog";
import { trpc } from "@/utils/trpc";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const BackgroundAtmosphere = () => (
  <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
    <div className="absolute top-[10%] right-[-10%] w-[50rem] h-[50rem] bg-accent/5 blur-[130px] rounded-full animate-pulse" />
    <div className="absolute bottom-[20%] left-[-10%] w-[40rem] h-[40rem] bg-secondary/5 blur-[110px] rounded-full animate-float [animation-delay:3s]" />

    {/* Floating Petals/Seeds */}
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-accent/20 rounded-full"
        initial={{ y: "-10%", x: `${Math.random() * 100}%`, rotate: 0 }}
        animate={{
          y: "110%",
          x: `${Math.random() * 100 + (i % 2 === 0 ? 30 : -30)}%`,
          rotate: 360,
        }}
        transition={{
          duration: 12 + Math.random() * 15,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 12,
        }}
      />
    ))}
  </div>
);

export default function PendingProjectSection() {
  const [mounted, setMounted] = useState(false);
  const { data: projects } = trpc.project.getAll.useQuery();
  const sectionRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [isDialogAbsenOpen, setIsDialogAbsenOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [itemSelected, setItemSelected] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpenDialogAbsen = (item: any) => {
    setItemSelected(item);
    setIsDialogAbsenOpen(true);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!projects || projects.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(".pending-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-40 px-6 lg:px-24 flex flex-col gap-24 overflow-hidden bg-background"
      id="other-projects"
    >
      {mounted && <BackgroundAtmosphere />}

      <div className="pending-reveal flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="h-[2px] w-12 bg-accent/30" />
          <h2 className="text-sm font-black uppercase tracking-[0.5em] text-accent">
            Future Seeds
          </h2>
          <div className="h-[2px] w-12 bg-accent/30" />
        </div>
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter font-serif leading-none">
          The <span className="ghibli-text-gradient">Daydreams</span>
        </h1>
        <p className="text-xl md:text-2xl text-foreground/60 font-medium italic max-w-2xl">
          &quot;A glimpse into planned innovations and experimental prototypes,
          currently nurturing in the quiet gardens of imagination.&quot;
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 w-full max-w-7xl mx-auto">
        {projects
          ?.filter((project) => project.status !== "COMPLETED")
          .map((project, index) => (
            <div key={index} className="pending-reveal">
              <motion.div
                whileHover={{ y: -15, rotate: index % 2 === 0 ? 1 : -1 }}
                onClick={() => handleOpenDialogAbsen(project)}
                className="paper-card p-10 flex flex-col gap-10 cursor-pointer group transition-all duration-700 bg-white/40 backdrop-blur-md shadow-xl border-accent/10 relative overflow-hidden h-full"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Icon icon="lucide:test-tube-2" className="text-5xl" />
                </div>

                <div className="relative aspect-square sketch-border overflow-hidden bg-white/60 p-8 flex items-center justify-center shadow-inner">
                  <Image
                    alt={project.title}
                    src={project.imageUrl || "/logo/rdtj.png"}
                    width={200}
                    height={200}
                    className="object-contain transition-transform duration-[2s] group-hover:scale-125 opacity-70 group-hover:opacity-100 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/20 italic font-serif">
                    Exp. #{index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <span
                      className={cn(
                        "text-[9px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border border-dashed",
                        project.ownStatus === "Company"
                          ? "border-accent/40 text-accent bg-accent/5"
                          : "border-primary/40 text-primary bg-primary/5"
                      )}
                    >
                      {project.ownStatus}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_oklch(var(--accent-params))]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-accent">
                        Incubating
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-3xl font-black tracking-tight group-hover:text-accent transition-colors font-serif leading-tight">
                      {project.title}
                    </h3>
                    <div className="h-[1px] w-12 bg-accent/20 group-hover:w-full transition-all duration-700" />
                  </div>

                  <p className="text-base text-foreground/50 font-medium font-serif line-clamp-2 italic leading-relaxed">
                    &quot;{project.short_description}&quot;
                  </p>
                </div>

                <div className="mt-auto pt-8 flex items-center justify-between border-t border-dashed border-border/30">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/10 italic">
                    Awaiting Bloom
                  </span>
                  <div className="w-10 h-10 flex items-center justify-center bg-accent/5 rounded-full group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
                    <Icon icon="lucide:sparkles" className="text-xl" />
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
      </div>

      {/* Decorative Blueprint Mark */}
      <div className="pending-reveal mt-20 flex flex-col items-center gap-6 opacity-20">
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-accent to-transparent" />
        <Icon
          icon="lucide:drafting-compass"
          className="text-5xl text-accent animate-spin-slow"
        />
        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-accent">
          Imagination in progress
        </span>
      </div>

      {itemSelected && (
        <ProjectsDialog
          open={isDialogAbsenOpen}
          onClose={setIsDialogAbsenOpen}
          project={itemSelected}
        />
      )}
    </section>
  );
}
