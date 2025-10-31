"use client";
import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const images = [
  {
    src: "/card/labskillv2-2.png",
    desc: "Design improvement with modern UI.",
  },
  {
    src: "/card/labskillv2-1.png",
    desc: "Implement React Query for faster data fetching.",
  },
];

export default function CurrentProjectSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + images.length) % images.length);
  };

  return (
    <section
      className="relative w-full dark:bg-[#22232F] bg-[#F0F0F5] min-h-screen h-fit px-6 lg:px-24 flex flex-col gap-6 py-12 md:py-28 transition-all duration-500"
      id="current-projects"
    >
      <div>
        <h1 className="text-center text-3xl dark:text-yellow-300 text-yellow-600 font-semibold">
          In Progress
        </h1>
        <p className="text-center md:text-lg dark:text-gray-300">
          Currently, I am actively working on a project that is in progress.
          Stay tuned for updates as I work towards its completion!
        </p>
      </div>
      <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8 mt-8 transition-shadow duration-500 shadow hover:shadow-xl dark:bg-[#4B4A5D] bg-[#DDDBE5] rounded-xl md:pl-10">
        {/* Left: Description */}
        <div className="md:w-1/3 w-full flex flex-col justify-center px-6 py-4 md:p-10">
          <h2 className="text-2xl font-bold dark:text-white mb-2">
            Labskill V2
          </h2>
          <p className="dark:text-white/70 text-gray-700 text-sm">
            Labskill V2 connects students with expert tutors through a modern
            UI, improved search, real-time scheduling, and secure messaging for
            a better learning experience.
          </p>
        </div>

        {/* Right: Carousel */}
        <div className="md:w-2/3 w-full">
          <div className="relative w-full h-64 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={current}
                className="absolute w-full h-full"
                custom={direction}
                initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={images[current].src}
                  alt={`Project ${current + 1}`}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full bg-black/30"
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 text-xs md:text-sm flex justify-between items-center"
                  key={`desc-${current}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h1>{images[current].desc}</h1>
                  <h1>
                    {current + 1} / {images.length}
                  </h1>
                </motion.div>

                {/* Prev Button */}
                <button
                  onClick={() => paginate(-1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white text-2xl rounded-full px-1 flex items-center justify-center cursor-pointer z-10"
                  aria-label="Previous"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 6l-6 6 6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Next Button */}
                <button
                  onClick={() => paginate(1)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white text-2xl rounded-full px-1 flex items-center justify-center cursor-pointer z-10"
                  aria-label="Next"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
