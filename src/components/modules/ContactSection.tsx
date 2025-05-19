"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useRef, useState } from "react";
import sendEmail from "@/service/email-js/sendEmail";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export default function ContactSection() {
  const form = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current) {
      setLoading(true);
      try {
        await sendEmail(form.current);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <section className="w-full flex flex-col md:flex-row dark:bg-[#383444] bg-[#E5E3F1] px-6 lg:px-24 pt-16 md:pt-28 h-min-screen transition-all duration-500" id="contact">
      <div className="hidden md:block relative w-1/2">
        <Image
          src="/right.png"
          alt="Ridho Dimas"
          width={1000}
          height={1000}
          className="w-full"
        />
      </div>
      <div className="flex flex-col w-full md:w-1/2 py-8 gap-4 md:gap-10 justify-center items-center">
        <div className="text-center max-w-sm">
          <h1 className="text-3xl dark:text-yellow-300 text-yellow-600 font-semibold">
            Let&apos;s connect!
          </h1>
            <p className="text-sm">
              I&apos;m open to opportunities, collaborations, or feedback. Feel free to reach out, and let&apos;s connect!
            </p>
        </div>
        <form
          ref={form}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full justify-center items-center"
        >
          <div className=" w-full max-w-sm gap-2 flex flex-col text-white">
            <Label className="dark:text-white text-black" htmlFor="subject">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              className="bg-white dark:text-white text-black"
              placeholder="Type your email"
            />
          </div>
          <div className=" w-full max-w-sm gap-2 flex flex-col text-white">
            <Label className="dark:text-white text-black" htmlFor="name">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              className="bg-white dark:text-white text-black"
              placeholder="Type your name"
            />
          </div>
          <div className=" w-full max-w-sm gap-2 flex flex-col text-white">
            <Label className="dark:text-white text-black" htmlFor="subject">
              Subject
            </Label>
            <Input
              type="text"
              id="subject"
              name="title"
              className="bg-white dark:text-white text-black"
              placeholder="Type your subject"
            />
          </div>
          <div className="w-full max-w-sm gap-2 flex flex-col text-white">
            <Label className="dark:text-white text-black" htmlFor="message">
              Message
            </Label>
            <Textarea
              id="name"
              name="message"
              className="bg-white dark:text-white text-black"
              placeholder="Type your message"
              rows={4}
            />
            <p className="text-sm text-muted-foreground">
              Your message will be send to my email.
            </p>
          </div>
            <Button
            type="submit"
            className={cn("w-full max-w-sm cursor-pointer flex items-center justify-center")}
            disabled={loading}
            >
            {loading ? (
              <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                ></circle>
                <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Sending...
              </>
            ) : (
              "Send"
            )}
            </Button>

          <div className="flex items-center gap-2 max-w-sm w-full">
            <hr className="flex-grow border-gray-400" />
            <span className="text-center text-gray-400">or</span>
            <hr className="flex-grow border-gray-400" />
          </div>

          <div className="grid grid-cols-2 gap-4 md:flex md:flex-row max-w-sm w-full items-center md:ustify-between">
            <Link
              href="https://wa.me/+6285161610522"
              target="_blank"
              className="flex flex-row items-center gap-1 dark:text-white"
            >
              <Icon icon="logos:whatsapp-icon" />{" "}
              <p className="text-xs">+6285161610522 </p>
            </Link>
            <Link
              href="https://www.instagram.com/dhodols/"
              target="_blank"
              className="flex flex-row items-center gap-1 dark:text-white"
            >
              <Icon icon="skill-icons:instagram" />{" "}
              <p className="text-xs">@dhodols </p>
            </Link>
            <Link
              href="mailto:ridhodimas70@gmail.com"
              target="_blank"
              className="flex flex-row items-center gap-1 dark:text-white"
            >
              <Icon icon="skill-icons:gmail-light" />{" "}
              <p className="text-xs">ridhodimas70@gmail.com</p>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
