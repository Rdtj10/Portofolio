"use client";

import useMobile from "@/hooks/useMobile";
import { motion } from "framer-motion";

const transitionVariants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
      delay: 1.5,
    },
  },
};

const Transition = () => {
  const mobile = useMobile();
  const ROWS = mobile ? 5 : 3;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background pointer-events-none"
      variants={transitionVariants}
      initial="initial"
      animate="animate"
    >
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col gap-2 items-center overflow-hidden">
          {Array.from({ length: ROWS }).map((_, i) => (
            <motion.h1
              key={i}
              className="text-5xl md:text-8xl font-black tracking-tighter text-primary/5 select-none font-serif italic"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.3 + i * 0.15,
                duration: 1.2,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              The World Awaits<span className="text-secondary">.</span>
            </motion.h1>
          ))}
        </div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/20 font-serif">
            Setting the scene
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Transition;
