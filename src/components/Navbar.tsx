"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navigationMenuConfig } from "@/configs/app.config";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
// import { Icon } from "@iconify/react/dist/iconify.js";
import { Switch } from "./ui/switch";
import { useTheme } from "@/context/themeContext";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AboutDialog from "./AboutDialog";

export default function Navbar() {
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      if (window.scrollY > 0) {
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
        rootMargin: "-50% 0px -50% 0px", // supaya trigger saat section berada di tengah viewport
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

  // Click outside handler
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

  return (
    <>
      <nav
        className={cn(
          "backdrop-blur-md p-6 border-b transition-all duration-300 bg-transparent lg:px-24 w-full",
          isScrolled
            ? "fixed top-0 left-0 right-0 z-50 bg-background/10 border-b-border shadow-md animate-in slide-in-from-top duration-300"
            : "border-b-transparent absolute z-20",
          pathname.startsWith('/cms') && "hidden"
        )}
      >
        <div className="flex items-center justify-between ">
          <div className="flex flex-row items-center justify-between w-full">
            <Link
              href="/"
              className="flex items-center shrink-0 gap-1 dark:text-white font-bold"
            >
              <Image
                src={theme === 'dark' ? "/logo/logo-light.png" : "/logo/logo-dark.png"}
                alt="ridho diams"
                height={50}
                width={50}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  {pathname !== "/" ? (
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/"
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "text-white rounded-none relative group bg-transparent hover:bg-transparent cursor-pointer"
                          )}
                        >
                          &larr; Back
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
                            "dark:text-white rounded-none relative group after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 bg-transparent hover:bg-transparent cursor-pointer",
                            isActive(item.id)
                              ? "font-semibold after:w-full"
                              : "after:w-0 hover:after:w-full"
                          )}
                        >
                          {item.title}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="dark-mode"
                  checked={theme === "light"}
                  onCheckedChange={toggleTheme}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            ref={menuButtonRef}
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Separate from the header */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 bg-background/50 backdrop-blur-md z-50 top-20 m-2 rounded-xl h-fit"
            style={{
              boxShadow:
                "0 0 10px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="flex flex-col gap-4">
              {/* Mobile Menu Content */}
              <div className="flex-1 overflow-auto">
                <div className="p-6">
                  <div className="flex flex-col space-y-6">
                    {pathname !== "/" ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                      >
                        <Link
                          href={"/"}
                          className={cn(
                            "text-base font-normal transition-colors relative group",
                            "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300"
                          )}
                        >
                          Back to Home
                        </Link>
                      </motion.div>
                    ) : (
                      navigationMenuConfig?.items?.map((item, index) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * index }}
                        >
                          <p
                            onClick={
                              item.id === "about"
                                ? () => setDialogOpen(true)
                                : () => handleClick(item.id)
                            }
                            className={cn(
                              "text-base font-normal transition-colors relative group",
                              "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300",
                              isActive(item.id)
                                ? "text-primary font-medium after:w-full"
                                : "hover:text-primary after:w-0 hover:after:w-full"
                            )}
                          >
                            {item.title}
                          </p>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Menu Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="p-6 border-t"
              >
                <motion.div className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <Switch
                        id="dark-mode"
                        checked={theme === "light"}
                        onCheckedChange={toggleTheme}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add overlay to catch clicks outside the menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <AboutDialog onClose={setDialogOpen} open={isDialogOpen} />
    </>
  );
}
