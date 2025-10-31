import { AnimatePresence } from "framer-motion";
import Container from "./_components/Container";

export default function Home() {
  return (
    <AnimatePresence mode="wait">
      <Container />
    </AnimatePresence>
  );
}
