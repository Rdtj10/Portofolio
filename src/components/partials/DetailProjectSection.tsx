"use client";

import { useParams } from "next/navigation";
import { trpc } from "@/utils/trpc";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import useMobile from "@/hooks/useMobile";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const DetailProjectSection = () => {
  const mobile = useMobile();
  const { id } = useParams();
  const { data: project } = trpc.project.getById.useQuery(id as string);
  return (
    <section className="flex flex-col min-h-screen h-fit w-full dark:bg-[#22232F] bg-[#F0F0F5]">
      <div
        className="relative flex flex-col bg-black bg-cover bg-center bg-no-repeat w-full h-screen lg:h-[85vh] items-center justify-center"
        style={{
          backgroundImage: `url('${
            project?.imageUrl || "/images/hero-bg.png"
          }')`,
        }}
      >
        <div className="absolute inset-0 bg-black/70 group-hover:bg-black/80 transition-colors duration-300"></div>
        <h1 className="text-5xl lg:text-8xl text-white font-bold z-10 text-center">
          {project?.title}
        </h1>
        <p className="px-10 text-center z-10 text-white tex-base md:text-xl">
          {project?.short_description}
        </p>
        <div className="absolute flex flex-col md:flex-row bottom-12 justify-center md:justify-between items-cente w-full px-4 text-center lg:px-24 font-bold text-base md:text-xl">
          <p className="text-yellow-300 uppercase">
            {" "}
            <span className="text-white">Role </span>
            {project?.role.name}
          </p>
          <p className="text-yellow-300 uppercase">
            {" "}
            <span className="text-white">Period </span>
            {project?.period}
          </p>
          <p className="text-yellow-300 uppercase">
            {" "}
            <span className="text-white">Status </span>
            {project?.status}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full dark:bg-[#4B4A5D] bg-[#DDDBE5] md:py-16">
        <h1 className="flex items-center justify-center text-4xl md:text-7xl py-4 font-bold md:p-10 w-full md:w-1/2">
          Project Desc.
        </h1>
        <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-10 px-10">
          <p className="text-justify leading-tight dark:text-gray-300 text-gray-600 text-base md:text-2xl">
            {project?.description}
          </p>

          <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full">
            <Button
              asChild
              disabled={project?.site === "restricted"}
              size={mobile ? "sm" : "lg"}
              className={`w-fit group uppercase text-sm md:text-xl border-4 border-black dark:border-white rounded-none bg-transparent dark:text-white text-black dark:hover:bg-white hover:bg-black dark:hover:text-black hover:text-white transition-all duration-300 cursor-pointer ${
                project?.site === "restricted"
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            >
              <a
                href={
                  project?.site === "restricted"
                    ? undefined
                    : project?.site ?? "/"
                }
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={project?.site === "restricted" ? -1 : 0}
                aria-disabled={project?.site === "restricted"}
              >
                {project?.site === "restricted"
                  ? project.restricted_reason
                  : "View Website"}
                <Icon
                  icon="solar:map-arrow-right-bold"
                  width="50"
                  height="50"
                  className="absolute opacity-0 pointer-events-none group-hover:translate-x-28 group-hover:opacity-100 dark:text-white text-black transition-all duration-500"
                />
              </a>
            </Button>
            <div className="flex flex-row gap-4 items-center">
              <h1 className="text-base md:text-xl font-bold">Build with </h1>
                  {project?.languages.map(
                  (tech: { name: string; icon: string }, index: number) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Icon icon={tech.icon} height={mobile ? 20 : 30 } width={mobile ? 20 : 30} className="cursor-pointer"/>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{tech.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )
                )}
            </div>
          </div>
        </div>
      </div>

      <div className="dark:bg-[#4B4A5D] bg-[#DDDBE5] flex flex-col md:flex-row justify-center md:justify-between items-center">
        {project?.colors?.map((color, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 items-center justify-center w-full md:w-1/3 p-10"
          >
            <h1 className="text-xl font-bold">{color.name}</h1>
            <div
              className="flex items-center group justify-center w-full h-20 rounded-lg hover:shadow-2xl shadow-xl transition-shadow duration-300 relative group overflow-hidden cursor-pointer"
              style={{ backgroundColor: color.hex }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm pointer-events-none" />
              <p className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 z-10 text-white">
                {color.hex}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailProjectSection;
