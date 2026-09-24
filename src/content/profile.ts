import type { StaticImageData } from "next/image";
import profilePhoto from "@/assets/profile.jpg";
import sysenactTeamPhoto from "@/assets/sysenact-team.jpg";

/**
 * All site copy lives here. Pages only decide layout; to update the portfolio,
 * edit this file.
 */

export type Photo = { src: StaticImageData; alt: string };

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin";
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
  photo?: Photo;
};

export type Project = {
  title: string;
  role: string;
  stack: string;
  highlights: string[];
};

export type SkillGroup = { category: string; items: string[] };

export const profile = {
  name: "Minidu Perera",
  location: "Sri Lanka",
  email: "miniduthiranjayaiso@gmail.com",
  tagline: "Welcome to my space in the internet.",
  headline: "Full-stack developer, tech enthusiast, and lifelong learner.",
  summary:
    "Software developer passionate about leveraging technology to solve real-world problems. Thrive in collaborative team environments and known for quickly mastering complex systems. Consistently deliver high-quality solutions through a commitment to continuous learning, curiosity, and technical excellence.",
  photo: { src: profilePhoto, alt: "Portrait of Minidu Perera" } satisfies Photo,
  substackUrl: "https://minidu.substack.com/",
  socials: [
    { label: "GitHub", href: "https://github.com/Minidu-perara", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/minidu-thiranjaya-189aa22a3/",
      icon: "linkedin",
    },
  ] satisfies SocialLink[],
  resume: {
    href: "/resume.pdf",
    downloadName: "Minidu-Perera-Resume.pdf",
    /** ISO date (YYYY-MM-DD) the PDF was last updated. */
    updated: "2025-07-13",
  },
} as const;

export const education: Education = {
  degree: "BSc (Hons) in Information Technology",
  institution: "Sri Lanka Institute of Information Technology (SLIIT)",
  period: "2021 – Present",
  summary:
    "Completed curriculum covering software development, cloud technologies, quality assurance, and system design. Gained practical experience through academic and industry projects spanning web, mobile, and IoT applications, with a focus on building scalable, real-world solutions.",
};

export const experience: Experience[] = [
  {
    role: "Core Banking Developer Intern",
    company: "SysEnact Consulting (PVT)",
    period: "Nov 2023 – May 2024",
    highlights: [
      "Built and maintained Enquiry and Version modules in Temenos for SMIB and DFCC banks",
      "Worked with business analysts to implement banking logic and streamline processes",
      "Optimized Java/InfoBasic routines, improving system speed and reducing errors",
      "Supported live systems, resolving production issues to ensure uptime",
      "Contributed to loan disbursement automation and reporting tools for bank officers",
    ],
    photo: { src: sysenactTeamPhoto, alt: "SysEnact staff and coworkers group photo" },
  },
];

export const projects: Project[] = [
  {
    title: "Fit Link – Fitness Social Platform",
    role: "Team Leader",
    stack: "Spring Boot, REST API, Full-Stack",
    highlights: [
      "Designed and deployed a scalable RESTful backend supporting post sharing and user profiles.",
      "Led full-stack development for social feed and interactive fitness community features.",
    ],
  },
  {
    title: "Wedding Management System",
    role: "Team Leader",
    stack: "MERN Stack (MongoDB, Express, React, Node.js)",
    highlights: [
      "Directed a 7-member team to build a vendor booking and venue management platform.",
      "Delivered integrated client dashboards with booking workflows and real-time updates.",
    ],
  },
  {
    title: "Smart Waste Management System",
    role: "Team Leader",
    stack: "IoT, Python, Embedded Systems",
    highlights: [
      "Engineered sensor-based hardware for bin monitoring with live web/mobile dashboards.",
      "Enabled real-time waste tracking to optimize collection routes and improve efficiency.",
    ],
  },
  {
    title: "IoT Wearable Health Monitor",
    role: "Team Leader",
    stack: "IoT, scikit-learn, ML, Dashboard",
    highlights: [
      "Developed a wearable device for movement classification using machine learning models.",
      "Built a real-time dashboard to track key health metrics and activity data.",
    ],
  },
];

export const skills: SkillGroup[] = [
  { category: "Languages", items: ["JavaScript", "Java", "Python", "C++", "Kotlin", "InfoBasic"] },
  { category: "Web / Backend", items: ["MERN Stack", "Spring Boot", "REST APIs", "HTML/CSS"] },
  { category: "Databases", items: ["MongoDB", "Temenos internal DB", "SQL"] },
  { category: "Banking Systems", items: ["Temenos (Enquiry, Version, Java routines)"] },
  { category: "IoT / ML", items: ["Arduino", "Embedded Systems", "ML (scikit-learn)"] },
];
