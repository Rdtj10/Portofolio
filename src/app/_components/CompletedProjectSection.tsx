"use client";

// import { cn } from "@/utils/cn";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react/dist/iconify.js";
import { trpc } from "@/utils/trpc";
import { motion } from "framer-motion";

interface Project {
  id: string;
  title: string;
  short_description: string;
  imageUrl: string;
  site: string;
  restricted_reason: string;
  status: "COMPLETED" | "IN_PROGRESS";
  languages: { icon: string; name: string }[];
}

const BackgroundAtmosphere = () => (
  <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
    <div className="absolute top-[30%] left-[-5%] w-[40rem] h-[40rem] bg-secondary/5 blur-[120px] rounded-full animate-pulse" />
    <div className="absolute bottom-[10%] right-[-5%] w-[35rem] h-[35rem] bg-primary/5 blur-[100px] rounded-full animate-float" />

    {/* Decorative Dust/Spirits */}
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-secondary/30 rounded-full"
        initial={{ y: "110%", x: `${Math.random() * 100}%` }}
        animate={{
          y: "-10%",
          x: `${Math.random() * 100 + (i % 2 === 0 ? 20 : -20)}%`,
        }}
        transition={{
          duration: 20 + Math.random() * 20,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 10,
        }}
      />
    ))}
  </div>
);

export default function CompletedProjectsSection() {
  const [mounted, setMounted] = useState(false);
  const { data: projects } = trpc.project.getAll.useQuery();
  const sectionRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!projects || projects.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(".completed-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  const completedProjects = projects?.filter(
    (project) => project.status === "COMPLETED"
  ) as Project[] | undefined;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-40 px-6 lg:px-24 flex flex-col gap-24 overflow-hidden bg-background"
      id="completed-projects"
    >
      {mounted && <BackgroundAtmosphere />}

      <div className="completed-reveal flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="h-[2px] w-12 bg-secondary/30" />
          <h2 className="text-sm font-black uppercase tracking-[0.5em] text-secondary">
            Legacy Works
          </h2>
          <div className="h-[2px] w-12 bg-secondary/30" />
        </div>
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter font-serif leading-none">
          The <span className="ghibli-text-gradient">Archives</span>
        </h1>
        <p className="text-xl md:text-2xl text-foreground/60 font-medium italic max-w-2xl">
          &quot;A curated collection of completed journeys, where architecture
          meets endurance and vision became reality.&quot;
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 w-full max-w-7xl mx-auto">
        {completedProjects?.map((project, index) => (
          <div key={project.id} className="completed-reveal group">
            <motion.div whileHover={{ y: -15 }} className="h-full">
              <div className="paper-card flex flex-col h-full overflow-hidden bg-card/40 backdrop-blur-md transition-all duration-700 shadow-xl border-secondary/10">
                {/* Image Section */}
                <div className="relative aspect-video overflow-hidden border-b border-border/50 group-hover:sketch-border transition-all duration-700">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-110"
                    style={{ backgroundImage: `url(${project.imageUrl})` }}
                  />
                  <div className="absolute inset-0 bg-ghibli-oak/20 group-hover:bg-transparent transition-all duration-700 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />

                  <div className="absolute top-6 right-6 flex gap-3">
                    {project.languages.slice(0, 3).map((lang, lIdx) => (
                      <div
                        key={lIdx}
                        className="p-3 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 shadow-lg group-hover:scale-110 transition-transform"
                        title={lang.name}
                      >
                        <Icon
                          icon={lang.icon}
                          className="text-2xl text-primary"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-12 md:p-14 flex flex-col gap-8 flex-grow">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-2">
                      <p className="text-[10px] text-primary font-black uppercase tracking-[0.4em] italic">
                        Volume {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </p>
                      <h3 className="text-4xl md:text-5xl font-black tracking-tight font-serif group-hover:text-primary transition-colors leading-tight">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <p className="text-foreground/70 leading-relaxed font-serif text-xl line-clamp-3 italic">
                      &quot;{project.short_description}&quot;
                    </p>
                    <div className="h-[2px] w-20 bg-secondary/20 group-hover:w-full transition-all duration-700" />
                  </div>

                  <div className="flex gap-6 mt-auto pt-8">
                    {project.site === "restricted" ? (
                      <div className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-muted/50 text-muted-foreground text-xs font-black uppercase tracking-[0.3em] cursor-not-allowed border border-border/50">
                        <Icon icon="lucide:lock" className="text-xl" />
                        Sanctuary
                      </div>
                    ) : (
                      <Link
                        href={project.site ?? "#"}
                        target="_blank"
                        className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-primary text-primary-foreground text-xs font-black uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-[8px_8px_0px_0px_oklch(var(--ghibli-oak-params)/0.1)] hover:shadow-none"
                      >
                        <Icon icon="lucide:map-pin" className="text-xl" />
                        Visit Site
                      </Link>
                    )}
                    <Link
                      href={`/projects/${project.id}`}
                      className="flex items-center gap-3 px-10 py-4 rounded-2xl border-2 border-primary/20 text-primary font-black uppercase tracking-[0.3em] hover:bg-primary/5 text-xs transition-all hover:border-primary/40"
                    >
                      Read Journal
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Decorative Footer Element */}
      <div className="completed-reveal mt-20 flex flex-col items-center gap-4 opacity-30">
        <Icon
          icon="lucide:scroll"
          className="text-6xl text-secondary animate-float"
        />
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-secondary">
          End of Archives
        </span>
      </div>
    </section>
  );
}
