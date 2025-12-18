"use client";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react/dist/iconify.js";
import useMobile from "@/hooks/useMobile";
import { trpc } from "@/utils/trpc";

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

export default function CompletedProjectsSection() {
  const { data: projects } = trpc.project.getAll.useQuery();
  const mobile = useMobile();
  const sectionRef = useRef(null);
  const contextRef = useRef<gsap.Context | null>(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.revert();
    }

    if (!projects || projects.length === 0) return;

    contextRef.current = gsap.context(() => {
      const cards = document.querySelectorAll<HTMLElement>(".project-card");

      cards.forEach((card) => {
        const image = card.querySelector(".project-image-wrapper");
        const content = card.querySelector(".project-content-wrapper");

        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        if (image) {
          gsap.fromTo(
            image,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
              delay: 0.2,
            }
          );
        }

       if (content && content.children.length > 0) {
          gsap.fromTo(
            content.children,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.1,
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
              delay: 0.4,
            }
          );
        }
      });
    }, sectionRef); 

    return () => {
      contextRef.current?.revert();
    };
  }, [mobile, projects]);

  const completedProjects = projects?.filter(
    (project) => project.status === "COMPLETED"
  ) as Project[] | undefined;

  return (
    <section
      ref={sectionRef}
      className="relative w-full dark:bg-[#1A1A2E] bg-[#F4F4F9] min-h-screen h-fit px-6 lg:px-24 flex flex-col gap-10 py-12 md:py-28 transition-all duration-500"
      id="completed-projects"
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl text-yellow-600 dark:text-yellow-300 font-extrabold tracking-tight">
          🚀 My Completed Projects
        </h1>
        <p className="mt-2 md:text-xl dark:text-gray-300 text-gray-600 max-w-3xl mx-auto">
          Showcasing a selection of challenging projects where design meets
          cutting-edge technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-x-16 lg:gap-y-20 justify-center w-full mt-6">
        {completedProjects?.map((project, index) => {
          const isOdd = index % 2 !== 0;

          return (
            <Card
              key={project.id}
              className={cn(
                "w-full p-4 relative overflow-hidden bg-white dark:bg-[#202033] shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl group project-card",
                isOdd ? "md:col-start-2" : "md:col-start-1"
              )}
            >
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-yellow-600 dark:group-hover:border-yellow-300 transition-all duration-500 pointer-events-none"></div>

              <div
                className={cn(
                  "flex flex-col gap-6 md:gap-8",
                  isOdd ? "md:flex-col-reverse" : "md:flex-col"
                )}
              >
                <div className="project-image-wrapper relative w-full h-auto aspect-video rounded-xl overflow-hidden shadow-lg">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    style={{
                      backgroundImage: `url(${project.imageUrl})`,
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <span className="absolute top-2 right-2 text-xs font-semibold py-1 px-3 rounded-full bg-black/60 text-white backdrop-blur-sm">
                    0{index + 1}
                  </span>
                </div>

                <CardContent className="project-content-wrapper flex flex-col gap-4 p-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold dark:text-white text-gray-900 group-hover:text-yellow-600 dark:group-hover:text-yellow-300 transition-colors duration-300">
                        {project.title}
                      </h2>
                      <p className="text-sm md:text-base dark:text-gray-400 text-gray-600 mt-1">
                        {project.short_description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-2xl shrink-0 dark:text-gray-300 text-gray-700">
                      {project.languages.slice(0, 3).map((lang, langIndex) => (
                        <Icon
                          icon={lang.icon}
                          key={langIndex}
                          className="hover:scale-110 transition-transform duration-200"
                        />
                      ))}
                      {project.languages.length > 3 && (
                        <span className="text-xs">
                          +{project.languages.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row gap-4 mt-2">
                    {project.site === "restricted" ? (
                      <div className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium rounded-lg text-white bg-gray-500 cursor-not-allowed">
                        <Icon icon="lucide:lock" className="mr-2" />
                        {project.restricted_reason}
                      </div>
                    ) : (
                      <Link
                        target="_blank"
                        href={project.site ?? "#"}
                        passHref
                        className="group/btn relative inline-flex items-center justify-center h-10 px-4 text-sm font-medium rounded-lg overflow-hidden transition-all duration-300 text-yellow-600 dark:text-yellow-300 border-2 border-yellow-600 dark:border-yellow-300 hover:text-white dark:hover:text-white"
                      >
                        <span className="relative z-10">
                          <Icon
                            icon="lucide:external-link"
                            className="inline mr-2"
                          />
                          Visit Site
                        </span>
                        <span className="absolute inset-0 bg-yellow-600 dark:bg-yellow-300 transform -translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-0"></span>
                      </Link>
                    )}

                    <Link
                      href={project.id}
                      passHref
                      className="group/btn relative inline-flex items-center justify-center h-10 px-4 text-sm font-medium rounded-lg overflow-hidden transition-all duration-300 text-white bg-gray-700 dark:bg-gray-700 hover:bg-gray-600"
                    >
                      <span className="relative z-10">
                        <Icon icon="lucide:info" className="inline mr-2" />
                        Detail
                      </span>
                      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                    </Link>
                  </div>
                </CardContent>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
