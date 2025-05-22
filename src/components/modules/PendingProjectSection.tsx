"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { Badge } from "../ui/badge";
import ProjectsDialog from "../ProjectsDialog";
import { trpc } from "@/utils/trpc";

export default function PendingProjectSection() {

  const { data: projects } = trpc.project.getAll.useQuery();

  const [isDialogAbsenOpen, setIsDialogAbsenOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [itemSelected, setItemSelected] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpenDialogAbsen = (item: any) => {
    setItemSelected(item);
    setIsDialogAbsenOpen(true);
  };
  return (
    <section
      className="w-full h-fit flex flex-col dark:bg-[#22232F] bg-[#F0F0F5] pt-8 md:pt-28 gap-10 transition-all duration-500"
      id="other-projects"
    >
      <div>
        <h1 className="text-center text-3xl dark:text-yellow-300 text-yellow-600 font-semibold">
          Others Projects
        </h1>
        <p className="text-center text-lg dark:text-gray-300">
          This section showcases both current and pending projects that are in
          progress or awaiting completion.
        </p>
      </div>
      <div className="w-full flex flex-col md:grid md:grid-cols-4">
        {projects
          ?.filter((project) => project.status !== "COMPLETED")
          .map((project, index) => (
            <Card
              key={index}
              className={cn(
                `flex flex-col justify-between rounded-none group cursor-pointer h-[60vh] border-none shadow-[0_0_60px_rgba(0,0,0,0.1)] dark:bg-[#4B4A5D] bg-[#DDDBE5] hover:bg-white transition-colors duration-300`
              )}
              onClick={() => handleOpenDialogAbsen(project)}
            >
              <CardHeader className="h-1/2 flex flex-col items-center justify-center bg-[#DDDBE5] group-hover:bg-white transition-colors duration-300 mx-6 rounded-xl">
                <Image
                  alt={project.title}
                  src={project.imageUrl || "/logo/rdtj.png"}
                  width={1000}
                  height={1000}
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-semibold">
                  {project.title}
                </CardTitle>
                <p className="text-sm">{project.short_description}</p>
              </CardContent>
              <CardFooter className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-col items-center w-fit gap-1">
                  <div className="transform rotate-90 text-sm dark:text-white text-gray-500 tracking-widest">
                    {index + 1 <= 9 ? `0${index + 1}` : index + 1}
                  </div>
                  <div className="w-0.5 bg-black h-3 group-hover:h-10 transition-all duration-300"></div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Badge
                    className={
                      project.ownStatus === "Company"
                        ? `bg-red-300 text-red-600`
                        : project.ownStatus === "Own property"
                        ? `bg-green-300 text-green-600`
                        : `bg-gray-300 text-gray-600`
                    }
                  >
                    {project.ownStatus}
                  </Badge>
                  <p className="text-xs">
                    Status :{" "}
                    <span
                      className={
                        project.status === "PLANNED"
                          ? `text-orange-500`
                          : `text-green-500`
                      }
                    >
                      Pending
                    </span>
                  </p>
                </div>
              </CardFooter>
            </Card>
          ))}
        {itemSelected && (
          <ProjectsDialog
            open={isDialogAbsenOpen}
            onClose={setIsDialogAbsenOpen}
            project={itemSelected}
          />
        )}
      </div>
    </section>
  );
}
