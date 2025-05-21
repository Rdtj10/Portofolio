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
// import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

interface TDialogProps {
  open: boolean;
  onClose(open: boolean): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any;
}

const ProjectsDialog = ({ open, onClose, project }: TDialogProps) => {
  return (
    <Dialog onOpenChange={onClose} open={open}>
      <DialogContent className="md:max-w-lg">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.short_description}</DialogDescription>
          {/* <div className="flex justify-end items-center">
            <DialogClose asChild className="cursor-pointer">
              <Icon icon="ic:round-close" width={24} />
            </DialogClose>
          </div> */}
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

        <div className="flex flex-col gap-4">
          {project.languages && project.languages.length > 0 && (
            <div className="mb-">
              <h4 className="font-semibold mb-1">Tech Stack:</h4>
              <ul className="flex flex-wrap gap-2">
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
              </ul>
            </div>
          )}
          <p>{project.description}</p>
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
