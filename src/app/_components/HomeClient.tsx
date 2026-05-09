"use client";

import { AnimatePresence } from "framer-motion";
import Container from "./Container";

export default function HomeClient() {
  return (
    <AnimatePresence mode="wait">
      <Container />
    </AnimatePresence>
  );
}
