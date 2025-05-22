import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Badge } from "./ui/badge";

interface TDialogProps {
  open: boolean;
  onClose(open: boolean): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any;
}

const ProjectsDialog = ({ open, onClose, project }: TDialogProps) => {
  return (
    <Dialog onOpenChange={onClose} open={open}>
      <DialogContent className="md:max-w-2xl overflow-y-scroll md:overflow-y-auto my-1 md:my-0 md:h-fit">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription className="flex flex-row items-center gap-2">
            <Badge>{project.role.name}</Badge>
          </DialogDescription>
        </DialogHeader>

        <div className=" flex items-center justify-center w-full h-40">
          {project.imageUrl && (
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={1000}
              height={1000}
              className="w-full rounded-lg my-4"
            />
          )}
        </div>

        <div className="flex flex-col gap-4 ">
          {project.languages && project.languages.length > 0 && (
            <div className="flex flex-col gap-1">
              <h4 className="font-semibold">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.languages.map(
                  (tech: { name: string; icon: string }, index: number) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Icon icon={tech.icon} height={30} width={30} className="cursor-pointer"/>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{tech.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )
                )}
              </div>
              {/* <ul className="flex flex-wrap gap-2">
                {project.languages.map(
                  (tech: { name: string; icon: string }, index: number) => (
                    <li
                      key={index}
                      className="bg-muted px-2 py-1 rounded text-sm"
                    >
                      {tech.name}
                    </li>
                  )
                )}
              </ul> */}
            </div>
          )}
          <p className="text-justify leading-tight text-gray-400">
            {project.description}
          </p>
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold">Development Roadblocks</h1>
            <p className="text-justify leading-tight text-gray-400">
              {project.pending_reason}
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" className="cursor-pointer">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectsDialog;
