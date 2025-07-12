"use client";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-2 md:px-4">
      <Navbar />
      <section className="w-full max-w-xl mt-16 flex flex-col gap-8 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-6">Contact</h1>
        <form
          className="flex flex-col gap-4 bg-white/5 rounded-xl p-6 shadow-lg border border-white/10"
          onSubmit={e => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="bg-black/60 border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="bg-black/60 border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <textarea
            placeholder="Your Message"
            className="bg-black/60 border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            rows={5}
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded transition"
          >
            Send
          </button>
        </form>
        {submitted && (
          <div className="text-green-400 text-center mt-2">Thank you! Your message was submitted (demo only).</div>
        )}
        <div className="text-center text-gray-400 mt-4">
          Or email me directly: <a href="mailto:miniduthiranjayaiso@gmail.com" className="text-indigo-300 underline">miniduthiranjayaiso@gmail.com</a>
        </div>
      </section>
    </main>
  );
} 