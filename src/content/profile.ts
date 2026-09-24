import type { StaticImageData } from "next/image";
import profilePhoto from "@/assets/profile.jpg";
import sysenactTeamPhoto from "@/assets/sysenact-team.jpg";

/**
 * All site copy lives here. Components only decide layout; to update the
 * site, edit this file. Every claim should trace back to the current CV
 * (public/resume.pdf).
 */

export type Photo = { src: StaticImageData; alt: string };

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "substack";
};

export type Highlight = { value: string; label: string };

export type Education = {
  degree: string;
  institution: string;
  period: string;
  summary: string;
};

export type Experience = {
  role: string;
  company: string;
  /** One line of context under the role, e.g. location and what the company does. */
  context: string;
  period: string;
  highlights: string[];
  tech: string[];
  photo?: Photo;
};

export type ProjectLinks = { repo?: string; demo?: string; caseStudy?: string };

export type Project = {
  title: string;
  role: string;
  summary: string;
  tech: string[];
  /** Only link a repo whose README explains what it does and how to run it. */
  links?: ProjectLinks;
};

export type SkillGroup = { category: string; items: string[] };

export const profile = {
  name: "Minidu Perera",
  role: "Software Engineer · Backend",
  pitch: "I build backend software that holds up in production, starting with six months on a live banking system.",
  status: "Graduating Oct 2026 · open to SE roles",
  location: "Colombo, Sri Lanka · open to remote",
  email: "miniduthiranjayaiso@gmail.com",
  /** Canonical address of this site. */
  website: "https://miniduperera.vercel.app",
  seo: {
    title: "Minidu Perera · Software Engineer (Backend) · Sri Lanka",
    description:
      "I build backend software that holds up in production, starting with six months on a live banking system.",
  },
  photo: { src: profilePhoto, alt: "Portrait of Minidu Perera" } satisfies Photo,
  highlights: [
    { value: "6 months", label: "on a live production banking system" },
    { value: "~30%", label: "fewer rejected loan disbursements" },
    { value: "3 teams led", label: "of 4, 5 and 8 people at SLIIT" },
  ] satisfies Highlight[],
  about: [
    "I’m a software engineer finishing my BSc (Hons) in Information Technology at SLIIT, graduating in October 2026. I’m looking for a graduate, associate or junior software engineering role, backend by preference, in Sri Lanka or remote.",
    "For six months at SysEnact Consulting I worked on a live core-banking system. I built the loan-disbursement solution that State Mortgage & Investment Bank’s loan officers use, working on-site with them to turn their requests into working features, and I handled the Linux side: SSH, file transfers, permissions and deployments. Disbursement rejections fell by about 30% after it went live.",
    "That work taught me a few things I now build by: a mistake on a live server matters, the quickest route to the right fix is talking to the person who uses the system, and reporting an error fast beats hiding it.",
    "At university I’ve led teams of four to eight people through IoT, machine-learning and full-stack projects, and outside class I build systems I use every day.",
  ],
  resume: {
    href: "/resume.pdf",
    downloadName: "Minidu-Perera-Software-Engineer-CV.pdf",
  },
  contact: {
    heading: "Hiring a graduate or junior engineer?",
    text: "I’m open to graduate, associate and junior software engineering roles in Sri Lanka or remote. Email me and I’ll send my CV or set up a call.",
  },
  githubHref: "https://github.com/Minidu-perara",
  substackHref: "https://minidu.substack.com/",
  socials: [
    { label: "GitHub", href: "https://github.com/Minidu-perara", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/minidu-perera-dev/", icon: "linkedin" },
    { label: "Substack", href: "https://minidu.substack.com/", icon: "substack" },
  ] satisfies SocialLink[],
} as const;

export const experience: Experience[] = [
  {
    role: "Software Engineer Intern, Core Banking",
    company: "SysEnact Consulting",
    context: "Colombo · Temenos core-banking consultancy (Sri Lanka & Singapore)",
    period: "Nov 2024 – May 2025",
    highlights: [
      "Built the loan-disbursement solution for SMIB (State Mortgage & Investment Bank) on Temenos T24: the loan officers’ screens and the business logic behind them. Disbursement rejections fell by about 30% after deployment.",
      "Wrote InfoBasic routines and Java logic on the backend, including Enquiry programs for secured data retrieval and Version programs for input and validation.",
      "Worked on-site at SMIB head office with the bank’s loan officers, turning their requests into working features.",
      "Fixed live production issues alongside business analysts, often the same day, and built the Cashback Loan Advice report.",
      "Ran Linux server operations for live banking services: SSH, secure file transfer, permissions and backend deployments. Also worked on DFCC Bank tasks.",
    ],
    tech: ["Java", "InfoBasic", "Temenos T24", "Linux", "Production support"],
    photo: { src: sysenactTeamPhoto, alt: "The SysEnact Consulting team" },
  },
];

export const projects: Project[] = [
  {
    title: "IoT Wearable Health Monitor",
    role: "Team lead · 5 people",
    summary:
      "A wearable for elderly care that tracks heart rate, motion, steps and falls. I built the scikit-learn models for anomaly and fall detection and the MQTT pipeline feeding a caregiver dashboard. Fall detection above 95% accuracy; manual monitoring work cut by about 60%.",
    tech: ["Python", "scikit-learn", "MQTT", "Arduino", "MERN"],
  },
  {
    title: "Fit Link",
    role: "Team lead · 4 people",
    summary:
      "A social platform for sharing workouts and meal plans. I led the team and built the Spring Boot REST backend for posts and profiles, with secure login and privacy controls over health data.",
    tech: ["Java", "Spring Boot", "REST API", "MongoDB"],
  },
  {
    title: "Edge-based Smart Waste Monitoring",
    role: "Final-year research · solo",
    summary:
      "A two-node IoT prototype (ESP32 and ESP8266) with an adaptive reporting policy: each bin changes how often it reports depending on its state, with a laptop acting as the edge gateway over MQTT and a live dashboard. Final presentation October 2026.",
    tech: ["ESP32", "ESP8266", "MQTT", "Edge computing", "IoT"],
  },
  {
    title: "Wedding Management System",
    role: "Team lead · 8 people",
    summary:
      "A platform connecting couples with venues and vendors, with booking workflows, client dashboards and admin panels. I coordinated an eight-person team through delivery.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
  },
];

export const skills: SkillGroup[] = [
  { category: "Languages", items: ["Java", "JavaScript / TypeScript", "Python", "SQL", "C++"] },
  { category: "Backend & web", items: ["Spring Boot", "Node.js / Express", "REST APIs", "React", "Next.js", "MongoDB"] },
  { category: "Production & ops", items: ["Linux", "SSH & file transfer", "Deployments", "Git", "Production debugging"] },
  { category: "Testing", items: ["Unit & integration testing", "Cypress", "Selenium"] },
  { category: "Core banking", items: ["Temenos T24", "InfoBasic", "Enquiry & Version programming"] },
  { category: "IoT & ML", items: ["ESP32 / ESP8266", "Arduino", "MQTT", "scikit-learn", "TensorFlow", "pandas"] },
];

export const education: Education = {
  degree: "BSc (Hons) in Information Technology",
  institution: "Sri Lanka Institute of Information Technology (SLIIT), Malabe",
  period: "Aug 2021 – Oct 2026 (expected)",
  summary:
    "Final semester. Final-year research on edge-based, energy-aware IoT waste monitoring. Coursework in software engineering, system design, quality assurance and cloud technologies.",
};
