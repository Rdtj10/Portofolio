"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Icon } from "@iconify/react";
import { TDialogProps } from "@/interfaces";
import Image from "next/image";

export default function AboutDialog({ open, onClose }: TDialogProps) {
  return (
    <Dialog onOpenChange={onClose} open={open}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-transparent shadow-none">
        <div className="paper-card flex flex-col md:flex-row relative bg-white/95 backdrop-blur-xl border-primary/20 overflow-hidden">
          {/* Whimsical Background Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -z-10" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 blur-3xl rounded-full -z-10" />

          {/* Left Side: The Storyteller */}
          <div className="flex-1 p-10 md:p-14 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-8 bg-primary/30" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                  The Alchemist's Tale
                </span>
              </div>
              <DialogHeader>
                <DialogTitle className="text-4xl md:text-5xl font-black font-serif tracking-tight">
                  About the <span className="text-primary">Craftsman</span>
                </DialogTitle>
              </DialogHeader>
            </div>

            <Separator className="bg-primary/10" />

            <div className="flex flex-col gap-6">
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed font-serif text-justify italic border-l-4 border-secondary/20 pl-6">
                I am{" "}
                <span className="font-bold text-foreground">Ridho Dimas</span>,
                a digital gardener who harvests clean code and sows seeds of
                wonder. My journey began with a simple curiosity for how the
                invisible gears of the web turn, and evolved into a calling to
                build habitats where humans and technology thrive in harmony.
              </p>
              <p className="text-base text-foreground/50 leading-relaxed font-serif text-justify">
                Currently, I am exploring the deep forests of React, TypeScript,
                and Cloud Infrastructure, treating every line of code as a petal
                in a larger ecosystem. My workshop is always open to
                collaborative enchantments, where we can build tools that feel
                as natural as the wind through the trees.
              </p>
            </div>

            <div className="mt-auto pt-8 flex items-center gap-6">
              <DialogClose asChild>
                <Button className="px-10 py-6 rounded-2xl bg-primary text-primary-foreground font-black uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-lg">
                  Return to Meadow
                </Button>
              </DialogClose>
              <div className="flex items-center gap-2 opacity-30">
                <Icon icon="lucide:feather" className="text-xl animate-float" />
                <span className="text-[9px] font-black uppercase tracking-widest">
                  Ink & Paper
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: The Portrait */}
          <div className="md:w-2/5 bg-primary/5 p-10 flex flex-col items-center justify-center gap-8 border-l border-primary/10 relative">
            <div className="relative w-48 h-48 md:w-56 md:h-56">
              <div className="absolute inset-[-15px] border-4 border-dashed border-primary/20 rounded-full animate-spin-slow" />
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white sketch-border">
                <Image
                  src="/me.png"
                  alt="Ridho Dimas"
                  fill
                  className="object-cover object-top filter sepia-[0.3]"
                />
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <h4 className="text-2xl font-black font-serif text-foreground/80">
                Ridho Dimas
              </h4>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-primary mt-1">
                Software Engineer
              </p>

              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {[
                  {
                    icon: "mdi:instagram",
                    href: "https://www.instagram.com/dhodols/",
                  },
                  { icon: "mdi:github", href: "https://github.com/Rdtj10" },
                  {
                    icon: "mdi:linkedin",
                    href: "https://www.linkedin.com/in/ridho-dimas-tj",
                  },
                  { icon: "mdi:whatsapp", href: "https://wa.me/6285161610522" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-primary/5 text-foreground/40 hover:text-primary"
                  >
                    <Icon icon={social.icon} className="text-2xl" />
                  </a>
                ))}
              </div>
            </div>

            {/* Whimsical Stamp */}
            <div className="absolute bottom-6 right-6 opacity-10 rotate-12">
              <Icon icon="lucide:stamp" className="text-6xl text-primary" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
