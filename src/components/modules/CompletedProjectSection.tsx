"use client";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react/dist/iconify.js";
import useMobile from "@/hooks/useMobile";
import { trpc } from "@/utils/trpc";

export default function CompletedProjectsSection() {
  const { data: projects } = trpc.project.getAll.useQuery();

  
  const mobile = useMobile();

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (!projects) return;
    const cards = document.querySelectorAll(".project-card");

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: mobile ? "top 30%" : "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [mobile, projects]);

  return (
    <section
      className="relative w-full dark:bg-[#22232F] bg-[#F0F0F5] min-h-screen h-fit px-6 lg:px-24 flex flex-col gap-6 py-12 md:py-28 transition-all duration-500"
      id="completed-projects"
    >
      {/* <ParticleCanvas/> */}
      <div>
        <h1 className="text-center text-3xl dark:text-yellow-300 text-yellow-600 font-semibold">
          Completed Projects
        </h1>
        <p className="text-center md:text-lg dark:text-gray-300">
          Here are some of the projects I have completed, showcasing my skills
          in web development and design.
        </p>
      </div>

      <div className="flex flex-col items-center gap-10 md:gap-20 justify-center w-full md:px-28 mt-10 md:mt-20">
        {projects?.filter((project) => project.status === "COMPLETED").map((project, index) => {
          return (
          <Card
            key={index}
            className={cn(
              "w-full md:w-7/8 h-[40vh] md:h-[60vh] relative border-none cursor-pointer group project-card"
            )}
            style={{
              backgroundImage: `url(${project.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/80 transition-colors duration-300 rounded-xl"></div>
            <h1 className="absolute -top-6 left-0 text-9xl font-extrabold dark:text-white text-yellow-600 transition-all duration-300 group-hover:-translate-y-10 opacity-0 group-hover:opacity-100">
              0{index + 1}
            </h1>
            <h1 className="absolute top-0 right-0 flex items-center gap-2 w-fit text-white shrink-0 mt-4 mr-4 transition-all duration-300 opacity-0 group-hover:opacity-100 font-semibold text-xl">
              Build with : {project.languages.map((lang, index) => (
                <Icon icon={lang.icon} key={index} />
              ))}
            </h1>
            <CardContent className="relative z-10 flex flex-col justify-center h-full md:ml-24 gap-8 md:gap-6">
              <div>
                <h1 className="text-4xl md:text-7xl font-bold text-white group-hover:dark:text-yellow-300 group-hover:text-yellow-600">
                  {project.title}
                </h1>
                <p className="text-sm md:text-lg text-white">
                  {project.short_description}
                </p>
              </div>

              <div className="relative flex flex-row gap-4">
                {project.site === "restricted" ? (
                  <div className="relative w-fit rounded-2xl -translate-y-6 lg:translate-y-0 text-white ">
                    <span className="relative transform -translate-x-1/2 z-40 bg-gray-500 text-sm lg:text-base lg:px-2 px-1 lg:py-1">
                      {project.restricted_reason}
                    </span>
                  </div>
                ) : (
                  <Link target="_blank" href={project.site ?? "#"} passHref>
                    <div className="relative group/sub duration-300 transition-colors w-fit cursor-pointer rounded-2xl -translate-y-6 lg:translate-y-0 text-white hover:text-yellow-300">
                      <span className="relative transform -translate-x-1/2 z-40 bg-red-500 group-hover/sub:bg-transparent transition-all duration-300 text-sm lg:text-base lg:px-2 px-1 lg:py-1">
                        Go to site
                      </span>
                      <span className="absolute left-0 bottom-0 h-full w-full bg-[#D9B08C] -scale-y-0 group-hover/sub:scale-y-100 transition-transform duration-300 ease-in-out origin-left z-10"></span>
                      <span className="absolute left-0 bottom-0 h-full w-full bg-[#D9B08C] -scale-y-0 group-hover/sub:scale-y-100 transition-transform duration-500 ease-in-out origin-left z-10"></span>
                      <span className="absolute left-0 bottom-0 h-full w-full bg-[#2E4052] -scale-y-0 group-hover/sub:scale-y-100 transition-transform duration-700 ease-in-out origin-left z-10"></span>
                    </div>
                  </Link>
                )}

                {/* <Link target="_blank" href={`/${slug}`} passHref>
                    <div className="relative group/sub duration-300 transition-colors w-fit cursor-pointer rounded-2xl -translate-y-6 lg:translate-y-0 text-white hover:text-yellow-300">
                      <span className="relative transform -translate-x-1/2 z-40 bg-green-400 group-hover/sub:bg-transparent transition-all duration-300 text-sm lg:text-base lg:px-2 px-1 lg:py-1">
                        Detail
                      </span>
                      <span className="absolute left-0 bottom-0 h-full w-full bg-[#D9B08C] -scale-y-0 group-hover/sub:scale-y-100 transition-transform duration-300 ease-in-out origin-left z-10"></span>
                      <span className="absolute left-0 bottom-0 h-full w-full bg-[#D9B08C] -scale-y-0 group-hover/sub:scale-y-100 transition-transform duration-500 ease-in-out origin-left z-10"></span>
                      <span className="absolute left-0 bottom-0 h-full w-full bg-[#2E4052] -scale-y-0 group-hover/sub:scale-y-100 transition-transform duration-700 ease-in-out origin-left z-10"></span>
                    </div>
                  </Link> */}
              </div>
            </CardContent>
          </Card>
        )})}
      </div>
    </section>
  );
}
