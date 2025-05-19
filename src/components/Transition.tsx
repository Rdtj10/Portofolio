"use client";
import useMobile from "@/hooks/useMobile";
import { motion } from "framer-motion";
import Image from "next/image";

const transitionVariants = {
  initial: {
    x: "100%",
    width: "100%",
  },
  animate: {
    opacity: 0,
  },
  exit: {
    x: ["0%", "100%"],
    width: ["0%", "100%"],
  },
};

const Transition = () => {
  const mobile = useMobile();
  const ROWS = mobile ? 10 : 4;
  return (
    <>
      <motion.div
        className="fixed realtive top-0 bottom-0 right-full w-screen h-screen z-50 dark:bg-[#383444] bg-[#E5E3F1] pointer-events-none"
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 1.5, duration: 0.5, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-0 grid w-full h-full"
          style={{
            display: "grid",
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,

            zIndex: 10,
          }}
        >
          {!mobile ? (
            Array.from({ length: ROWS }).map((_, i) => (
              <motion.span
                key={i}
                className="flex items-center justify-center text-xl text-[16vw] font-extrabold text-gray-600 dark:text-gray-300 opacity-30 select-none pointer-events-none m-0 p-0 leading-tight"
                style={{
                  letterSpacing: "0.05em",
                  userSelect: "none",
                  margin: 0,
                  padding: 0,
                  lineHeight: 1,
                }}
                initial={{
                  x: i % 2 === 0 ? "-100vw" : "100vw",
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.2 + i * 0.08,
                  duration: 0.6,
                  ease: "easeOut",
                }}
              >
                WELCOME!
              </motion.span>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-screen w-screen">
              <h1 className="font-extrabold text-xl">
                WELCOME!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">Use Desktop Version for better experience</p>
            </div>
          )}
        </div>
        <Image
          src="/me.png"
          alt="test"
          width={1000}
          height={1000}
          className="hidden md:block absolute left-1/2 bottom-0 transform -translate-x-1/2 md:top-2/3 md:left-[55%] md:bottom-auto md:-translate-y-1/2 z-20"
        />
      </motion.div>
    </>
  );
};

export default Transition;
