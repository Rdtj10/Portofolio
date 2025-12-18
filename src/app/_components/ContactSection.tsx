"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import sendEmail from "@/server/email-js/sendEmail";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "react-toastify";
gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    href: "https://wa.me/+6285161610522",
    icon: "logos:whatsapp-icon",
    label: "+6285161610522",
  },
  {
    href: "https://www.instagram.com/dhodols/",
    icon: "skill-icons:instagram",
    label: "@dhodols",
  },
  {
    href: "mailto:ridhodimas70@gmail.com",
    icon: "logos:google-gmail",
    label: "ridhodimas70@gmail.com",
  },
];

export default function ContactSection() {
  const form = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef(null);
  const contextRef = useRef<gsap.Context | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current) {
      setLoading(true);
      try {
        await sendEmail(form.current);
        toast.success("Message sent successfully!");
        form.current.reset();
      } catch (error) {
        toast.error("Failed to send message: " + error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.revert();
    }

    contextRef.current = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(
        ".contact-image-wrapper",
        {
          x: -100,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        0
      );

      tl.from(
        ".contact-form-content",
        {
          x: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        0
      );
      gsap.to(".contact-image", {
        y: 20,
        duration: 3,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => {
      contextRef.current?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col md:flex-row dark:bg-[#1A1A2E] bg-[#F4F4F9] px-6 lg:px-24 pt-16 md:pt-28 pb-16 min-h-[80vh] items-center transition-all duration-500"
      id="contact"
    >
      <div className="hidden md:flex relative w-full md:w-1/2 justify-center items-center h-full contact-image-wrapper">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-0 bg-[#A78BFA]/20 dark:bg-[#4F46E5]/10 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] transform rotate-12 transition-all duration-1000"></div>
          <Image
            src="/right.png"
            alt="Ridho Dimas Pointing"
            width={700}
            height={700}
            priority
            className="w-full relative z-10 drop-shadow-2xl contact-image" // Class untuk animasi GSAP
          />
        </div>
      </div>

      <div className="flex flex-col w-full md:w-1/2 py-8 gap-6 md:gap-10 justify-center items-center contact-form-content">
        <div className="text-center max-w-sm">
          <h1 className="text-4xl dark:text-yellow-300 text-yellow-600 font-extrabold tracking-tight">
            Let&apos;s Connect! 🤝
          </h1>
          <p className="mt-2 text-base dark:text-gray-300 text-gray-600">
            Whether it&apos;s a job opportunity, a collaboration idea, or just
            feedback, I&apos;m ready to hear from you.
          </p>
        </div>

        <form
          ref={form}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full justify-center items-center"
        >
          <div className="w-full max-w-md flex flex-col gap-4">
            <div className="gap-2 flex flex-col">
              <Label className="dark:text-white text-gray-800" htmlFor="email">
                Email
              </Label>
              <Input
                required
                type="email"
                id="email"
                name="email"
                className="bg-white dark:bg-[#202033] dark:text-white border-gray-300 dark:border-gray-700 focus:border-[#A78BFA]"
                placeholder="Your professional email address"
              />
            </div>
            <div className="gap-2 flex flex-col">
              <Label className="dark:text-white text-gray-800" htmlFor="name">
                Name
              </Label>
              <Input
                required
                type="text"
                id="name"
                name="name"
                className="bg-white dark:bg-[#202033] dark:text-white border-gray-300 dark:border-gray-700 focus:border-[#A78BFA]"
                placeholder="Your full name"
              />
            </div>
            <div className="gap-2 flex flex-col">
              <Label
                className="dark:text-white text-gray-800"
                htmlFor="subject"
              >
                Subject
              </Label>
              <Input
                type="text"
                id="subject"
                name="title"
                className="bg-white dark:bg-[#202033] dark:text-white border-gray-300 dark:border-gray-700 focus:border-[#A78BFA]"
                placeholder="Project inquiry, feedback, or collaboration"
              />
            </div>
            <div className="gap-2 flex flex-col">
              <Label
                className="dark:text-white text-gray-800"
                htmlFor="message"
              >
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                className="bg-white dark:bg-[#202033] dark:text-white border-gray-300 dark:border-gray-700 focus:border-[#A78BFA]"
                placeholder="Write your detailed message here..."
                rows={5}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Your message will be securely sent directly to my professional
                inbox.
              </p>
            </div>
          </div>
          <Button
            type="submit"
            disabled={loading}
            variant={"outline"}
            className="cursor-pointer group/btn w-full relative inline-flex items-center justify-center h-10 px-4 text-sm font-medium rounded-lg overflow-hidden transition-all duration-300 text-yellow-600 dark:text-yellow-300 border-2 border-yellow-600 dark:border-yellow-300 hover:text-white dark:hover:text-white"
          >
            {loading ? (
              "Sending..."
            ) : (
              <>
                <span className="relative z-10">
                  <Icon icon="lucide:external-link" className="inline mr-2" />
                  Send Message
                </span>
                <span className="absolute inset-0 bg-yellow-600 dark:bg-yellow-300 transform -translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-0"></span>
              </>
            )}
          </Button>

          {/* Social Links Divider */}
          <div className="flex items-center gap-2 max-w-md w-full my-2">
            <hr className="flex-grow border-gray-300 dark:border-gray-700" />
            <span className="text-center text-gray-500 dark:text-gray-400 text-sm">
              or reach me via
            </span>
            <hr className="flex-grow border-gray-300 dark:border-gray-700" />
          </div>

          {/* Social Links (Clean Row) */}
          <div className="flex flex-wrap gap-4 justify-center w-full max-w-md">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                className="flex items-center gap-2 text-sm dark:text-gray-300 text-gray-700 hover:text-[#4F46E5] dark:hover:text-[#A78BFA] transition-colors duration-300"
              >
                <Icon icon={link.icon} className="h-5 w-5" /> {link.label}
              </Link>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
}
