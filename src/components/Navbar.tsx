"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { navigationMenuConfig } from "@/configs/app.config";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Switch } from "./ui/switch";
import { useTheme } from "@/context/themeContext";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import AboutDialog from "./AboutDialog";
import AuthDialog from "./AuthDialog";
import { toast } from "react-toastify";

export default function Navbar() {
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isQuestOpen, setQuestOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const { theme, toggleTheme } = useTheme();

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const sectionIds = navigationMenuConfig?.items?.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0.1,
      }
    );

    sectionIds?.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionIds?.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  const isActive = (id: string) => activeSection === id;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("unauthorized") === "true") {
      toast.error("Whoops! Only authorized spirits can pass through here 🌿");
    }
  }, [searchParams]);

  return (
    <>
      <nav
        className={cn(
          "transition-all duration-700 w-full lg:px-24 p-6",
          isScrolled
            ? "fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-border/30 shadow-2xl py-4"
            : "absolute z-20 border-b border-transparent py-8",
          pathname.startsWith("/cms") && "hidden"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex items-center gap-12">
              <Link
                href="/"
                className="flex items-center shrink-0 gap-1 font-bold group"
              >
                <div className="relative overflow-hidden p-1">
                  <Image
                    src={
                      theme === "dark"
                        ? "/logo/logo-light.png"
                        : "/logo/logo-dark.png"
                    }
                    alt="ridho dimas"
                    height={45}
                    width={45}
                    className="group-hover:rotate-12 transition-transform duration-500 scale-110"
                  />
                </div>
              </Link>

              {/* Status Indicator (Desktop) */}
              <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-primary/5 rounded-full border border-primary/10">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 italic font-serif">
                  Current Status:{" "}
                  <span className="text-primary">Nurturing Labskill V2</span>
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList className="gap-4">
                  {pathname !== "/" ? (
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/"
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "text-foreground/60 rounded-xl relative group bg-transparent hover:bg-primary/5 cursor-pointer font-serif italic text-lg flex items-center gap-2"
                          )}
                        >
                          <Icon icon="lucide:undo-2" />
                          Return to Meadow
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ) : (
                    navigationMenuConfig?.items?.map((item) => (
                      <NavigationMenuItem key={item.title}>
                        <NavigationMenuLink
                          onClick={
                            item.id === "about"
                              ? () => setDialogOpen(true)
                              : () => handleClick(item.id)
                          }
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "text-foreground/50 rounded-xl relative group bg-transparent hover:bg-primary/5 cursor-pointer font-black uppercase tracking-[0.3em] text-[10px] transition-all py-6 px-6",
                            isActive(item.id)
                              ? "text-primary bg-primary/5"
                              : "hover:text-primary"
                          )}
                        >
                          <span className="relative z-10">{item.title}</span>
                          {isActive(item.id) && (
                            <motion.div
                              layoutId="active-pill"
                              className="absolute inset-0 bg-primary/10 rounded-xl -z-10 shadow-sm"
                              transition={{
                                type: "spring",
                                bounce: 0.3,
                                duration: 0.6,
                              }}
                            />
                          )}
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary group-hover:w-1/2 transition-all" />
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="hidden md:flex items-center gap-10">
              <div className="flex items-center gap-3 px-3 py-1.5 paper-card bg-white/40 border-white/60">
                <Icon icon="lucide:sun" className="text-secondary text-lg" />
                <Switch
                  id="dark-mode"
                  checked={theme === "light"}
                  onCheckedChange={toggleTheme}
                  className="cursor-pointer"
                />
                <Icon icon="lucide:moon" className="text-primary text-sm" />
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="relative group cursor-pointer p-4 paper-card bg-accent/10 hover:bg-accent transition-all duration-500 hover:text-accent-foreground border-accent/20"
                    onClick={() => setQuestOpen(true)}
                  >
                    <Icon
                      icon="lucide:sparkles"
                      width="24"
                      height="24"
                      className="group-hover:rotate-180 transition-transform duration-700"
                    />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-primary border-primary/20 font-serif italic p-4 shadow-xl">
                  <div className="flex flex-col gap-1">
                    <p className="font-black uppercase tracking-widest text-[10px]">
                      Alchemist&apos;s Key
                    </p>
                    <p className="text-xs">
                      Unlock the workshop&apos;s hidden chambers.
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            ref={menuButtonRef}
            variant="ghost"
            size="icon"
            className="md:hidden text-primary p-2 h-12 w-12"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu className="h-8 w-8" />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-x-4 top-24 z-50 p-10 paper-card bg-white/95 backdrop-blur-2xl border-primary/20 h-fit shadow-2xl"
          >
            <div className="flex flex-col gap-10">
              <div className="flex flex-col space-y-6">
                {pathname !== "/" ? (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <Link
                      href={"/"}
                      className="text-2xl font-serif italic text-primary flex items-center gap-3"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon icon="lucide:undo-2" />
                      Return to Meadow
                    </Link>
                  </motion.div>
                ) : (
                  navigationMenuConfig?.items?.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <p
                        onClick={() => {
                          if (item.id === "about") setDialogOpen(true);
                          else handleClick(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={cn(
                          "text-xl font-black uppercase tracking-[0.4em] transition-all py-2",
                          isActive(item.id)
                            ? "text-primary border-l-8 border-primary pl-6"
                            : "text-foreground/30 hover:text-primary hover:pl-6"
                        )}
                      >
                        {item.title}
                      </p>
                    </motion.div>
                  ))
                )}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-10 border-t border-border/30"
              >
                <div className="flex flex-col gap-8">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 font-serif italic">
                        Solar Mode
                      </span>
                    </div>
                    <div className="flex items-center gap-6 p-2 paper-card bg-white/40">
                      <Icon
                        icon="lucide:sun"
                        className="text-secondary text-xl"
                      />
                      <Switch
                        id="dark-mode-mobile"
                        checked={theme === "light"}
                        onCheckedChange={toggleTheme}
                        className="cursor-pointer"
                      />
                      <Icon
                        icon="lucide:moon"
                        className="text-primary text-lg"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                    <Icon
                      icon="lucide:info"
                      className="text-primary text-2xl"
                    />
                    <span className="text-xs text-foreground/50 font-serif italic">
                      &quot;Each line of code is a petal in the garden of
                      invention.&quot;
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-background/40 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <AboutDialog onClose={setDialogOpen} open={isDialogOpen} />
      <AuthDialog onClose={setQuestOpen} open={isQuestOpen} />
    </>
  );
}
