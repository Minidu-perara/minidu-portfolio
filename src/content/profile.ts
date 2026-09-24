import type { StaticImageData } from "next/image";
import profilePhoto from "@/assets/profile.jpg";
import sysenactTeamPhoto from "@/assets/sysenact-team.jpg";

/**
 * All site copy lives here. Components only decide layout; to update the
 * site, edit this file.
 */

export type Photo = { src: StaticImageData; alt: string };

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "substack";
};

export type Education = {
  degree: string;
  institution: string;
  period: string;
  summary: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
  tech: string[];
  photo?: Photo;
};

export type Project = {
  title: string;
  role: string;
  summary: string;
  tech: string[];
};

export type SkillGroup = { category: string; items: string[] };

export const profile = {
  name: "Minidu Perera",
  role: "Full-stack developer",
  pitch: "I build scalable, reliable software for real-world problems, from core banking systems to IoT.",
  status: "Final-year IT undergraduate at SLIIT",
  location: "Sri Lanka",
  email: "miniduthiranjayaiso@gmail.com",
  /** Canonical address of this site. */
  website: "https://miniduperera.cv",
  photo: { src: profilePhoto, alt: "Portrait of Minidu Perera" } satisfies Photo,
  about: [
    "I’m a final-year Information Technology undergraduate at SLIIT who enjoys designing systems, solving real-world problems and picking up new technologies along the way.",
    "Most recently I worked as a core banking developer intern at SysEnact Consulting, building and optimising Temenos modules for SMIB and DFCC banks. At university I’ve led teams building everything from a MERN-stack booking platform to IoT devices with machine-learning dashboards.",
    "I thrive in collaborative teams, get up to speed on complex systems quickly, and care about delivering high-quality work through curiosity and continuous learning.",
  ],
  resumeHref: "/resume.pdf",
  githubHref: "https://github.com/Minidu-perara",
  substackHref: "https://minidu.substack.com/",
  socials: [
    { label: "GitHub", href: "https://github.com/Minidu-perara", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/minidu-thiranjaya-189aa22a3/", icon: "linkedin" },
    { label: "Substack", href: "https://minidu.substack.com/", icon: "substack" },
  ] satisfies SocialLink[],
} as const;

export const experience: Experience[] = [
  {
    role: "Core Banking Developer Intern",
    company: "SysEnact Consulting",
    period: "Nov 2023 – May 2024",
    highlights: [
      "Built and maintained Enquiry and Version modules in Temenos for SMIB and DFCC banks.",
      "Worked with business analysts to implement banking logic and streamline processes.",
      "Optimised Java and InfoBasic routines, improving system speed and reducing errors.",
      "Supported live systems, resolving production issues to keep them running.",
      "Contributed to loan-disbursement automation and reporting tools for bank officers.",
    ],
    tech: ["Temenos", "Java", "InfoBasic", "Core banking"],
    photo: { src: sysenactTeamPhoto, alt: "The SysEnact Consulting team" },
  },
];

export const projects: Project[] = [
  {
    title: "Fit Link",
    role: "Team lead",
    summary:
      "A fitness social platform. Designed and deployed a scalable RESTful backend for post sharing and user profiles, and led full-stack development of the social feed and community features.",
    tech: ["Spring Boot", "REST API", "Full-stack"],
  },
  {
    title: "Wedding Management System",
    role: "Team lead · 7 people",
    summary:
      "A vendor-booking and venue-management platform, with client dashboards covering booking workflows and real-time updates.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    title: "Smart Waste Management System",
    role: "Team lead",
    summary:
      "Sensor-based hardware that monitors bin levels, with live web and mobile dashboards for real-time tracking that helps optimise collection routes.",
    tech: ["IoT", "Python", "Embedded systems"],
  },
  {
    title: "IoT Wearable Health Monitor",
    role: "Team lead",
    summary:
      "A wearable device that classifies movement with machine-learning models, paired with a real-time dashboard for health metrics and activity data.",
    tech: ["IoT", "scikit-learn", "Machine learning"],
  },
];

export const skills: SkillGroup[] = [
  { category: "Languages", items: ["JavaScript", "Java", "Python", "C++", "Kotlin", "InfoBasic"] },
  { category: "Web & backend", items: ["React", "Node.js", "Express", "Spring Boot", "REST APIs", "HTML/CSS"] },
  { category: "Data", items: ["MongoDB", "SQL", "Temenos DB"] },
  { category: "Banking", items: ["Temenos (Enquiry, Version, Java routines)"] },
  { category: "IoT & ML", items: ["Arduino", "Embedded systems", "scikit-learn"] },
];

export const education: Education = {
  degree: "BSc (Hons) in Information Technology",
  institution: "Sri Lanka Institute of Information Technology (SLIIT)",
  period: "2021 – Present",
  summary:
    "Coursework in software development, cloud technologies, quality assurance and system design, with academic and industry projects across web, mobile and IoT.",
};
