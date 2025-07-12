"use client";
import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-2 md:px-4">
      <Navbar />
      <section className="w-full max-w-2xl mt-16 flex flex-col gap-8 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-6">About</h1>
        <div className="bg-white/5 rounded-xl p-6 shadow-lg border border-white/10">
          <h2 className="text-2xl font-bold mb-2 text-indigo-200">Minidu Perera</h2>
          <p className="text-gray-200 mb-4">
            I’m a final-year undergraduate in Information Technology at the Sri Lanka Institute of Information Technology (SLIIT), with a strong interest in designing systems, solving real-world problems, and continuously learning new technologies.
          </p>
          <div className="mb-2">
            <span className="font-semibold text-pink-200">Education:</span> <br />
            <span className="text-gray-300">BSc (Hons) in Information Technology, SLIIT | 2021 - Present</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-pink-200">Contact:</span>
            <ul className="text-gray-300 list-none ml-0">
              <li>Address: 102/2, Samagi Mawatha, Godagama, Homagama</li>
              <li>Phone: 0773319179</li>
              <li>Email: miniduthiranjayaiso@gmail.com</li>
            </ul>
          </div>
        </div>
        {/* SysEnact Core Banking Internship Section */}
        <div className="bg-white/5 rounded-xl p-0 shadow-lg border border-white/10 mt-8 flex flex-col items-center overflow-hidden">
          <img
            src="/sysenact-group-placeholder.jpg"
            alt="SysEnact staff and coworkers group photo placeholder"
            className="w-full max-w-2xl rounded-t-xl shadow-none border-b border-gray-700 object-cover mb-0"
          />
          <div className="w-full p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2 text-indigo-200 text-center">Core Banking Developer Intern @ SysEnact Consulting (PVT)</h2>
            <div className="text-sm text-gray-400 mb-3 text-center">Nov 2023 - May 2024</div>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 max-w-xl mx-auto text-left">
              <li>Built and maintained Enquiry and Version modules in Temenos for SMIB and DFCC banks</li>
              <li>Worked with business analysts to implement banking logic and streamline processes</li>
              <li>Optimized Java/InfoBasic routines, improving system speed and reducing errors</li>
              <li>Supported live systems, resolving production issues to ensure uptime</li>
              <li>Contributed to loan disbursement automation and reporting tools for bank officers</li>
            </ul>
            <span className="text-gray-400 text-xs mt-4">SysEnact staff & coworkers (replace with real photo)</span>
          </div>
        </div>
      </section>
    </main>
  );
} 