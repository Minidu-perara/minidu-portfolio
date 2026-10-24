import type { StaticImageData } from "next/image";
import portraitPhoto from "@/assets/portrait.jpg";
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
  /** ISO dates used to show how far through the degree Minidu is. */
  start: string;
  end: string;
};

export type LogLevel = "INFO" | "BUILD" | "DEPLOY" | "METRIC" | "FIX" | "OPS";

/** One line of the experience "career.log". Every line restates a CV fact. */
export type LogEntry = { when?: string; level: LogLevel; source: string; message: string };

export type Experience = {
  role: string;
  company: string;
  /** One line of context under the role, e.g. location and what the company does. */
  context: string;
  period: string;
  highlights: string[];
  tech: string[];
  photo?: Photo;
  /** Path of a case study page for this role, if one exists. */
  caseStudy?: string;
  log: LogEntry[];
};

export type ProjectLinks = { repo?: string; demo?: string; caseStudy?: string };

/** Which animated diagram illustrates a project card. */
export type ProjectScene = "ecg" | "graph" | "edge" | "calendar";

export type Project = {
  title: string;
  role: string;
  summary: string;
  tech: string[];
  scene: ProjectScene;
  /** Only link a repo whose README explains what it does and how to run it. */
  links?: ProjectLinks;
};

export type SkillGroup = {
  category: string;
  icon: "code" | "server" | "terminal" | "cloud" | "ai" | "check" | "bank" | "cpu";
  items: string[];
};

export type Place = { name: string; lat: number; lon: number; timeZone: string };

export const profile = {
  name: "Minidu Perera",
  /** How the name breaks across lines in the hero. */
  nameLines: ["Minidu", "Perera"],
  role: "Software Engineer · Backend",
  availability: "Open to SE roles",
  pitch: "I build backend software that holds up in production, starting with six months on a live banking system.",
  status: "Graduating Oct 2026 · open to SE roles",
  location: "Colombo, Sri Lanka · open to remote",
  home: { name: "Colombo", lat: 6.9271, lon: 79.8612, timeZone: "Asia/Colombo" } satisfies Place,
  email: "miniduthiranjayaiso@gmail.com",
  /** Canonical address of this site. */
  website: "https://miniduperera.tech",
  seo: {
    title: "Minidu Perera · Software Engineer (Backend) · Sri Lanka",
    description:
      "I build backend software that holds up in production, starting with six months on a live banking system.",
  },
  photo: { src: profilePhoto, alt: "Portrait of Minidu Perera" } satisfies Photo,
  highlights: [
    { value: "6 months", label: "on a live production banking system" },
    { value: "~30%", label: "more loans processed a month (est.)" },
    { value: "3 teams led", label: "of 4, 5 and 8 people at SLIIT" },
  ] satisfies Highlight[],
  about: {
    paragraphs: [
      "I’m a software engineer finishing my BSc (Hons) in Information Technology at SLIIT, graduating in October 2026. I’m looking for a graduate, associate or junior software engineering role, backend by preference, in Sri Lanka or remote.",
      "For six months at SysEnact Consulting I worked on a live core-banking system. I built the loan-disbursement solution that State Mortgage & Investment Bank’s loan officers use, working on-site with them to turn their requests into working features, and I handled the Linux side: SSH, file transfers, permissions and deployments, and I set up Azure VMs and virtual networking. It replaced their Excel-based process, and by my estimate about 30% more loans were completed each month.",
      "At university I’ve led teams of four to eight people through IoT, machine-learning and full-stack projects, and outside class I build systems I use every day.",
      "I also work with the newest AI tools, from Claude Code and agentic coding tools to integrating AI into existing systems, and they help me ramp up quickly on unfamiliar codebases.",
    ],
    principlesLead: "That work taught me a few things I now build by:",
    principles: [
      "A mistake on a live server matters.",
      "The quickest route to the right fix is talking to the person who uses the system.",
      "Reporting an error fast beats hiding it.",
    ],
  },
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
      "Built the loan-disbursement solution for SMIB (State Mortgage & Investment Bank) on Temenos T24: the loan officers’ screens and the business logic behind them. It replaced their Excel-based process: an estimated ~30% more loans completed per month.",
      "Learned T24’s proprietary InfoBasic language and Java framework on the job, then wrote InfoBasic routines and Java logic on the backend, including Enquiry programs for secured data retrieval and Version programs for input and validation.",
      "Worked on-site at SMIB head office with the bank’s loan officers, turning their requests into working features.",
      "Fixed live production issues alongside business analysts, often the same day, and built the Cashback Loan Advice report.",
      "Ran Linux server operations for live banking services (SSH, SFTP, permissions, deployments) and set up Azure VMs and virtual networking. Also worked on DFCC Bank tasks.",
    ],
    tech: ["Java", "InfoBasic", "Temenos T24", "Linux", "Azure", "Production support"],
    photo: { src: sysenactTeamPhoto, alt: "The SysEnact Consulting team" },
    caseStudy: "/case-studies/smib-loan-disbursement",
    log: [
      { when: "2024-11", level: "INFO", source: "sysenact", message: "Joined the core-banking team (Temenos T24)" },
      { level: "INFO", source: "smib.onsite", message: "On-site at SMIB head office with the bank’s loan officers" },
      { level: "BUILD", source: "disbursement", message: "Loan-disbursement solution: the officers’ screens and the business logic behind them" },
      { level: "BUILD", source: "t24.backend", message: "Learned InfoBasic and T24’s Java framework on the job, then shipped Enquiry programs for secured retrieval, Version programs for input and validation" },
      { level: "DEPLOY", source: "production", message: "Loan-disbursement solution live for SMIB’s loan officers" },
      { level: "METRIC", source: "loans", message: "Replaced the Excel-based process: an estimated ~30% more loans completed per month" },
      { level: "FIX", source: "prod.support", message: "Live production issues fixed with business analysts, often the same day" },
      { level: "BUILD", source: "reports", message: "Cashback Loan Advice report" },
      { level: "OPS", source: "linux", message: "SSH, SFTP, permissions and backend deployments for live banking services" },
      { level: "OPS", source: "azure", message: "Set up Azure VMs and virtual networking" },
      { level: "INFO", source: "dfcc", message: "Also worked on DFCC Bank tasks" },
      { when: "2025-05", level: "INFO", source: "sysenact", message: "Internship complete: six months on a live banking system" },
    ],
  },
];

