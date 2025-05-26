import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Icon } from "@iconify/react/dist/iconify.js";

interface TDialogProps {
  open: boolean;
  onClose(open: boolean): void,
}

export default function AboutDialog({open, onClose} : TDialogProps) {
  return (
    <Dialog onOpenChange={onClose} open={open}>
      <DialogContent className="max-w-2xl md:max-w-1/2 p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row relative">
            <h1 className="absolute inset-x-0 bottom-0 -translate-y-1/2 text-center text-9xl font-extrabold pointer-events-none opacity-10 select-none">
            Wkwk Section
            </h1>
          {/* Left Side: Description */}
          <div className="flex-1 p-8 bg-white dark:bg-gray-950">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-2">
                About Me
              </DialogTitle>
            </DialogHeader>
            <Separator className="mb-4" />
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-justify">
              I&apos;m <span className="font-semibold">Ridho Dimas Tri Prasetyo Jayadi</span>, a web developer who&apos;s often rejected just because I don&apos;t have a web portfolio—wkwkwk. I just want to experience working as part of a team, in different teams or companies, and learn new and different things every day, week, month, or even year. Basically, I just want to grow significantly—wkwkwk. I absolutely love crafting elegant solutions and delivering
              high-quality user experiences. My expertise includes React,
              TypeScript, and Next.js. I&apos;m always eager to learn new technologies and collaborate on
              exciting projects. So, let&apos;s connect!
            </p>
            <DialogClose asChild>
              <Button className="mt-6" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </div>
          {/* Right Side: Profile & Details */}
          <div className="flex flex-col items-center justify-center flex-1 bg-gray-50 dark:bg-gray-900 p-8">
            <Icon icon="solar:user-circle-bold" className="text-7xl text-gray-400 dark:text-gray-600 mb-4" />
            <div className="text-center">
              <div className="text-lg font-semibold mb-1">Ridho Dimas Tri Prasetyo Jayadi</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Software Engineer
              </div>
              <Separator className="my-2" />
              <div className="text-xs text-gray-400 dark:text-gray-500">
                React • TypeScript • Next.js
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
