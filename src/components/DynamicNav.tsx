"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DynamicNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className={`z-10 fixed top-4 left-1/2 transform -translate-x-1/2 text-white rounded-full shadow-lg h-10 ${isOpen ? `backdrop-blur-md bg-black/40` : `bg-black`}`}
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
      onHoverStart={() => setIsOpen(true)}
      onHoverEnd={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <motion.div
        className="px-4 py-2 cursor-pointer"
        initial={{ width: "200px" }}
        animate={{ width: isOpen ? "300px" : "200px" }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="flex items-center space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer"
              >
                Home
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer"
              >
                About
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer"
              >
                Projects
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer"
              >
                Contact
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default DynamicNav;