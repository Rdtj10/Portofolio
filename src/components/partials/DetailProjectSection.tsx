"use client";

import { useParams } from "next/navigation";
import { trpc } from "@/utils/trpc";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import useMobile from "@/hooks/useMobile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";
import Image from "next/image";

const DetailProjectSection = () => {
  const mobile = useMobile();
  const { id } = useParams();
  const { data: project } = trpc.project.getById.useQuery(id as string);
  const { data: allProjects } = trpc.project.getAll.useQuery();
  const projectIds =
    allProjects
      ?.filter((p) => p.status === "COMPLETED")
      .map((p: { id: string }) => p.id) || [];
  const currentIndex = projectIds.indexOf(id as string);
  const prevId = currentIndex > 0 ? projectIds[currentIndex - 1] : null;
  const nextId =
    currentIndex < projectIds.length - 1 ? projectIds[currentIndex + 1] : null;

  return (
    <section className="flex flex-col min-h-screen h-fit w-full dark:bg-[#22232F] bg-[#F0F0F5]">
      <div
        className="relative z-10 flex flex-col bg-black bg-cover bg-center bg-no-repeat w-full h-screen lg:h-[85vh] items-center justify-center"
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
        <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-10 px-10 md:pr-24">
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
                        <Icon
                          icon={tech.icon}
                          height={mobile ? 20 : 30}
                          width={mobile ? 20 : 30}
                          className="cursor-pointer"
                        />
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
      <div className="flex flex-col w-full dark:bg-[#4B4A5D] bg-[#DDDBE5] md:py-16 gap-6 md:gap-10 pt-10 md:pt-0">
        <h1 className="hidden md:flex items-center justify-center text-3xl py-4 font-bold w-full">
          As a&nbsp;
          <span className="dark:text-yellow-300 text-yellow-600 underline">
            {project?.role.name}
          </span>
        </h1>
        <div className="relative w-full flex flex-col-reverse gap-6 md:gap-10 px-10">
          <p className="text-justify dark:text-gray-300 text-gray-600 leading-tight text-base md:text-2xl md:px-24 w-full">
            <a className="text-lg md:hidden block">As a&nbsp;
            <span className=" text-yellow-600 dark:text-yellow-300">
              {project?.role.name}
            </span></a>
            {project?.task}
          </p>
          <Image
            src={project?.company_logo || "/logo/rdtj.png"}
            alt={project?.company_name || "Project Image"}
            width={1000}
            height={1000}
            className="w-1/3 my-4 absolute inset-x-0 bottom-0 -translate-y-1/2 pointer-events-none opacity-10"
          />
        </div>
      </div>

      <div className="dark:bg-[#4B4A5D] bg-[#DDDBE5] flex flex-col items-center">
        <h1 className="hidden md:flex items-center justify-center text-3xl py-4 font-bold w-full">
          Meet the colors
        </h1>
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center w-full">
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
      </div>

      <div
        className={`dark:bg-[#22232F] bg-[#F0F0F5] relative flex flex-row w-full h-fit items-center py-6 md:px-24 ${
          !prevId ? "justify-end" : "justify-between"
        }`}
      >
        <Link href={`/${prevId}`} className={!prevId ? "hidden" : "block"}>
          <div className="flex flex-row gap-2 items-center cursor-pointer">
            <Icon icon="quill:chevron-left" width="50" height="50" />
            <div>
              <span className="text-sm">Previous Project</span>
              <p className="font-bold text-lg">
                {prevId
                  ? allProjects?.find((p: { id: string }) => p.id === prevId)
                      ?.title
                  : ""}
              </p>
            </div>
          </div>
        </Link>
        <Link href={`/${nextId}`} className={!nextId ? "hidden" : "block"}>
          <div className="flex flex-row gap-2 items-center cursor-pointer">
            <div>
              <span className="text-sm">Next Project</span>
              <p className="font-bold text-lg">
                {nextId
                  ? allProjects?.find((p: { id: string }) => p.id === nextId)
                      ?.title
                  : ""}
              </p>
            </div>
            <Icon icon="quill:chevron-right" width="50" height="50" />
          </div>
        </Link>
      </div>
    </section>
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
