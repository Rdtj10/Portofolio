import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils/cn";
import Image from "next/image";

const projects = [
  {
    title: "Labskill",
    short_description:
      "An online education platform especially in the IT field",
    url: "/projects/labskill",
    imageUrl: "/card/labskill.png",
  },
  {
    title: "Kawanstudy",
    short_description: "An online education platform",
    url: "/projects/kawanstudy",
    imageUrl: "/card/kawanstudy.png",
  },
  {
    title: "Kawanstudy",
    short_description: "An online education platform",
    url: "/projects/kawanstudy",
    imageUrl: "/card/kawanstudy.png",
  },
  {
    title: "Kawanstudy",
    short_description: "An online education platform",
    url: "/projects/kawanstudy",
    imageUrl: "/card/kawanstudy.png",
  },
];

export default function PendingProjectSection() {
  return (
    <section className="w-full h-fit flex flex-col dark:bg-[#22232F] bg-[#F0F0F5] pt-28 gap-10 transition-all duration-500" id="other-projects">
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
        {projects?.map((project, index) => (
          <Card
            key={index}
            className={cn(
              `flex flex-col justify-between rounded-none group cursor-pointer h-[60vh] border-none shadow-[0_0_60px_rgba(0,0,0,0.1)] dark:bg-[#4B4A5D] bg-[#DDDBE5] hover:bg-white transition-colors duration-300`
            )}
          >
            <CardHeader>
              <Image
                alt={project.title}
                src={project.imageUrl}
                width={1000}
                height={1000}
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{project.title}</CardTitle>
              {project.short_description}
            </CardContent>
            <CardFooter className="flex flex-col items-center w-fit gap-1">
              <div className="transform rotate-90 text-sm dark:text-white text-gray-500 tracking-widest">
                0{index + 1}
              </div>
              <div className="w-0.5 bg-black h-3 group-hover:h-10 transition-all duration-300"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
