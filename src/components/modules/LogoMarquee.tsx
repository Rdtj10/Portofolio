"use client";

import Marquee from "react-fast-marquee";
import Image from "next/image";
import useMobile from "@/hooks/useMobile";

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
  const mobile = useMobile()
  return (
    <div className="flex items-center justify-center dark:bg-[#4B4A5D] bg-[#DDDBE5] py-6 overflow-hidden h-20 md:h-40">
      <Marquee speed={50}>
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center md:mx-8 w-[100px] h-[100px]"
          >
            <Image
              src={`/logo/${logo}`}
              alt={logo.replace(".png", "")}
              width={mobile ? 35 : 70}
              height={mobile ? 35 : 70}
              className="object-contain dark:grayscale-75 grayscale-100 hover:dark:grayscale-0 hover:grayscale-0 cursor-pointer transition-transform duration-300 hover:scale-110"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
