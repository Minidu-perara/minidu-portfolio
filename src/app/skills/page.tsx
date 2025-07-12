"use client";
import Navbar from "../components/Navbar";

const skills = [
  {
    category: "Languages",
    items: ["JavaScript", "Java", "Python", "C++", "Kotlin", "InfoBasic"]
  },
  {
    category: "Web/Backend",
    items: ["MERN Stack", "Spring Boot", "REST APIs", "HTML/CSS"]
  },
  {
    category: "Databases",
    items: ["MongoDB", "Temenos internal DB", "SQL"]
  },
  {
    category: "Banking Systems",
    items: ["Temenos (Enquiry, Version, Java routines)"]
  },
  {
    category: "IoT/ML",
    items: ["Arduino", "Embedded Systems", "ML (scikit-learn)"]
  }
];

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-2 md:px-4">
      <Navbar />
      <section className="w-full max-w-2xl mt-16 flex flex-col gap-8 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-6">Skills</h1>
        <div className="bg-white/5 rounded-xl p-6 shadow-lg border border-white/10">
          {skills.map((skill, idx) => (
            <div key={idx} className="mb-4">
              <h2 className="text-xl font-semibold text-indigo-200 mb-1">{skill.category}</h2>
              <ul className="flex flex-wrap gap-3 text-gray-200">
                {skill.items.map((item, i) => (
                  <li key={i} className="bg-indigo-900/40 px-3 py-1 rounded-full text-sm border border-indigo-700/30">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
} 