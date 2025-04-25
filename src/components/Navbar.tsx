"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navigationMenuConfig } from "@/configs/app.config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

interface UserDropdownProps {
  title: string;
  icon: string;
  href: string;
}

const userDropdownItems: UserDropdownProps[] = [
  {
    title: "Profile",
    icon: "mdi:account",
    href: "/profile",
  },
  {
    title: "History Forum",
    icon: "mdi:history",
    href: "/history-forum",
  },
];

export default function Navbar() {
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

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

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href);
  };

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
            : "border-b-transparent absolute z-10"
        )}
      >
        <div className="flex items-center justify-between ">
          <div className="flex flex-row items-center justify-between w-full">
            {/* Company Logo */}
            <Link href="/" className="flex items-center shrink-0 gap-1 text-white font-bold">
              <Icon
                icon="bxs:smile"
                width="24"
                height="24"
                className="text-orange-300"
              />{" "}
              Dhodols
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  {navigationMenuConfig?.items?.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink
                        href={item.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "text-white rounded-none relative group after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 bg-transparent hover:bg-transparent",
                          isActive(item.href)
                            ? "font-semibold after:w-full"
                            : "after:w-0 hover:after:w-full"
                        )}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
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
              {/* Mobile Menu Header */}
              {/* <div className="p-6 border-b flex items-center justify-between">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMobileMenu}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div> */}

              {/* Mobile Menu Content */}
              <div className="flex-1 overflow-auto">
                <div className="p-6">
                  <div className="flex flex-col space-y-6">
                    {navigationMenuConfig?.items?.map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * index }}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            "text-base font-normal transition-colors relative group",
                            "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300",
                            isActive(item.href)
                              ? "text-primary font-medium after:w-full"
                              : "hover:text-primary after:w-0 hover:after:w-full"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      </motion.div>
                    ))}
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
                <motion.div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon icon={"mdi:chevron-down"} className="w-5 h-5" />
                  </motion.div>
                </motion.div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 flex flex-col gap-2">
                        {userDropdownItems.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Icon icon={item.icon} className="w-5 h-5" />
                            <span className="text-xs font-normal">
                              {item.title}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
    </>
  );
}
