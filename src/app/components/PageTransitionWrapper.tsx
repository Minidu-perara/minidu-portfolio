"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function PageTransitionWrapper({ children }: Props) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ minHeight: "100vh" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
