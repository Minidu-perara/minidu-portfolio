"use client";
import Navbar from "./components/Navbar";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-black text-white px-2 md:px-4">
      <Navbar />
      <div className="flex flex-1 items-center justify-center z-10 relative">
        <section className="w-full max-w-2xl flex flex-col items-center justify-center flex-grow gap-5 md:gap-5 animate-fadeIn mt-20 md:mt-32">
          <motion.h1
            className="text-5xl md:text-8xl font-extrabold text-center tracking-tight drop-shadow-lg cursor-pointer transition-colors duration-300"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            whileHover={{ color: '#a5b4fc', scale: 1.04, fontWeight: 900 }}
          >
            Welcome
          </motion.h1>
          <p className="text-lg md:text-2xl text-center text-gray-300 font-light animate-fadeIn animate-slideInUp delay-100">
            Building beautiful web experiences.
          </p>
          <p className="text-sm md:text-base text-center text-gray-500 font-light animate-fadeIn animate-slideInUp delay-200">
            By Minidu Perera
          </p>
        </section>
      </div>
    </main>
  );
}
