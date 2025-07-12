"use client";
import SocialLinks from "../components/SocialLinks";

export default function SocialsPage() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-black text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">Connect with Me</h1>
      <SocialLinks />
    </main>
  );
} 