"use client";

import { Icon } from "@iconify/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const indexLinks = [
  {
    id: "completed-projects",
    title: "Completed Projects",
    description: "View the projects I have successfully completed.",
    icon: "lucide:check-circle",
  },
  {
    id: "current-projects",
    title: "Current Projects",
    description: "Explore the projects I am actively working on.",
    icon: "lucide:layers-3",
  },
  {
    id: "other-projects",
    title: "Pending Projects",
    description: "Check out the projects in the pipeline.",
    icon: "lucide:clock",
  },
];

const projectStats = [
  { label: "In Progress", count: 1, color: "text-blue-400" },
  { label: "Pending", count: 4, color: "text-orange-400" },
  { label: "Totally Complete", count: 4, color: "text-green-400" },
  { label: "Total Projects", count: 9, color: "text-purple-400" },
];

export default function IndexSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const introRefs = useRef<HTMLDivElement[]>([]);
  const linkRefs = useRef<HTMLDivElement[]>([]);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Intro animation
      gsap.from(introRefs.current, {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
      });

      // Index links animation
      gsap.fromTo(
        linkRefs.current,
        {
          x: 50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="index"
      className="w-full min-h-screen dark:bg-[#1A1A2E] bg-[#F4F4F9] flex flex-col gap-12 py-16 px-6 lg:px-24 items-center justify-center transition-all duration-500"
    >
      {/* Title */}
      <div
        ref={(el) => {
          if (el) introRefs.current[0] = el;
        }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl dark:text-yellow-300 text-yellow-600 font-extrabold tracking-tight">
          Project Index
        </h1>
        <p className="mt-2 md:text-xl dark:text-gray-300 text-gray-600 max-w-3xl mx-auto">
          A quick overview of my portfolio, categorized by status.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start w-full max-w-6xl">
        {/* Left */}
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <div
            ref={(el) => {
              if (el) introRefs.current[1] = el;
            }}
          >
            <h2 className="text-2xl md:text-3xl dark:text-white font-bold tracking-tight">
              Explore My Technical Journey
            </h2>
            <p className="md:text-lg dark:text-gray-400 mt-4 text-justify">
              This portfolio organizes my work into three key stages:{" "}
              <span className="text-yellow-600 dark:text-yellow-300 font-medium">
                Current
              </span>{" "}
              (actively developing),
              <span className="text-yellow-600 dark:text-yellow-300 font-medium">
                {" "}
                Pending
              </span>{" "}
              (in the pipeline), and{" "}
              <span className="text-yellow-600 dark:text-yellow-300 font-medium">
                {" "}
                Completed
              </span>{" "}
              (finished accomplishments).
            </p>
          </div>

          <div
            ref={(el) => {
              if (el) introRefs.current[2] = el;
            }}
            className="grid grid-cols-2 gap-4 mt-2"
          >
            {projectStats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-white dark:bg-[#202033] shadow-lg border border-gray-200 dark:border-gray-700 transition duration-300 hover:shadow-xl hover:scale-[1.02]"
              >
                <h3
                  className={`text-sm md:text-base font-medium ${stat.color}`}
                >
                  {stat.label}
                </h3>
                <p className="dark:text-white text-3xl md:text-4xl font-extrabold mt-1">
                  {stat.count}
                </p>
                <p className="text-xs dark:text-gray-400">Projects</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right (Index Links) */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          {indexLinks.map((link, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) linkRefs.current[index] = el;
              }}
              onClick={() => handleScroll(link.id)}
              className="dark:text-white p-4 md:p-6 rounded-xl cursor-pointer bg-white dark:bg-[#202033] shadow-lg transition-all duration-300 border-l-4 border-transparent hover:border-[#A78BFA] hover:shadow-xl hover:scale-[1.02] flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <Icon
                  icon={link.icon}
                  className="text-5xl md:text-6xl text-yellow-600 dark:text-yellow-300"
                />
                <div>
                  <h3 className="text-lg md:text-xl font-bold">{link.title}</h3>
                  <p className="text-xs md:text-sm dark:text-gray-400">
                    {link.description}
                  </p>
                </div>
              </div>

              <Icon
                icon="lucide:arrow-right"
                className="text-3xl text-gray-500 dark:text-gray-400"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
