<h1 className="text-8xl font-bold text-white w-4/5 relative z-50"></h1>;

import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex flex-row items-center w-full min-h-screen bg-[#383444] px-6 lg:px-24 overflow-hidden">
      <div className="flex flex-col gap-4 w-fit max-w-/5">
        <p className="text-4xl text-white/60 font-extralight">I&apos;m</p>
        <h1 className="text-8xl font-bold text-white w-4/5">
          <span className="relative z-30 text-shadow-2xs">Ridho Dimas</span> Tri
          Prasetyo Jayadi
        </h1>
        <div className="h-1 w-1/3 bg-orange-300"></div>
        <p className="text-white/60 w-1/3 font-extralight leading-loose">
          A <span className="text-white font-bold"> Web Developer </span> that
          build scalable web solutions using React, Node.js, Go, Laravel, and
          more.
        </p>
      </div>
      <div className="flex flex-col gap-4 w-1/2 z-30">
        <p className="text-white/70">Services</p>
        <p className="text-white text-lg">
          Crafting Seamless and Scalable Solutions from Frontend to Backend,
          Empowering Every Line of Code.
        </p>
        <Link
          href=""
          className="flex flex-row items-center gap-1 group hover:underline text-orange-300 text-lg"
        >
          see my projects{" "}
          <Icon
            icon="mingcute:arrow-right-fill"
            className="group-hover:translate-x-2 transition-all duration-300"
          />
        </Link>
        <div className="flex flex-row gap-4 items-center">
          <Link
            href=""
            target="_blank"
            className="p-1 text-xl rounded-full bg-slate-600 text-orange-300 hover:bg-white transition-all duration-300"
          >
            <Icon icon="mage:facebook" />
          </Link>
          <Link
            href=""
            target="_blank"
            className="p-1 text-xl rounded-full bg-slate-600 text-orange-300 hover:bg-white transition-all duration-300"
          >
            <Icon icon="ri:instagram-fill" />
          </Link>
          <Link
            href=""
            target="_blank"
            className="p-1 text-xl rounded-full bg-slate-600 text-orange-300 hover:bg-white transition-all duration-300"
          >
            <Icon icon="la:linkedin-in" />
          </Link>
          <Link
            href=""
            target="_blank"
            className="p-1 text-xl rounded-full bg-slate-600 text-orange-300 hover:bg-white transition-all duration-300"
          >
            <Icon icon="mingcute:github-fill" />
          </Link>
        </div>
      </div>
      <Image
        src="/me.png"
        alt="test"
        width={1000}
        height={1000}
        className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
      />
      {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-black z-10"></div> */}
    </section>
  );
}