export const projects: Project[] = [
  {
    title: "IoT Wearable Health Monitor",
    scene: "ecg",
    role: "Team lead · 5 people",
    summary:
      "A wearable for elderly care that tracks heart rate, motion, steps and falls. I built the scikit-learn models for anomaly and fall detection and the MQTT pipeline feeding a caregiver dashboard. Fall detection above 95% accuracy; manual monitoring work cut by about 60%.",
    tech: ["Python", "scikit-learn", "MQTT", "Arduino", "MERN"],
  },
  {
    title: "Fit Link",
    scene: "graph",
    role: "Team lead · 4 people",
    summary:
      "A social platform for sharing workouts and meal plans. I led the team and built the Spring Boot REST backend for posts and profiles, with secure login and privacy controls over health data.",
    tech: ["Java", "Spring Boot", "REST API", "MongoDB"],
  },
  {
    title: "Edge-based Smart Waste Monitoring",
    scene: "edge",
    role: "Final-year research · solo",
    summary:
      "A two-node IoT prototype (ESP32 and ESP8266) with an adaptive reporting policy: each bin changes how often it reports depending on its state, with a laptop acting as the edge gateway over MQTT and a live dashboard. Final presentation October 2026.",
    tech: ["ESP32", "ESP8266", "MQTT", "Edge computing", "IoT"],
  },
  {
    title: "Wedding Management System",
    scene: "calendar",
    role: "Team lead · 8 people",
    summary:
      "A platform connecting couples with venues and vendors, with booking workflows, client dashboards and admin panels.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
  },
];

