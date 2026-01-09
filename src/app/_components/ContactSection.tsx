"use client";

import { useRef, useState, useEffect } from "react";
import sendEmail from "@/server/email-js/sendEmail";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const socialLinks = [
  {
    href: "https://wa.me/+6285161610522",
    icon: "logos:whatsapp-icon",
    label: "Messenger Bird",
    desc: "A swift messenger for urgent ripples.",
  },
  {
    href: "https://www.instagram.com/dhodols/",
    icon: "skill-icons:instagram",
    label: "Magic Lantern",
    desc: "Visual echoes of our daily journey.",
  },
  {
    href: "mailto:ridhodimas70@gmail.com",
    icon: "logos:google-gmail",
    label: "Post Box",
    desc: "Formal scrolls and collaborative seeds.",
  },
];

const BackgroundAtmosphere = () => (
  <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
    <div className="absolute top-[20%] right-[-10%] w-[50rem] h-[50rem] bg-accent/5 blur-[130px] rounded-full animate-float" />
    <div className="absolute bottom-[10%] left-[-10%] w-[40rem] h-[40rem] bg-secondary/5 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />

    {/* Floating Seeds/Light */}
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 bg-primary/20 rounded-full"
        initial={{ y: "110%", x: `${Math.random() * 100}%` }}
        animate={{
          y: "-10%",
          x: `${Math.random() * 100 + (i % 2 === 0 ? 15 : -15)}%`,
        }}
        transition={{
          duration: 15 + Math.random() * 15,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 10,
        }}
      />
    ))}
  </div>
);

export default function ContactSection() {
  const [mounted, setMounted] = useState(false);
  const form = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current) {
      setLoading(true);
      try {
        await sendEmail(form.current);
        toast.success("Your message is taking flight!");
        form.current.reset();
      } catch (error) {
        toast.error("Oh no, something went wrong: " + error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power3.out",
        clearProps: "opacity,transform",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-40 px-6 lg:px-24 flex flex-col items-center overflow-hidden bg-background"
      id="contact"
    >
      {mounted && (
        <>
          <BackgroundAtmosphere />

          <div className="contact-reveal flex flex-col items-center text-center gap-6 max-w-4xl mb-24">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-16 bg-primary/30" />
              <h2 className="text-sm font-black uppercase tracking-[0.5em] text-primary">
                Send a Message
              </h2>
              <div className="h-[2px] w-16 bg-primary/30" />
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter font-serif leading-none">
              Planting <span className="ghibli-text-gradient">Seeds</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/60 font-medium italic max-w-2xl">
              &quot;The best time to plant a tree was 20 years ago. The second
              best time is today. Let&apos;s start something wonderful.&quot;
            </p>
          </div>

          <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-24 items-start relative">
            {/* Left: Contact Info */}
            <div className="contact-reveal flex flex-col gap-14 order-2 lg:order-none">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <h3 className="text-4xl font-black tracking-tight font-serif italic">
                    Direct Channels
                  </h3>
                  <div className="h-[2px] w-24 bg-primary/20" />
                </div>

                <div className="flex flex-col gap-8">
                  {socialLinks.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      target="_blank"
                      className="flex items-center gap-10 p-10 paper-card group hover:bg-white transition-all bg-white/60 backdrop-blur-md shadow-xl border-white/20"
                    >
                      <div className="p-6 bg-white rounded-[1.5rem] group-hover:scale-110 transition-transform shadow-inner text-primary">
                        <Icon icon={link.icon} className="text-5xl" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h4 className="text-2xl font-black text-foreground/80 group-hover:text-primary transition-colors font-serif">
                          {link.label}
                        </h4>
                        <p className="text-base text-foreground/40 font-medium italic">
                          {link.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="p-12 paper-card bg-primary/5 border-primary/20 relative overflow-hidden group">
                <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <h4 className="font-black text-xl flex items-center gap-4 mb-6 font-serif text-primary">
                  <Icon
                    icon="lucide:clock-4"
                    className="text-3xl animate-spin-slow"
                  />
                  Workshop Rhythm
                </h4>
                <p className="text-xl text-foreground/70 leading-relaxed font-serif italic border-l-8 border-primary/20 pl-8">
                  Our forge remains active during the sunlight hours (Mon-Fri).
                  While messages are welcome any time, scrolls are typically
                  answered within one sun cycle.
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="contact-reveal p-1">
              <div className="paper-card p-10 md:p-20 bg-white/60 backdrop-blur-xl relative overflow-hidden shadow-2xl skew-y-1">
                <div className="absolute top-10 right-10 opacity-5 pointer-events-none">
                  <Icon
                    icon="lucide:scroll"
                    className="text-[15rem] -rotate-12"
                  />
                </div>

                <form
                  ref={form}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-10 relative z-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex flex-col gap-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 ml-6 font-serif italic">
                        How should we call you?
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        placeholder="A curious traveler"
                        className="px-10 py-6 bg-white/40 rounded-[2rem] border-2 border-border/20 focus:border-primary/40 outline-none transition-all text-sm font-black uppercase tracking-[0.3em] placeholder:text-foreground/20 shadow-inner"
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 ml-6 font-serif italic">
                        Where to send back?
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="messenger@wild.com"
                        className="px-10 py-6 bg-white/40 rounded-[2rem] border-2 border-border/20 focus:border-primary/40 outline-none transition-all text-sm font-black uppercase tracking-[0.3em] placeholder:text-foreground/20 shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 ml-6 font-serif italic">
                      Reason for the scroll
                    </label>
                    <input
                      required
                      type="text"
                      name="title"
                      placeholder="A new adventure begins..."
                      className="px-10 py-6 bg-white/40 rounded-[2rem] border-2 border-border/20 focus:border-primary/40 outline-none transition-all text-sm font-black uppercase tracking-[0.3em] placeholder:text-foreground/20 shadow-inner"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 ml-6 font-serif italic">
                      Tell us your story
                    </label>
                    <textarea
                      required
                      name="message"
                      placeholder="Write your heart out here. Every word counts..."
                      rows={6}
                      className="px-10 py-8 bg-white/40 rounded-[2.5rem] border-2 border-border/20 focus:border-primary/40 outline-none transition-all text-sm font-black uppercase tracking-[0.3em] placeholder:text-foreground/20 shadow-inner resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 px-12 py-8 bg-primary text-primary-foreground rounded-[2.5rem] font-black text-xs uppercase tracking-[0.5em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-6 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                    {loading ? (
                      <Icon
                        icon="lucide:loader-2"
                        className="animate-spin text-3xl"
                      />
                    ) : (
                      <>
                        <span className="relative z-10">
                          Send the Messenger
                        </span>
                        <Icon
                          icon="lucide:bird"
                          className="relative z-10 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-700 text-3xl"
                        />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Decorative Post Mark */}
          <div className="contact-reveal mt-32 flex flex-col items-center gap-6 opacity-30">
            <Icon
              icon="lucide:stamp"
              className="text-6xl text-primary animate-float"
            />
            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-primary">
              Certified Sincere
            </span>
          </div>
        </>
      )}
    </section>
  );
}
