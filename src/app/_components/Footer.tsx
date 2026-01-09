import { url } from "@/const/url";
import { Icon } from "@iconify/react/dist/iconify.js";

const Footer = () => {
  return (
    <footer className="w-full pt-32 pb-16 px-6 lg:px-24 bg-background relative overflow-hidden">
      {/* Decorative Atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 right-[10%] w-[30rem] h-[30rem] bg-primary/5 blur-[100px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Brand & Creed */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-8 text-center xl:text-left">
            <div className="flex flex-col gap-2">
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter font-serif leading-none">
                Ridho Dimas<span className="text-primary italic">.</span>
              </h3>
              <p className="text-xs text-foreground/30 font-black uppercase tracking-[0.4em] italic leading-relaxed">
                A Weaver of Digital Meadows & Architect of Serene Experiences.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-foreground/50 leading-relaxed font-serif italic max-w-2xl mx-auto xl:mx-0 pr-0 xl:pr-12">
              &quot;We don&apos;t just build software; we plant gardens where
              humans can thrive. May your journey through the technical
              wilderness be filled with wonder and light.&quot;
            </p>
          </div>

          {/* Right: Quick Channels */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-8 items-center xl:items-end">
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground/20">
              Find our Workshop
            </h4>
            <div className="flex items-center gap-6">
              {[
                {
                  href: url.github,
                  icon: "lucide:github",
                  label: "Ancient Scrolls",
                },
                {
                  href: url.linkedin,
                  icon: "lucide:linkedin",
                  label: "Professional Echo",
                },
                {
                  href: "mailto:ridhodimas70@gmail.com",
                  icon: "lucide:mail",
                  label: "Post Box",
                },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 bg-white/40 border border-white/60 rounded-[1.2rem] flex items-center justify-center text-foreground/40 hover:text-primary hover:bg-white hover:scale-110 active:scale-95 transition-all shadow-sm group relative"
                  title={link.label}
                >
                  <Icon
                    icon={link.icon}
                    className="text-3xl transition-transform"
                  />
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[8px] font-black uppercase tracking-widest text-primary">
                    {link.label}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 text-foreground/30">
            <Icon icon="lucide:feather" className="text-2xl animate-float" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">
              © {new Date().getFullYear()} Ridho Dimas. Crafted with wonder &
              wood.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500/40 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-foreground/20">
                The forge is live
              </span>
            </div>
            <div className="w-[1px] h-4 bg-border/40" />
            <span className="text-[9px] font-black uppercase tracking-widest text-foreground/20 italic font-serif">
              &quot;To live is to build, to build is to love.&quot;
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
