"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section
      className="relative flex flex-col md:flex-row items-center w-full min-h-[calc(100vh-80px)] md:min-h-screen dark:bg-[#383444] bg-[#E5E3F1] transitio-all duration-300 px-6 lg:px-24 pt-8 overflow-hidden"
      id="hero"
    >
      <div className="flex flex-col gap-4 w-full md:w-fit max-w-/5">
        <p className="text-4xl dark:text-white/60 font-extralight">I&apos;m</p>
        <h1 className="text-4xl md:text-8xl font-bold dark:text-white w-full md:w-4/5">
          <span className="relative z-30 text-shadow-2xs text-shadow-white">
            Ridho Dimas Tri{" "}
          </span>
          Prasetyo Jayadi
        </h1>
        <div className="h-1 w-full md:w-1/3 bg-yellow-600 dark:bg-yellow-300"></div>
        <p className="dark:text-white/60 w-full md:w-1/3 font-extralight leading-loose">
          A <span className="dark:text-white font-bold"> Web Developer </span>{" "}
          that build scalable web solutions using NextJs, NodeJs, Go, Laravel,
          and more.
        </p>
      </div>
      <div className="flex flex-col gap-2 md:gap-8 w-full md:w-1/2 z-30 relative md:-top-30">
        {/* <p className="dark:text-white/70">Services</p> */}
        <p className="hidden md:flex dark:text-white text-lg">
          Crafting Seamless and Scalable Solutions from Frontend to Backend,
          Empowering Every Line of Code.
        </p>
        <div
          onClick={() => handleScroll("index")}
          className="flex flex-row items-center gap-1 group hover:underline text-yellow-600 dark:text-yellow-300 md:text-lg cursor-pointer"
        >
          see my projects{" "}
          <Icon
            icon="mingcute:arrow-right-fill"
            className="group-hover:translate-x-2 transition-all duration-300"
          />
        </div>
        <div className="flex flex-row gap-4 items-center">
          {/* <Link
        href=""
        target="_blank"
        className="p-1 text-xl rounded-full bg-slate-600 text-yellow-600 dark:text-yellow-300 hover:bg-white transition-all duration-300"
          >
        <Icon icon="mage:facebook" />
          </Link>
          <Link
        href=""
        target="_blank"
        className="p-1 text-xl rounded-full bg-slate-600 text-yellow-600 dark:text-yellow-300 hover:bg-white transition-all duration-300"
          >
        <Icon icon="ri:instagram-fill" />
          </Link> */}
          <Link
            href="https://www.linkedin.com/in/ridho-dimas-tj/"
            target="_blank"
            className="p-1 md:text-xl rounded-full bg-[#DDDBE5] dark:bg-slate-600 text-yellow-600 dark:text-yellow-300 hover:bg-white hover:dark:bg-slate-900 transition-all duration-300"
          >
            <Icon icon="la:linkedin-in" />
          </Link>
          <Link
            href="https://www.github.com/Rdtj10"
            target="_blank"
            className="p-1 md:text-xl rounded-full bg-[#DDDBE5] dark:bg-slate-600 text-yellow-600 dark:text-yellow-300 hover:bg-white hover:dark:bg-slate-900 transition-all duration-300"
          >
            <Icon icon="mingcute:github-fill" />
          </Link>
          <Link
            href="https://drive.google.com/file/d/1P3AqgzEzMBH0gWYe0jLbWgje3sbUdJrp/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="px-2 py-1 flex gap-1 items-center md:text-xl rounded-full bg-[#DDDBE5] dark:bg-slate-600 text-yellow-600 dark:text-yellow-300 hover:bg-white hover:dark:bg-slate-900 transition-all duration-300"
          >
            <Icon icon="mdi:file-download-outline" />
            <h1 className="text-sm">My Resume </h1>
          </Link>
        </div>
      </div>
      <Image
        src="/me.png"
        alt="test"
        width={1000}
        height={1000}
        className="absolute left-1/2 bottom-0 transform -translate-x-1/2 md:top-2/3 md:left-[55%] md:bottom-auto md:-translate-y-1/2 z-20"
      />
      {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-black z-10"></div> */}
    </section>
  );
}
