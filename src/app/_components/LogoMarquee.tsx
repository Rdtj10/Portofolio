"use client";

import Marquee from "react-fast-marquee";
import Image from "next/image";
import { Icon } from "@iconify/react";

const logos = [
  "html.png",
  "csspng.png",
  "php.png",
  "js.png",
  "ts.png",
  "mongodb.png",
  "mysql.webp",
  "postgresql.png",
  "django.png",
  "flask.png",
  "golang.webp",
  "nodejs.png",
  "laravel.png",
  "nextjs.png",
];

export default function LogoMarquee() {
  return (
    <div className="relative w-full py-16 md:py-24 overflow-hidden border-t border-b border-primary/10 bg-white/30 backdrop-blur-sm">
      {/* Decorative Atmosphere */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-secondary/5 blur-3xl rounded-full" />

      <div className="flex flex-col items-center gap-12">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-12 bg-primary/20" />
          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-foreground/30 italic font-serif">
            Technical Artifacts
          </span>
          <div className="h-[1px] w-12 bg-primary/20" />
        </div>

        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-background to-transparent z-10" />

          <Marquee speed={30} gradient={false} pauseOnHover={true}>
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center mx-12 md:mx-20 group cursor-pointer"
              >
                <div className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center p-4 bg-white/40 rounded-[2rem] border border-white/60 shadow-sm group-hover:shadow-xl group-hover:scale-110 group-hover:bg-white transition-all duration-700">
                  <Image
                    src={`/logo/${logo}`}
                    alt={logo.split(".")[0]}
                    width={80}
                    height={80}
                    className="object-contain opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
                  />
                  {/* Whimsical Glow */}
                  <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] scale-150 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <span className="mt-4 text-[9px] font-black uppercase tracking-[0.3em] text-foreground/20 group-hover:text-primary transition-colors">
                  {logo.split(".")[0]}
                </span>
              </div>
            ))}
          </Marquee>
        </div>

        <div className="flex items-center gap-4 opacity-10">
          <Icon icon="lucide:sparkles" className="text-xl animate-pulse" />
          <span className="text-[8px] font-black uppercase tracking-[0.8em]">
            Endless Exploration
          </span>
          <Icon icon="lucide:sparkles" className="text-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}
