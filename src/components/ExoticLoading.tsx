"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/themeContext";

type ExoticLoadingProps = {
  loading: boolean;
};

const ExoticLoading = ({loading} : ExoticLoadingProps) => {
  const { theme } = useTheme();

  const backgroundGradient =
    theme === "dark"
      ? "bg-gradient-to-br from-[#22232F] via-[#2D2F3C] to-[#3A3C4D]"
      : "bg-gradient-to-br from-[#F0F0F5] via-[#D9D9E5] to-[#C8C8D5]";
        
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="exotic-loading"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`fixed inset-0 z-[9999] flex items-center justify-center ${backgroundGradient}`}
        >
          <motion.div
            className="w-32 h-32 border-8 border-dashed rounded-full dark:border-white border-black"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
              borderRadius: ["50%", "20%", "50%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExoticLoading;
