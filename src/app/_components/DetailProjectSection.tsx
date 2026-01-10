"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { Button } from "../../components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import ExoticLoading from "../../components/ExoticLoading";
import { motion, AnimatePresence } from "framer-motion";

const DetailProjectSection = () => {
  const [minLoading, setMinLoading] = useState(true);
  const { id } = useParams();
  const { data: project, isLoading: loadProject } =
    trpc.project.getById.useQuery(id as string);
  const { data: allProjects, isLoading: loadAll } =
    trpc.project.getAll.useQuery();
  const projectIds =
    allProjects
      ?.filter((p) => p.status === "COMPLETED")
      .map((p: { id: string }) => p.id) || [];
  const currentIndex = projectIds.indexOf(id as string);
  const prevId = currentIndex > 0 ? projectIds[currentIndex - 1] : null;
  const nextId =
    currentIndex < projectIds.length - 1 ? projectIds[currentIndex + 1] : null;

  useEffect(() => {
    setMinLoading(true);
    const timer = setTimeout(() => {
      setMinLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [id]);

  const actuallyLoading = loadProject || loadAll || !project || !allProjects;
  const isTransitioning = actuallyLoading || minLoading;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <>
      <ExoticLoading loading={isTransitioning} />
      <AnimatePresence>
        {!isTransitioning && project && (
          <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col min-h-screen w-full relative overflow-hidden"
          >
            {/* Background Atmosphere */}
            <div className="fixed inset-0 pointer-events-none z-[-1]">
              <div className="absolute inset-0 bg-background mix-blend-multiply opacity-50" />
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ghibli-sky/20 blur-[100px] rounded-full mix-blend-screen animate-float" />
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-ghibli-meadow/20 blur-[120px] rounded-full mix-blend-screen animate-float" style={{ animationDelay: "-3s" }} />
              {/* Floating Particles */}
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-current opacity-30 rounded-full animate-float"
                  style={{
                    width: Math.random() * 10 + 5 + "px",
                    height: Math.random() * 10 + 5 + "px",
                    left: Math.random() * 100 + "%",
                    top: Math.random() * 100 + "%",
                    color: i % 2 === 0 ? "var(--color-ghibli-sky)" : "var(--color-ghibli-meadow)",
                    animationDuration: Math.random() * 5 + 5 + "s",
                    animationDelay: Math.random() * 5 + "s",
                  }}
                />
              ))}
            </div>

            {/* Back Button */}
            <motion.div 
              variants={itemVariants}
              className="absolute top-6 left-6 z-50"
            >
              <Link href="/">
                <Button variant="ghost" className="soft-glass rounded-full hover:bg-white/50 text-foreground group">
                  <Icon icon="solar:arrow-left-linear" className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  Back to World
                </Button>
              </Link>
            </motion.div>

            {/* Hero Section */}
            <div className="w-full min-h-[40vh] lg:min-h-[50vh] relative flex items-center justify-center p-8 pt-24">
              <div className="absolute inset-0 z-0">
                 {/* Sketchy Image Border container */}
                <div className="w-full h-full relative overflow-hidden watercolor-mask opacity-60">
                   <Image
                    src={project.imageUrl || "/images/hero-bg.png"}
                    alt={project.title}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
              </div>

              <motion.div 
                variants={itemVariants} 
                className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-4xl"
              >
                 <div className="px-6 py-2 rounded-full border border-ghibli-oak/20 bg-white/40 backdrop-blur-sm text-sm font-serif italic text-ghibli-oak">
                    {project.status}
                 </div>
                <h1 className="text-6xl md:text-8xl font-serif font-bold text-foreground drop-shadow-sm ghibli-text-gradient">
                  {project.title}
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-sans max-w-2xl leading-relaxed">
                  {project.short_description}
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <div className="paper-card px-6 py-3 flex items-center gap-2">
                    <Icon icon="solar:user-id-bold" className="text-ghibli-oak" />
                    <span className="font-bold text-ghibli-oak">{project.role.name}</span>
                  </div>
                   <div className="paper-card px-6 py-3 flex items-center gap-2">
                    <Icon icon="solar:calendar-bold" className="text-ghibli-oak" />
                    <span className="font-bold text-ghibli-oak">{project.period}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 pb-20 max-w-6xl relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* Main Content - Left Column */}
                <motion.div variants={itemVariants} className="md:col-span-8 flex flex-col gap-8">
                  {/* Description Card */}
                  <div className="paper-card p-8 md:p-12 relative overflow-hidden group">
                     <div className="absolute -right-10 -top-10 w-40 h-40 bg-ghibli-meadow/10 rounded-full blur-3xl group-hover:bg-ghibli-meadow/20 transition-colors" />
                    <h2 className="text-3xl font-serif font-bold mb-6 flex items-center gap-3 text-ghibli-oak">
                      <Icon icon="solar:notebook-bookmark-bold-duotone" />
                      The Story
                    </h2>
                    <p className="text-lg leading-loose text-justify text-muted-foreground whitespace-pre-wrap font-sans">
                      {project.description}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                       <Button
                        asChild
                        disabled={project.site === "restricted"}
                        size="lg"
                        className={`rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 ${
                          project.site === "restricted"
                            ? "bg-muted text-muted-foreground"
                            : "bg-gradient-to-r from-ghibli-sky to-ghibli-meadow text-white hover:scale-105"
                        }`}
                      >
                        <a
                          href={project?.site === "restricted" ? undefined : project?.site ?? "/"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                           {project.site === "restricted" ? (
                             <>
                               <Icon icon="solar:lock-keyhole-bold" />
                               {project.restricted_reason || "Access Restricted"}
                             </>
                           ) : (
                             <>
                              <Icon icon="solar:globus-bold" />
                              View Live Site
                             </>
                           )}
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="soft-glass rounded-3xl p-8 border-ghibli-oak/10">
                    <h3 className="text-2xl font-serif font-bold mb-6 text-ghibli-oak">Crafted With</h3>
                    <div className="flex flex-wrap gap-4">
                      {project.languages.map((tech, i) => (
                        <TooltipProvider key={i}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="bg-white/50 hover:bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-crosshair border border-ghibli-oak/5 flex items-center justify-center group">
                                <Icon icon={tech.icon} width="32" height="32" className="text-muted-foreground group-hover:text-ghibli-oak transition-colors" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-bold">{tech.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Sidebar - Right Column */}
                <motion.div variants={itemVariants} className="md:col-span-4 flex flex-col gap-6">
                   {/* Role Summary */}
                   <div className="paper-card p-6 bg-secondary/5 border-secondary/20">
                      <h3 className="text-xl font-serif font-bold mb-4 text-ghibli-oak flex items-center gap-2">
                        <Icon icon="solar:user-hand-up-bold" />
                        Role & Contributions
                      </h3>
                      <div className="bg-white/40 rounded-xl p-4 mb-4">
                        <span className="text-sm uppercase tracking-wider text-muted-foreground">Title</span>
                        <p className="font-bold text-lg text-foreground">{project.role.name}</p>
                      </div>
                      <p className="text-muted-foreground leading-relaxed italic border-l-4 border-ghibli-sky/30 pl-4 py-1">
                        &quot;{project.task}&quot;
                      </p>
                      
                       <div className="mt-6 relative h-32 w-full rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 sketch-border border-2 border-white/50">
                        <Image
                          src={project.company_logo || "/logo/rdtj.png"}
                          alt={project.company_name || ""}
                          fill
                          className="object-cover opacity-80"
                        />
                      </div>
                   </div>

                   {/* Color Palette */}
                   <div className="soft-glass rounded-[2rem] p-6">
                      <h3 className="text-xl font-serif font-bold mb-4 ml-2 text-ghibli-oak">Palette</h3>
                      <div className="space-y-3">
                         {project.colors.map((color, idx) => (
                           <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                              <div 
                                className="w-12 h-12 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300 border-2 border-white/50" 
                                style={{ backgroundColor: color.hex }}
                              />
                              <div>
                                <p className="font-bold text-sm text-foreground">{color.name}</p>
                                <p className="text-xs text-muted-foreground font-mono">{color.hex}</p>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </motion.div>

              </div>
            </div>

            {/* Navigation Footer */}
            <motion.div 
              variants={itemVariants}
              className="sticky bottom-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t border-ghibli-oak/10 py-4 px-6 md:px-24 flex justify-between items-center z-40 lg:relative lg:bg-transparent lg:border-none lg:backdrop-filter-none"
            >
               <Link
                href={prevId ? `/${prevId}` : "#"}
                className={`flex items-center gap-3 transition-all ${
                  prevId
                    ? "opacity-100 hover:-translate-x-2 text-foreground"
                    : "opacity-30 pointer-events-none"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-ghibli-oak">
                  <Icon icon="solar:arrow-left-linear" width="24" />
                </div>
                <div className="hidden md:block text-left">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Previous</span>
                  <p className="font-bold font-serif truncate max-w-[150px]">
                    {prevId ? allProjects?.find(p => p.id === prevId)?.title : ""}
                  </p>
                </div>
              </Link>
              
              <Link href="/" className="md:hidden">
                 <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/30">
                    <Icon icon="solar:home-bold" width="24" />
                 </div>
              </Link>

              <Link
                href={nextId ? `/${nextId}` : "#"}
                className={`flex items-center gap-3 transition-all ${
                  nextId
                    ? "opacity-100 hover:translate-x-2 text-foreground"
                    : "opacity-30 pointer-events-none"
                }`}
              >
                <div className="hidden md:block text-right">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Next</span>
                   <p className="font-bold font-serif truncate max-w-[150px]">
                    {nextId ? allProjects?.find(p => p.id === nextId)?.title : ""}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-ghibli-oak">
                  <Icon icon="solar:arrow-right-linear" width="24" />
                </div>
              </Link>
            </motion.div>

          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default DetailProjectSection;

// import Link from "next/link";
// // ...other imports

// const DetailProjectSection = () => {
//   const mobile = useMobile();
//   const { id } = useParams();
//   const { data: project } = trpc.project.getById.useQuery(id as string);
//   const { data: allProjects } = trpc.project.getAllIds.useQuery(); // You need to implement this in your backend

//   // Find current, previous, and next project IDs
//   const projectIds = allProjects?.map((p: { id: string }) => p.id) || [];
//   const currentIndex = projectIds.indexOf(id as string);
//   const prevId = currentIndex > 0 ? projectIds[currentIndex - 1] : null;
//   const nextId = currentIndex < projectIds.length - 1 ? projectIds[currentIndex + 1] : null;

//   // ...rest of your code

//   return (
//     <section>
//       {/* ...your existing code... */}

//       {/* Navigation Buttons */}
//       <div className="flex justify-between items-center w-full px-10 py-6">
//         <Button asChild disabled={!prevId}>
//           <Link href={prevId ? `/projects/${prevId}` : "#"} tabIndex={prevId ? 0 : -1}>
//             Previous Project
//           </Link>
//         </Button>
//         <Button asChild disabled={!nextId}></Button>
//           <Link href={nextId ? `/projects/${nextId}` : "#"} tabIndex={nextId ? 0 : -1}>
//             Next Project
//           </Link>
//         </Button>
//       </div>

//       {/* ...rest of your code... */}
//     </section>
//   );
// };