export const skills: SkillGroup[] = [
  { category: "Languages", icon: "code", items: ["Java", "JavaScript / TypeScript", "Python", "SQL", "C++"] },
  { category: "Backend & web", icon: "server", items: ["Spring Boot", "Node.js / Express", "REST APIs", "React", "Next.js", "MongoDB"] },
  { category: "Cloud & ops", icon: "cloud", items: ["Microsoft Azure", "Virtual networks", "VM setup", "Linux", "SSH / SFTP", "Deployments", "Git", "Production debugging"] },
  { category: "AI-assisted dev", icon: "ai", items: ["Claude Code", "Agentic coding tools", "AI integration into existing systems", "Ramping up on unfamiliar codebases"] },
  { category: "Testing", icon: "check", items: ["Unit & integration testing", "Cypress", "Selenium"] },
  { category: "Core banking", icon: "bank", items: ["Temenos T24", "InfoBasic", "Enquiry & Version programming"] },
  { category: "IoT & ML", icon: "cpu", items: ["ESP32 / ESP8266", "Arduino", "MQTT", "scikit-learn", "TensorFlow", "pandas"] },
];

export const education: Education = {
  degree: "BSc (Hons) in Information Technology",
  institution: "Sri Lanka Institute of Information Technology (SLIIT), Malabe",
  period: "Aug 2021 – Oct 2026 (expected)",
  start: "2021-08-01",
  end: "2026-10-31",
  summary:
    "Final semester. Final-year research on edge-based, energy-aware IoT waste monitoring. Coursework in software engineering, system design, quality assurance and cloud technologies.",
};

/** Cities shown on the contact globe, with working-day overlap from Colombo. */
export const remoteCities: Place[] = [
  { name: "Singapore", lat: 1.3521, lon: 103.8198, timeZone: "Asia/Singapore" },
  { name: "Dubai", lat: 25.2048, lon: 55.2708, timeZone: "Asia/Dubai" },
  { name: "London", lat: 51.5074, lon: -0.1278, timeZone: "Europe/London" },
  { name: "Amsterdam", lat: 52.3676, lon: 4.9041, timeZone: "Europe/Amsterdam" },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503, timeZone: "Asia/Tokyo" },
  { name: "Sydney", lat: -33.8688, lon: 151.2093, timeZone: "Australia/Sydney" },
];

/** Eyebrow (shown as a path) and heading for each page section. */
export const sectionCopy = {
  about: { eyebrow: "about", title: "A final-year student who has already worked in production." },
  experience: {
    eyebrow: "experience",
    title: "Six months on a live banking system.",
    intro: "The internship as a log: one line for each thing I built, shipped or fixed.",
  },
  projects: { eyebrow: "projects", title: "Three teams led, one solo research build." },
  skills: { eyebrow: "stack", title: "Tools I use, from production to prototypes." },
  education: { eyebrow: "education", title: "BSc (Hons) IT at SLIIT, graduating October 2026." },
  contact: { eyebrow: "contact", title: "Hiring a graduate or junior engineer?" },
} as const;

/** Sections in the main navigation, in page order. */
export const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

/** A separate page linked after the sections, for freelance clients. */
export const servicesNav = { href: "/services", id: "services", label: "Services" } as const;

/**
 * A group of services on /services. `id` also picks the tile's icon,
 * illustration and place in the grid, so keep ids stable.
 */
export type ServiceCategory = {
  id: "web" | "systems" | "ai" | "cloud" | "custom" | "devices";
  title: string;
  text: string;
  items: string[];
};

const whatsappNumber = "94773319179";
const whatsappMessage = "Hi Minidu, I saw your website and I'd like to talk about a website for my business.";

