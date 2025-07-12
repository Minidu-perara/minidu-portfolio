"use client";
import Navbar from "../components/Navbar";

const projects = [
  {
    title: "Fit Link – Fitness Social Platform",
    role: "Team Leader",
    stack: "Spring Boot, REST API, Full-Stack",
    description: [
      "Designed and deployed a scalable RESTful backend supporting post sharing and user profiles.",
      "Led full-stack development for social feed and interactive fitness community features."
    ]
  },
  {
    title: "Wedding Management System",
    role: "Team Leader",
    stack: "MERN Stack (MongoDB, Express, React, Node.js)",
    description: [
      "Directed a 7-member team to build a vendor booking and venue management platform.",
      "Delivered integrated client dashboards with booking workflows and real-time updates."
    ]
  },
  {
    title: "Smart Waste Management System",
    role: "Team Leader",
    stack: "IoT, Python, Embedded Systems",
    description: [
      "Engineered sensor-based hardware for bin monitoring with live web/mobile dashboards.",
      "Enabled real-time waste tracking to optimize collection routes and improve efficiency."
    ]
  },
  {
    title: "IoT Wearable Health Monitor",
    role: "Team Leader",
    stack: "IoT, scikit-learn, ML, Dashboard",
    description: [
      "Developed a wearable device for movement classification using machine learning models.",
      "Built a real-time dashboard to track key health metrics and activity data."
    ]
  },
  {
    title: "Temenos | Java | InfoBasic | Banking Systems Integration",
    role: "Core Banking Developer Intern",
    stack: "Temenos, Java, InfoBasic, Banking Systems",
    description: [
      "Built and maintained Enquiry and Version modules in Temenos for SMIB and DFCC banks.",
      "Worked with business analysts to implement banking logic and streamline processes.",
      "Optimized Java/InfoBasic routines, improving system speed and reducing errors.",
      "Supported live systems, resolving production issues to ensure uptime.",
      "Contributed to loan disbursement automation and reporting tools for bank officers."
    ]
  }
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-2 md:px-4">
      <Navbar />
      <section className="w-full max-w-3xl mt-16 flex flex-col gap-10 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-8">Projects</h1>
        {projects.map((proj, idx) => (
          <div key={idx} className="bg-white/5 rounded-xl p-6 shadow-lg border border-white/10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-indigo-200">{proj.title}</h2>
            <div className="mb-2 text-sm text-gray-400">{proj.role} &mdash; <span className="font-mono text-pink-200">{proj.stack}</span></div>
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              {proj.description.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
} 