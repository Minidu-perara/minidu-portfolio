"use client";
import Navbar from "./components/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import SocialLinks from "./components/SocialLinks";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col text-white px-2 md:px-8 relative bg-transparent">
      <Navbar />
      {/* MinimalParticles always behind all content */}
      <div className="flex flex-1 flex-col items-center justify-center min-h-[60vh] md:min-h-[70vh]">
        <section className="w-full max-w-2xl flex flex-col items-center justify-center flex-grow gap-3 md:gap-4 animate-fadeIn py-6 md:py-10">
          <div className="relative group mb-2">
            <Image
              src="/profile-placeholder.jpg"
              alt="Profile picture"
              width={150}
              height={150}
              className="rounded-full shadow-xl object-cover transition-transform duration-200 group-hover:scale-105"
              style={{ boxShadow: '0 4px 32px 0 rgba(165,180,252,0.18)' }}
              priority
            />
          </div>
          <motion.h1
            className="text-4xl md:text-7xl font-extrabold text-center tracking-tight drop-shadow-lg cursor-pointer transition-colors duration-300"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            whileHover={{ color: '#a5b4fc', scale: 1.04, fontWeight: 900 }}
          >
            Minidu Perera
          </motion.h1>
          <p className="text-xl md:text-3xl text-center font-semibold bg-gradient-to-r from-indigo-300 via-pink-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg animate-fadeIn animate-slideInUp delay-100" style={{ WebkitTextStroke: '0.5px rgba(255,255,255,0.10)' }}>
            Welcome to my space in the internet.
          </p>
          <div className="mt-6 animate-fadeIn animate-slideInUp delay-300">
            <SocialLinks />
          </div>
          <a href="mailto:miniduthiranjayaiso@gmail.com" className="mt-2 text-sm text-indigo-200 hover:underline bg-white/5 px-5 py-1.5 rounded-full transition-all duration-150 select-all cursor-pointer shadow-md border border-indigo-400/10 focus:outline-none focus:ring-2 focus:ring-indigo-400 animate-fadeIn animate-slideInUp delay-350 hover:bg-indigo-500/10 hover:text-white focus:bg-indigo-600/20 focus:text-white" style={{ WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)' }}>
            miniduthiranjayaiso@gmail.com
          </a>
          <span className="text-xs text-gray-500 mt-2 animate-fadeIn animate-slideInUp delay-400">Based in Sri Lanka</span>
        </section>
      </div>
      {/* About Me Section moved further down, summary only, appears after scrolling */}
      <section className="w-full flex flex-col items-center mt-20 mb-4">
        <motion.div
          className="bg-white/5 rounded-full px-8 py-4 border border-indigo-400/10 shadow-md backdrop-blur-md text-center mx-auto max-w-xl text-sm text-indigo-100 font-normal"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)' }}
        >
          <span className="block text-base font-bold mb-2 text-indigo-200">About Me</span>
          <span className="block text-indigo-100">
            Software developer passionate about leveraging technology to solve real-world problems. Thrive in collaborative team environments and known for quickly mastering complex systems. Consistently deliver high-quality solutions through a commitment to continuous learning, curiosity, and technical excellence.
          </span>
        </motion.div>
      </section>
    </main>
  );
}