/** A WhatsApp chat link with a message already typed, optionally about one service. */
export const whatsappLink = (topic?: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    topic ? `Hi Minidu, I saw your website and I'd like to talk about: ${topic}.` : whatsappMessage,
  )}`;

/**
 * Copy for /services, written for small business owners rather than
 * recruiters: plain words, no jargon, and no claims beyond the CV.
 */
export const services = {
  seo: {
    title: "Websites & Online Stores for Sri Lankan Businesses · Minidu Perera",
    description:
      "Websites, online stores, stock and dealer systems, AI assistants and cloud setup for Sri Lankan businesses, with support after launch.",
  },
  photo: {
    src: portraitPhoto,
    alt: "Minidu Perera, smiling, in a white shirt against a plain wall",
  } satisfies Photo,
  hero: {
    eyebrow: "Web, software & AI services",
    status: "Taking on new projects",
    title: "Take your business online.",
    text: "Websites, online stores and the systems behind them, built for Sri Lankan businesses.",
    secondary: "See what I build",
  },
  whatsapp: {
    href: whatsappLink(),
    tel: `tel:+${whatsappNumber}`,
    display: "+94 77 331 9179",
    label: "Chat on WhatsApp",
  },
  build: {
    eyebrow: "What I build",
    title: "Everything your business needs online.",
    intro: "Pick one, or combine a few. Each one is built around how you already sell.",
    ask: "WhatsApp me about this",
    categories: [
      {
        id: "web",
        title: "Websites & online stores",
        text: "Your full range with photos, specs and prices. Customers pay by card or cash on delivery.",
        items: ["Business websites", "Online stores", "Product catalogues", "Card payment or cash on delivery", "Fast on phones"],
      },
      {
        id: "systems",
        title: "Stock & business systems",
        text: "Replace the notebook and the spreadsheet with one system your whole team can use.",
        items: [
          "Stock in and out, with low-stock alerts",
          "Dealer ordering with trade prices",
          "Easy admin panel, no coding needed",
          "Bookings and appointments",
          "Invoices and sales reports",
          "Staff logins for each role",
        ],
      },
      {
        id: "ai",
        title: "AI for your business",
        text: "Put the newest AI tools to work on the questions and paperwork that eat your day.",
        items: ["AI assistant that answers customers", "Answers from your own product list", "Automated reports and data entry", "AI added to the system you have"],
      },
      {
        id: "devices",
        title: "Smart devices & IoT",
        text: "Connect sensors and devices to a live dashboard you can check from your phone.",
        items: ["Live device dashboards", "Alerts when something needs attention", "Prototypes for smart products"],
      },
      {
        id: "cloud",
        title: "Hosting, cloud & servers",
        text: "Your site and systems set up properly, kept online and backed up.",
        items: ["Domain and business email", "Hosting and backups", "Microsoft Azure setup", "Linux servers"],
      },
      {
        id: "custom",
        title: "Custom software & fixes",
        text: "Something that does not fit a box, or an existing site that needs work.",
        items: ["Software built for how you work", "Connect payments, SMS and couriers", "Fix or speed up an existing site", "New features on your current system"],
      },
    ] satisfies ServiceCategory[],
  },
  support: {
    title: "Support after launch",
    text: "I look after your site once it’s live, on a simple monthly plan.",
    items: ["Hosting", "Backups", "Fixes", "Small updates"],
  },
  steps: {
    eyebrow: "How we start",
    title: "Start free. Pay as it works.",
    items: [
      { title: "Free chat", text: "I learn how you sell today." },
      { title: "Free sample", text: "A homepage with your products." },
      { title: "Build in phases", text: "Pay for each stage once it’s working." },
      { title: "Launch & support", text: "Hosting, fixes and updates." },
    ],
  },
  demo: {
    /** Leave empty to hide the demo section entirely. */
    url: "",
    title: "See a demo store",
    text: "Click through a working store, from the product list to checkout.",
  },
  why: {
    eyebrow: "Why work with me",
    title: "Who you’ll be working with.",
    facts: [
      "BSc (Hons) Information Technology, SLIIT",
      "Built the loan-disbursement solution for a live bank (SMIB) during my internship at SysEnact",
      "React · Next.js · Node.js · MongoDB",
    ],
  },
  faq: {
    eyebrow: "Questions",
    title: "Things owners usually ask.",
    items: [
      {
        q: "How much will it cost?",
        a: "It depends on what you need. After a free chat I send a clear quote, split into stages, and you pay for each stage once it is working.",
      },
      {
        q: "I’m not technical. Is that a problem?",
        a: "Not at all. I explain everything in plain words, and the admin panel is built so your team can change products and prices without any coding.",
      },
      {
        q: "Do I need to buy hosting or a domain first?",
        a: "No. I can set up your domain, hosting and business email for you, or work with what you already have.",
      },
      {
        q: "Can you work on my existing website or system?",
        a: "Yes. I can fix it, speed it up, add features, or connect it to the tools you already use.",
      },
      {
        q: "What happens after launch?",
        a: "On a simple monthly plan I look after hosting, backups, fixes and small updates, so you can get on with running the business.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Let’s talk about your business.",
    text: "The first chat and a sample homepage are free. Send a message on WhatsApp to get started.",
    badge: "Free chat + free sample",
  },
} as const;

/** One section of a case study: an optional lead paragraph(s), then an optional bullet list. */
export type CaseStudySection = {
  heading: string;
  paragraphs?: string[];
  /** Each bullet can open with a bold lead-in. */
  bullets?: { lead?: string; text: string }[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  /** The italic line under the title. */
  meta: string;
  /** Page title (the site template adds the name) and the meta description. */
  seo: { title: string; description: string };
  sections: CaseStudySection[];
  tech: string[];
};

/** Case studies, written in the first person. Keep them to what the CV supports. */
export const caseStudies: CaseStudy[] = [
  {
    slug: "smib-loan-disbursement",
    title: "Moving SMIB’s loan disbursement from Excel to Temenos T24",
    meta: "Case study · SysEnact Consulting · Nov 2024 – May 2025 · Developer intern, core banking",
    seo: {
      title: "Moving SMIB’s loan disbursement from Excel to Temenos T24",
      description: "How I moved a bank’s loan pre-disbursement process from Excel into Temenos T24.",
    },
    sections: [
      {
        heading: "Context",
        paragraphs: [
          "SysEnact Consulting implements Temenos T24 core banking for banks in Sri Lanka and Singapore. I spent six months on State Mortgage & Investment Bank’s (SMIB) loan system, working on-site at SMIB head office with the bank’s four loan officers and SysEnact’s business analysts.",
        ],
      },
      {
        heading: "The problem",
        paragraphs: [
          "A loan at SMIB passes through many hands before the money goes out: credit, legal, risk and approval officers, then pre-disbursement and disbursement. Before the T24 solution, the loan officers ran this in Excel. They collected forms, notes and details from the other officers, typed them into spreadsheets, and kept their own logs to track where each loan stood. Every hand-off was manual. That meant re-keying data, chasing information between people and having no single record of a loan’s status. Throughput depended on how quickly people could pass spreadsheets and paperwork along.",
        ],
      },
      {
        heading: "What I built",
        paragraphs: ["I replaced that manual stage with a pre-disbursement process inside T24:"],
        bullets: [
          {
            lead: "Screens (T24 Versions)",
            text: "for the pre-disbursement officer, with separate flows for mortgage and non-mortgage loans.",
          },
          {
            lead: "Backend logic in Java on Temenos’s own packages.",
            text: "It validates each input, updates the relevant data tables and manages the loan’s state. When a loan moves from one stage to the next, the logic changes and adds the right values. It also adds or clears remarks depending on the state, so a returned file carries the reason with it.",
          },
          {
            lead: "Enquiries",
            text: "that give each officer the loan information they need at their stage, limited to their access.",
          },
          {
            text: "I maintained these Versions and Enquiries as the process changed. I also wrote the Cashback Loan Advice report.",
          },
        ],
      },
      {
        heading: "How I worked",
        paragraphs: [
          "I sat with the loan officers, watched how they actually handled a file, and turned their requests into T24 logic, with the business analysts agreeing scope. After go-live I fixed live issues raised by users, often the same day.",
        ],
      },
      {
        heading: "Result",
        paragraphs: [
          "Loan officers now work from one system instead of spreadsheets and paper hand-offs. I estimate the bank completed about 30% more loans per month afterwards, comparing monthly approvals under the manual Excel process with monthly approvals after the T24 solution went live.",
        ],
      },
      {
        heading: "What I learned",
        bullets: [
          { text: "On a live banking server a mistake matters. The skill is reporting an error fast and learning from it." },
          { text: "The quickest route to the right fix is the person who uses the system." },
          { text: "Interns are an investment. Respecting people’s time is how you earn their teaching." },
        ],
      },
    ],
    tech: ["Temenos T24 (Versions, Enquiries)", "Java with Temenos packages", "InfoBasic", "Linux (SSH, SFTP, deployments)"],
  },
];
