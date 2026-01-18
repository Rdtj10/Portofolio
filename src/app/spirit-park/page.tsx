"use client";

import { useState, useEffect, useRef } from "react";
import { trpc } from "@/utils/trpc";
import { KodamaSprite } from "./_components/KodamaSprite";
import { UniverseSwitcher } from "./_components/UniverseSwitcher";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SpiritParkPage() {
  const [mounted, setMounted] = useState(false);
  const [currentUniverse, setCurrentUniverse] = useState(0);
  const { data: allVisits, isLoading } = trpc.visit.getAll.useQuery();
  const parkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupsOf100: any[][] = [];
  if (allVisits) {
    for (let i = 0; i < allVisits.length; i += 100) {
      groupsOf100.push(allVisits.slice(i, i + 100));
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentGuests: any[] = groupsOf100[currentUniverse] || [];

  if (!mounted) return null;

  return (
    <main
      ref={parkRef}
      className="relative w-full h-screen overflow-hidden bg-[#0a1a1a]"
    >
      {/* Background Painting */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-90 scale-105"
        style={{ backgroundImage: "url('/spirit-park/village-park-bg.jpg')" }}
      />
      
      {/* Mystical Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a1a]/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none" />

      {/* Atmospheric Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 blur-sm rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Header */}
      <div className="absolute top-10 left-10 z-50 flex items-center gap-6">
        <Link
          href="/"
          className="w-14 h-14 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center hover:bg-white transition-all hover:scale-110 shadow-2xl group border border-white/20"
        >
          <Icon icon="lucide:arrow-left" className="text-2xl text-primary" />
        </Link>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-white font-serif drop-shadow-lg">
            Spirit <span className="text-primary italic">Park</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">
            A Sanctuary for Traveling Souls
          </p>
        </div>
      </div>

      {/* Stats Board */}
      <div className="absolute top-10 right-10 z-50 hidden md:flex flex-col gap-2 items-end">
        <div className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/80">
            Total Spirits Observed: {allVisits?.length || 0}
          </span>
        </div>
        <div className="px-4 py-2 bg-primary/20 backdrop-blur-md rounded-xl border border-primary/20 shadow-lg">
          <span className="text-[8px] font-black uppercase tracking-widest text-primary-foreground/80">
            Universe Synchronization: Active
          </span>
        </div>
      </div>

      {/* The Spirits */}
      <div className="absolute inset-0 z-20 container mx-auto px-10">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
              <Icon icon="lucide:loader-2" className="text-6xl text-white/20 animate-spin" />
              <span className="text-xs font-black uppercase tracking-[0.5em] text-white/40 animate-pulse">
                Calling the Ancients...
              </span>
            </div>
          </div>
        ) : (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          currentGuests.map((guest: any, idx: number) => (
            <KodamaSprite key={guest.id} id={guest.id} index={idx} />
          ))
        )}
      </div>

      {/* Universe Switcher */}
      <UniverseSwitcher
        totalUniverses={groupsOf100.length}
        currentUniverse={currentUniverse}
        onUniverseChange={setCurrentUniverse}
      />

      {/* Bottom Vignette */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </main>
  );
}
