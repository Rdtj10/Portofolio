"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

type ExoticLoadingProps = {
  loading: boolean;
};

const ExoticLoading = ({ loading }: ExoticLoadingProps) => {

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="exotic-loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-30 pointer-events-none" />

          {/* Atmospheric Elements: Rising Spirits */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 rounded-full bg-primary/20"
                style={{
                  height: Math.random() * 4 + 4,
                  left: `${Math.random() * 100}%`,
                  bottom: "-10%",
                }}
                animate={{
                  y: "-120vh",
                  opacity: [0, 1, 0],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 6 + Math.random() * 6,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center gap-14 text-center px-6">
            {/* Central Icon: The Enchanted Scroll */}
            <div className="relative group">
              <motion.div
                animate={{
                  rotate: [-5, 5, -5],
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 p-12 paper-card bg-white/40 backdrop-blur-md border-primary/20 shadow-2xl skew-y-2"
              >
                <Icon
                  icon="lucide:scroll-text"
                  className="text-8xl md:text-9xl text-primary animate-float drop-shadow-2xl"
                />
              </motion.div>

              {/* Whimsical Glow */}
              <div className="absolute inset-[-40px] -z-10 bg-primary/10 blur-[80px] rounded-full animate-pulse" />
            </div>

            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4 justify-center"
              >
                <div className="h-[2px] w-12 bg-primary/20" />
                <span className="text-xs font-black uppercase tracking-[0.6em] text-primary/60 italic font-serif">
                  Consulting the Chronicles
                </span>
                <div className="h-[2px] w-12 bg-primary/20" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-4xl md:text-6xl font-black font-serif italic tracking-tighter leading-tight"
              >
                Unfolding the <br />
                <span className="ghibli-text-gradient">Experience...</span>
              </motion.h1>
            </div>
          </div>

          {/* Footer Decor */}
          <div className="absolute bottom-16 flex flex-col items-center gap-6 opacity-20 group">
            <Icon
              icon="lucide:sparkles"
              className="text-4xl text-primary animate-spin-slow"
            />
            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-primary/60">
              The Meadow is Preparing
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExoticLoading;
