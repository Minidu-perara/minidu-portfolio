"use client";
import { useRef, useEffect, useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";

const sections = [
  { id: "intro", label: "Introduction" },
  { id: "education", label: "Education" },
  { id: "work", label: "Work Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
];

const education = {
  degree: "BSc (Hons) in Information Technology",
  university: "Sri Lanka Institute of Information Technology (SLIIT)",
  years: "2021 - Present",
  description: "Completed curriculum covering software development, cloud technologies, quality assurance, and system design. Gained practical experience through academic and industry projects spanning web, mobile, and IoT applications, with a focus on building scalable, real-world solutions."
};

type SidebarGroup = {
  label: string;
  items: { id: string; label: string }[];
};

const sidebarGroups: SidebarGroup[] = [
  {
    label: "Portfolio",
    items: [
      { id: "intro", label: "Introduction" },
      { id: "education", label: "Education" },
      { id: "work", label: "Work Experience" },
      { id: "projects", label: "Projects" },
      { id: "skills", label: "Skills" },
    ],
  },
];

interface SidebarProps {
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
}

type ExpandedState = { [key: string]: boolean };



function Sidebar({ active, setActive }: SidebarProps) {
  const [expanded, setExpanded] = useState<ExpandedState>({ Portfolio: true });
  return (
    <nav className="hidden md:flex fixed top-20 left-0 h-[calc(100vh-5rem)] flex-col gap-4 w-64 px-4 py-8 border-r border-white/10 backdrop-blur-md bg-black/60 rounded-tr-2xl rounded-br-2xl shadow-2xl z-30 transition-all">
      {sidebarGroups.map(group => (
        <div key={group.label} className="mb-2">
          <button
            className="uppercase text-xs text-gray-500 mb-2 font-bold flex items-center gap-2 focus:outline-none"
            onClick={() => setExpanded(e => ({ ...e, [group.label]: !e[group.label] }))}
            aria-expanded={expanded[group.label]}
          >
            <span>{group.label}</span>
            <span className={`transition-transform duration-200 ${expanded[group.label] ? "rotate-90" : "rotate-0"}`}>▶</span>
          </button>
          <div className={`flex flex-col gap-1 pl-2 border-l border-white/10 transition-all duration-300 ${expanded[group.label] ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
            {group.items.map(sec => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className={`block pl-3 pr-2 py-1 border-l-2 transition font-normal text-left
                  ${active === sec.id
                    ? "border-indigo-400 text-indigo-400 font-bold bg-transparent"
                    : "border-transparent text-gray-200 hover:underline hover:text-indigo-300"
                  }`
                }
                onClick={() => setActive(sec.id)}
              >
                {sec.label}
              </a>
            ))}
          </div>
        </div>
      ))}
      <div className="border-b border-white/10 w-full mt-2" />
    </nav>
  );
}

export default function PortfolioPage() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(sections[0].id);
  const [showGroupModal, setShowGroupModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offsets = sectionRefs.current.map(ref => ref ? ref.getBoundingClientRect().top : Infinity);
      const activeIdx = offsets.findIndex(offset => offset > 40);
      setActive(
        activeIdx === -1 ? sections[sections.length - 1].id : sections[Math.max(0, activeIdx - 1)].id
      );
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="w-full min-h-screen relative">
        <Sidebar active={active} setActive={setActive} />
        <main className="ml-64 flex flex-col gap-24 px-4 md:px-16 py-16 md:py-24 min-h-screen bg-black/80 border-l border-white/10 z-10" style={{ position: 'relative' }}>
            <div id="intro" ref={el => { sectionRefs.current[0] = el; }} className="w-full max-w-4xl ml-0">
              <div className="flex flex-row items-center gap-8 mb-6 w-full">
                <div className="flex-shrink-0">
                  <Image
                    src="/profile-placeholder.jpg"
                    alt="Profile picture"
                    width={160}
                    height={160}
                    className="rounded-xl border-4 border-indigo-900 shadow-lg object-cover w-40 h-40"
                  />
                </div>
                <div className="flex flex-col justify-center w-full">
                  <h2 className="text-2xl font-bold text-indigo-200 mb-1 text-left">Welcome to my portfolio!</h2>
                  <p className="text-2xl md:text-3xl font-bold text-white mb-2 text-left">Full-stack developer, tech enthusiast, and lifelong learner.</p>
                  <p className="text-lg text-gray-300 text-left">
                    Here you&apos;ll find my education, work experience, projects, and skills.
                  </p>
                </div>
              </div>
            </div>
          <div id="education" ref={el => { sectionRefs.current[1] = el; }} className="w-full max-w-4xl ml-0">
            <h2 className="text-2xl font-bold mb-2 text-indigo-200 ml-0">Education</h2>
            <hr className="border-white/10 mb-6 ml-0" />
            <div className="bg-gradient-to-br from-white/10 via-black/30 to-white/5 rounded-2xl p-10 shadow-2xl border-l-4 border-indigo-500 w-full">
              <div className="mb-2">
                <div className="text-2xl font-extrabold text-white mb-1">{education.degree}</div>
                <div className="text-lg font-semibold text-pink-200 mb-1">{education.university}</div>
                <div className="text-sm text-gray-400 mb-2">{education.years}</div>
              </div>
              <hr className="border-white/10 mb-4" />
              <div className="text-gray-200 leading-relaxed max-w-prose">
                {education.description}
              </div>
            </div>
          </div>
          <div id="work" ref={el => { sectionRefs.current[2] = el; }} className="w-full max-w-4xl ml-0">
            <h2 className="text-2xl font-bold mb-2 text-indigo-200 ml-0">Work Experience</h2>
            <hr className="border-white/10 mb-6 ml-0" />
            <div className="bg-gradient-to-br from-white/10 via-black/30 to-white/5 rounded-2xl p-10 shadow-2xl border-l-4 border-indigo-500 w-full flex flex-col md:flex-row items-start gap-12 ml-0 max-w-6xl">
              <button
                onClick={() => setShowGroupModal(true)}
                className="focus:outline-none group mb-4 md:mb-0"
                aria-label="Show group photo"
                style={{ background: 'none', border: 'none', padding: 0 }}
              >
                <Image
                  src="/sysenact-group-placeholder.jpg"
                  alt="Group photo"
                  width={288}
                  height={288}
                  className="rounded-2xl object-cover w-72 h-72 mb-2 md:mb-0 md:mr-12 shadow-2xl border-2 border-indigo-900"
                />
              </button>
              {showGroupModal && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                  onClick={() => setShowGroupModal(false)}
                  aria-modal="true"
                  role="dialog"
                >
                  <Image
                    src="/sysenact-group-placeholder.jpg"
                    alt="SysEnact staff and coworkers group photo enlarged"
                    width={400}
                    height={400}
                    className="w-96 h-96 rounded-xl object-cover shadow-2xl border-4 border-gray-700"
                    onClick={e => e.stopPropagation()}
                  />
                </div>
              )}
              <div className="flex-1 min-w-[28rem] pl-12">
                <div className="font-semibold text-white mb-1">Core Banking Developer Intern</div>
                <div className="text-gray-400 mb-1">SysEnact Consulting (PVT) | Nov 2023 - May 2024</div>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 mt-2">
                  <li>Built and maintained Enquiry and Version modules in Temenos for SMIB and DFCC banks</li>
                  <li>Worked with business analysts to implement banking logic and streamline processes</li>
                  <li>Optimized Java/InfoBasic routines, improving system speed and reducing errors</li>
                  <li>Supported live systems, resolving production issues to ensure uptime</li>
                  <li>Contributed to loan disbursement automation and reporting tools for bank officers</li>
                </ul>
              </div>
            </div>
          </div>
          <div id="projects" ref={el => { sectionRefs.current[3] = el; }} className="w-full max-w-4xl ml-0">
            <h2 className="text-2xl font-bold mb-2 text-indigo-200 ml-0">Projects</h2>
            <hr className="border-white/10 mb-6 ml-0" />
            <div className="flex flex-col gap-6 ml-0 w-full">
              {/* Example project cards */}
              <div className="bg-gradient-to-br from-white/10 via-black/30 to-white/5 rounded-2xl p-10 shadow-2xl border-l-4 border-indigo-500 w-full mb-6">
                <div className="font-bold text-lg text-indigo-100 mb-1">Fit Link – Fitness Social Platform</div>
                <div className="text-sm text-gray-400 mb-1">Team Leader <span className="font-mono text-pink-200">— Spring Boot, REST API, Full-Stack</span></div>
                <ul className="list-disc list-inside text-gray-200 space-y-1">
                  <li>Designed and deployed a scalable RESTful backend supporting post sharing and user profiles.</li>
                  <li>Led full-stack development for social feed and interactive fitness community features.</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-white/10 via-black/30 to-white/5 rounded-2xl p-10 shadow-2xl border-l-4 border-indigo-500 w-full mb-6">
                <div className="font-bold text-lg text-indigo-100 mb-1">Wedding Management System</div>
                <div className="text-sm text-gray-400 mb-1">Team Leader <span className="font-mono text-pink-200">— MERN Stack (MongoDB, Express, React, Node.js)</span></div>
                <ul className="list-disc list-inside text-gray-200 space-y-1">
                  <li>Directed a 7-member team to build a vendor booking and venue management platform.</li>
                  <li>Delivered integrated client dashboards with booking workflows and real-time updates.</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-white/10 via-black/30 to-white/5 rounded-2xl p-10 shadow-2xl border-l-4 border-indigo-500 w-full mb-6">
                <div className="font-bold text-lg text-indigo-100 mb-1">Smart Waste Management System</div>
                <div className="text-sm text-gray-400 mb-1">Team Leader <span className="font-mono text-pink-200">— IoT, Python, Embedded Systems</span></div>
                <ul className="list-disc list-inside text-gray-200 space-y-1">
                  <li>Engineered sensor-based hardware for bin monitoring with live web/mobile dashboards.</li>
                  <li>Enabled real-time waste tracking to optimize collection routes and improve efficiency.</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-white/10 via-black/30 to-white/5 rounded-2xl p-10 shadow-2xl border-l-4 border-indigo-500 w-full mb-6">
                <div className="font-bold text-lg text-indigo-100 mb-1">IoT Wearable Health Monitor</div>
                <div className="text-sm text-gray-400 mb-1">Team Leader <span className="font-mono text-pink-200">— IoT, scikit-learn, ML, Dashboard</span></div>
                <ul className="list-disc list-inside text-gray-200 space-y-1">
                  <li>Developed a wearable device for movement classification using machine learning models.</li>
                  <li>Built a real-time dashboard to track key health metrics and activity data.</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-white/10 via-black/30 to-white/5 rounded-2xl p-10 shadow-2xl border-l-4 border-indigo-500 w-full mb-6">
                <div className="font-bold text-lg text-indigo-100 mb-1">Temenos | Java | InfoBasic | Banking Systems Integration</div>
                <div className="text-sm text-gray-400 mb-1">Core Banking Developer Intern <span className="font-mono text-pink-200">— Temenos, Java, InfoBasic, Banking Systems</span></div>
                <ul className="list-disc list-inside text-gray-200 space-y-1">
                  <li>Built and maintained Enquiry and Version modules in Temenos for SMIB and DFCC banks.</li>
                  <li>Worked with business analysts to implement banking logic and streamline processes.</li>
                  <li>Optimized Java/InfoBasic routines, improving system speed and reducing errors.</li>
                  <li>Supported live systems, resolving production issues to ensure uptime.</li>
                  <li>Contributed to loan disbursement automation and reporting tools for bank officers.</li>
                </ul>
              </div>
            </div>
          </div>
          <div id="skills" ref={el => { sectionRefs.current[4] = el; }} className="w-full max-w-4xl ml-0">
            <h2 className="text-2xl font-bold mb-2 text-indigo-200 ml-0">Skills</h2>
            <hr className="border-white/10 mb-6 ml-0" />
            <div className="bg-gradient-to-br from-white/10 via-black/30 to-white/5 rounded-2xl p-10 shadow-2xl border-l-4 border-indigo-500 w-full ml-0">
              <div className="flex flex-wrap gap-3">
                <span className="bg-indigo-900/40 px-3 py-1 rounded-full text-sm border border-indigo-700/30 text-gray-200">JavaScript</span>
                <span className="bg-indigo-900/40 px-3 py-1 rounded-full text-sm border border-indigo-700/30 text-gray-200">Java</span>
                <span className="bg-indigo-900/40 px-3 py-1 rounded-full text-sm border border-indigo-700/30 text-gray-200">Python</span>
                <span className="bg-indigo-900/40 px-3 py-1 rounded-full text-sm border border-indigo-700/30 text-gray-200">C++</span>
                <span className="bg-indigo-900/40 px-3 py-1 rounded-full text-sm border border-indigo-700/30 text-gray-200">Kotlin</span>
                <span className="bg-indigo-900/40 px-3 py-1 rounded-full text-sm border border-indigo-700/30 text-gray-200">InfoBasic</span>
                <span className="bg-indigo-900/40 px-3 py-1 rounded-full text-sm border border-indigo-700/30 text-gray-200">MERN Stack</span>
                <span className="bg-indigo-900/40 px-3 py-1 rounded-full text-sm border border-indigo-700/30 text-gray-200">Spring Boot</span>
                <span className="bg-indigo-900/40 px-3 py-1 rounded-full text-sm border border-indigo-700/30 text-gray-200">REST APIs</span>
                <span className="bg-indigo-900/40 px-3 py-1 rounded-full text-sm border border-indigo-700/30 text-gray-200">HTML/CSS</span>
                <span className="bg-indigo-900/40 px-3 py-1 rounded-full text-sm border border-indigo-700/30 text-gray-200">MongoDB</span>
                <span className="bg-indigo-900/40 px-3 py-1 rounded-full text-sm border border-indigo-700/30 text-gray-200">Temenos internal DB</span>
                <span className="bg-indigo-900/40 px-3 py-1 rounded-full text-sm border border-indigo-700/30 text-gray-200">SQL</span>
                <span className="bg-indigo-900/40 px-3 py-1 rounded-full text-sm border border-indigo-700/30 text-gray-200">Temenos (Enquiry, Version, Java routines)</span>
                <span className="bg-indigo-900/40 px-3 py-1 rounded-full text-sm border border-indigo-700/30 text-gray-200">Arduino</span>
                <span className="bg-indigo-900/40 px-3 py-1 rounded-full text-sm border border-indigo-700/30 text-gray-200">Embedded Systems</span>
                <span className="bg-indigo-900/40 px-3 py-1 rounded-full text-sm border border-indigo-700/30 text-gray-200">ML (scikit-learn)</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 