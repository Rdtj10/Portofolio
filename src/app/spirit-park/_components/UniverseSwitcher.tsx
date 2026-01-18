"use client";

import { Icon } from "@iconify/react";

interface UniverseSwitcherProps {
  totalUniverses: number;
  currentUniverse: number;
  onUniverseChange: (index: number) => void;
}

export const UniverseSwitcher = ({
  totalUniverses,
  currentUniverse,
  onUniverseChange,
}: UniverseSwitcherProps) => {
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-10 py-6 bg-white/40 backdrop-blur-xl border border-white/40 rounded-[2.5rem] shadow-2xl">
      <div className="flex flex-col gap-1 pr-6 border-r border-primary/20">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">
          Cosmic Gate
        </span>
        <span className="text-xs font-black text-foreground/80 font-serif italic">
          Universe {currentUniverse + 1}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {[...Array(totalUniverses)].map((_, i) => (
          <button
            key={i}
            onClick={() => onUniverseChange(i)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              currentUniverse === i
                ? "bg-primary text-primary-foreground scale-110 shadow-lg"
                : "bg-white/60 text-primary hover:bg-white hover:scale-105"
            }`}
            title={`Enter Universe ${i + 1}`}
          >
            <span className="text-xs font-black">{i + 1}</span>
          </button>
        ))}
        
        {totalUniverses === 0 && (
          <div className="text-xs font-black text-primary/40 uppercase tracking-widest">
            Aligning Stars...
          </div>
        )}
      </div>

      <div className="pl-6 border-l border-primary/20 flex items-center gap-3">
        <Icon icon="lucide:loader-2" className="animate-spin text-xl text-primary/40" />
        <span className="text-[10px] font-black uppercase tracking-widest text-primary/40">
          Syncing
        </span>
      </div>
    </div>
  );
};
