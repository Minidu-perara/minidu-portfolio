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
  /** Omitted for freelance work, which has no single employer to name. */
  company?: string;
  /** One line of context under the role, e.g. location and what the company does. */
  context: string;
  period: string;
  highlights: string[];
  tech: string[];
  photo?: Photo;
  /** Path of a case study page for this role, if one exists. */
  caseStudy?: string;
  /** The pinned role with a career log; other roles show as compact cards. */
  log?: LogEntry[];
};

export type ProjectLinks = { repo?: string; demo?: string; caseStudy?: string };

/** Which animated diagram illustrates a project card. */
export type ProjectScene = "ecg" | "graph" | "edge" | "calendar";

/** What a project proves. The Projects section filters on these. */
export const projectTags = ["AI", "Backend", "Cloud", "QA", "IoT"] as const;
export type ProjectTag = (typeof projectTags)[number];

export type Project = {
  title: string;
  role: string;
  summary: string;
  tech: string[];
  /** The animated diagram; projects without one show as text cards. */
  scene?: ProjectScene;
  tags: ProjectTag[];
  /** A short status pill, e.g. "In progress". */
  badge?: string;
  /** Kept in the file but not shown on the site (e.g. a project on hold). */
  hidden?: boolean;
  /** Headline numbers for the featured card. Only figures the CV states. */
  stats?: Highlight[];
  /** Only link a repo whose README explains what it does and how to run it. */
  links?: ProjectLinks;
};

export type SkillGroup = {
  category: string;
  icon: "code" | "server" | "terminal" | "cloud" | "ai" | "check" | "bank" | "cpu" | "compass";
  items: string[];
};

export type Place = { name: string; lat: number; lon: number; timeZone: string };

export const profile = {
  name: "Minidu Perera",
  /** How the name breaks across lines in the hero. */
  nameLines: ["Minidu", "Perera"],
  role: "Software Engineer · AI systems",
  availability: "Open to software, solutions and AI roles",
  pitch: "Software engineer who ships AI-powered systems into production, working directly with the people who use them.",
  /** The line under the hero pitch. */
  stackLine: "Java · TypeScript · Python · AI agents · Cloud",
  status: "Graduating Dec 2026 · open to software, solutions and AI roles",
  location: "Colombo, Sri Lanka · open to remote",
  home: { name: "Colombo", lat: 6.9271, lon: 79.8612, timeZone: "Asia/Colombo" } satisfies Place,
  email: "miniduthiranjayaiso@gmail.com",
  /** Canonical address of this site. */
  website: "https://miniduperera.tech",
  seo: {
    title: "Minidu Perera · Software Engineer · AI systems · Sri Lanka",
    description:
      "Software engineer who ships AI-powered systems into production, working directly with the people who use them.",
  },
  photo: { src: profilePhoto, alt: "Portrait of Minidu Perera" } satisfies Photo,
  highlights: [
    { value: "6 months", label: "on a live production banking system" },
    { value: "30%", label: "faster loan workflow" },
    { value: "3 teams led", label: "of 4, 5 and 8 people at SLIIT" },
  ] satisfies Highlight[],
  about: {
    paragraphs: [
      "Software engineer who ships AI-powered systems into production, working directly with the people who use them.",
      "At SysEnact Consulting I spent six months on-site with a client’s operations team, turning their requests into backend logic in Java on a live production system. My module replaced an Excel process and made their loan workflow 30% faster. I deployed on Linux servers and fixed production issues as they came up, often the same day.",
      "Since then I’ve built Life OS, my own AI-powered planning system: a Node.js/TypeScript service where Claude agents read and update live data through a validated API, covered by over 340 automated tests. I use it every day. I also take freelance web work, most recently fixing a failing Shopify integration for a local retailer.",
      "I work across Java, TypeScript and Python, build AI agent systems on Claude, and have set up cloud infrastructure on Azure.",
      "I finish my BSc (Hons) in IT at SLIIT in December 2026 and I’m looking for software engineering, solutions and AI roles, in Sri Lanka or remote.",
    ],
  },
  resume: {
    href: "/resume.pdf",
    downloadName: "Minidu-Perera-Software-Engineer-CV.pdf",
  },
  contact: {
    heading: "Hiring a software, solutions or AI engineer?",
    text: "I’m open to graduate, associate and junior roles in Sri Lanka or remote, full time from December 2026. Email me and I’ll send my CV or set up a call.",
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
    role: "Freelance Software Engineer",
    context: "Sri Lanka · Remote",
    period: "Mar 2026 – present",
    highlights: [
      "Fixed a failing Shopify integration and updated the WordPress UI for a PC retailer.",
      "QA-tested a mobile carrier-billing flow for an Upwork client, with recorded bug reports.",
    ],
    tech: [],
  },
  {
    role: "Software Engineer Intern",
    company: "SysEnact Consulting",
    context: "Colombo · Enterprise software consultancy (Sri Lanka & Singapore)",
    period: "Nov 2024 – May 2025",
    highlights: [
      "Built a loan-disbursement module end to end on the client’s live production system: the user screens, input validation and the business logic behind them, replacing a manual spreadsheet process and making the loan workflow 30% faster.",
      "Wrote backend logic in Java and InfoBasic on the Temenos T24 platform, learned on the job: read services that return only the data a user’s access allows, and input routines that validate records before saving.",
      "Handled Linux server operations (SSH, SFTP, permissions, backend deployments) and set up Azure virtual machines and virtual networking.",
      "Debugged and fixed live production issues with business analysts, often the same day, and built a reporting module.",
      "Worked on-site with the client’s end users, turning their requests into working features.",
    ],
    tech: ["Java", "InfoBasic", "Temenos T24", "Linux", "Azure", "Production support"],
    photo: { src: sysenactTeamPhoto, alt: "The SysEnact Consulting team" },
    caseStudy: "/case-studies/loan-disbursement",
    log: [
      { when: "2024-11", level: "INFO", source: "sysenact", message: "Joined SysEnact Consulting as a software engineer intern" },
      { level: "INFO", source: "client.onsite", message: "On-site with the client’s end users, turning their requests into working features" },
      { level: "BUILD", source: "disbursement", message: "Loan-disbursement module: the user screens, input validation and the business logic behind them" },
      { level: "BUILD", source: "t24.backend", message: "Java and InfoBasic on Temenos T24, learned on the job: read services and input routines" },
      { level: "DEPLOY", source: "production", message: "Loan-disbursement module live on the client’s production system" },
      { level: "METRIC", source: "workflow", message: "Replaced a manual spreadsheet process: loan workflow 30% faster" },
      { level: "FIX", source: "prod.support", message: "Live production issues fixed with business analysts, often the same day" },
      { level: "BUILD", source: "reports", message: "Reporting module" },
      { level: "OPS", source: "linux", message: "SSH, SFTP, permissions and backend deployments" },
      { level: "OPS", source: "azure", message: "Set up Azure virtual machines and virtual networking" },
      { when: "2025-05", level: "INFO", source: "sysenact", message: "Internship complete: six months on a live production system" },
    ],
  },
];

export const projects: Project[] = [
  {
    // On hold: shown once there is a repo and gate results to point to.
    // TODO(Minidu): repo, demo video, gate results.
    hidden: true,
    title: "GuardedBin: a guarded AI agent on IoT telemetry",
    role: "In progress",
    badge: "In progress",
    tags: ["AI", "IoT", "QA"],
    summary:
      "An AI agent system I’m designing and building: it manages smart waste bins from live sensor telemetry, and every action the agent proposes must pass a deterministic verification gate before it is applied. The agent can suggest; only the gate can commit.",
    tech: ["TypeScript", "Node.js", "MQTT", "SQLite", "Next.js", "Claude (Anthropic API)"],
  },
  {
    // TODO(Minidu): demo video (add links.demo when there is one).
    title: "Life OS: AI-powered planning system",
    role: "Personal project · 2026 – present, in daily use",
    tags: ["AI", "Backend", "QA"],
    summary:
      "Designed and built a Node.js/TypeScript service on SQLite with a web app and a WhatsApp bot I built. Claude agents read its exported context and write structured updates through a validated API, with receipts and undo. Over 340 automated tests.",
    tech: ["TypeScript", "Node.js", "SQLite", "WhatsApp bot", "Claude agents"],
    stats: [
      { value: "340+", label: "automated tests" },
      { value: "Daily", label: "in use since 2026" },
    ],
  },
  {
    title: "Loan-disbursement module (SysEnact case study)",
    role: "SysEnact Consulting · Nov 2024 – May 2025",
    tags: ["Backend", "Cloud"],
    summary:
      "Built a loan-disbursement module end to end on the client’s live production system: the user screens, input validation and the business logic behind them, replacing a manual spreadsheet process and making the loan workflow 30% faster.",
    tech: ["Java", "InfoBasic", "Temenos T24", "Linux", "Azure"],
    links: { caseStudy: "/case-studies/loan-disbursement" },
  },
  {
    title: "IoT Wearable Health Monitor",
    scene: "ecg",
    role: "Team lead · 5 people",
    tags: ["IoT", "AI"],
    summary:
      "Wearable for elderly care tracking heart rate, motion, steps and falls. Built the scikit-learn models for anomaly and fall detection and the MQTT pipeline feeding a caregiver dashboard. Over 95% fall-detection accuracy; cut manual monitoring work by about 60%.",
    tech: ["Python", "scikit-learn", "MQTT", "Arduino", "MERN"],
    links: { caseStudy: "/case-studies/iot-wearable-health-monitor" },
  },
  {
    title: "Edge-based Smart Waste Monitoring",
    scene: "edge",
    role: "SLIIT final-year research",
    tags: ["IoT"],
    summary:
      "Two-node IoT prototype (ESP32 and ESP8266) with an adaptive reporting policy: each bin changes how often it reports based on its state, with a laptop as the edge gateway over MQTT and a live dashboard. Research paper in progress.",
    tech: ["ESP32", "ESP8266", "MQTT", "Edge computing"],
    links: { caseStudy: "/case-studies/edge-smart-waste-monitoring" },
  },
  {
    title: "Fit Link",
    scene: "graph",
    role: "Team lead · 4 people",
    tags: ["Backend"],
    summary:
      "Social platform for sharing workouts and meal plans. Led the team and built the Spring Boot REST backend for posts and profiles, with secure login and privacy controls over health data.",
    tech: ["Java", "Spring Boot", "REST API", "MongoDB"],
    links: { caseStudy: "/case-studies/fit-link" },
  },
  {
    title: "Wedding Management System",
    scene: "calendar",
    role: "Team lead · 8 people",
    tags: ["Backend"],
    summary:
      "Led an eight-person team building a platform connecting couples with venues and vendors, with CRUD dashboards and admin panels.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    links: { caseStudy: "/case-studies/wedding-management-system" },
  },
];

export const skills: SkillGroup[] = [
  { category: "AI agents & systems", icon: "ai", items: ["Built Claude agent systems", "Claude Code", "OpenAI Codex", "Agent harnesses", "Prompting"] },
  { category: "Languages", icon: "code", items: ["Java", "SQL", "JavaScript / TypeScript", "Python", "InfoBasic", "C++"] },
  {
    category: "Backend & web",
    icon: "server",
    items: ["Spring Boot", "REST APIs", "Node.js / Express", "React", "Next.js", "MongoDB", "SQLite", "WordPress"],
  },
  {
    category: "Linux & cloud",
    icon: "cloud",
    items: ["Linux", "SSH / SFTP", "Permissions", "Backend deployments", "Microsoft Azure (VMs, virtual networking)", "Git"],
  },
  {
    category: "Testing & debugging",
    icon: "check",
    items: ["Automated testing (340+ tests on Life OS)", "Unit & integration testing", "Cypress", "Selenium", "Production debugging"],
  },
  { category: "Core banking", icon: "bank", items: ["Temenos T24", "InfoBasic", "Enquiry & Version programming"] },
  { category: "IoT & ML", icon: "cpu", items: ["ESP32 / ESP8266", "Arduino", "MQTT", "scikit-learn", "TensorFlow", "pandas"] },
  { category: "Familiar with", icon: "compass", items: ["AWS ECS (networking, load balancing)", "AWS SQS", "LLM deployment"] },
];

export const education: Education = {
  degree: "BSc (Hons) in Information Technology",
  institution: "Sri Lanka Institute of Information Technology (SLIIT), Malabe",
  period: "Nov 2022 – Dec 2026 (expected)",
  start: "2022-11-01",
  end: "2026-12-31",
  summary: "Final-year research on edge-based IoT waste monitoring.",
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
    title: "Six months on a live production system.",
    intro: "The internship as a log: one line for each thing I built, shipped or fixed.",
  },
  projects: { eyebrow: "projects", title: "Projects, tagged by what they prove." },
  skills: { eyebrow: "stack", title: "Tools I use, from production to prototypes." },
  education: { eyebrow: "education", title: "BSc (Hons) IT at SLIIT, graduating December 2026." },
  contact: { eyebrow: "contact", title: "Hiring a software, solutions or AI engineer?" },
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
    alt: "Minidu Perera in a white shirt, looking to one side, outside an office building",
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
      "Built the loan-disbursement solution for a live bank during my internship at SysEnact",
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
  /** The animated diagram shown under the title, for project write-ups. */
  scene?: ProjectScene;
  /** Where "Back" goes: the home-page section this belongs to. */
  back: { href: string; label: string };
};

/** Case studies, written in the first person. Keep them to what the CV supports. */
export const caseStudies: CaseStudy[] = [
  {
    slug: "loan-disbursement",
    back: { href: "/#experience", label: "Back to experience" },
    title: "Moving a bank’s loan disbursement from Excel to Temenos T24",
    meta: "Case study · SysEnact Consulting · Nov 2024 – May 2025 · Developer intern, core banking",
    seo: {
      title: "Moving a bank’s loan disbursement from Excel to Temenos T24",
      description: "How I moved a bank’s loan pre-disbursement process from Excel into Temenos T24.",
    },
    sections: [
      {
        heading: "Context",
        paragraphs: [
          "SysEnact Consulting implements Temenos T24 core banking for banks in Sri Lanka and Singapore. I spent six months on a client bank’s loan system, working on-site at the bank’s head office with its four loan officers and SysEnact’s business analysts.",
        ],
      },
      {
        heading: "The problem",
        paragraphs: [
          "A loan at the bank passes through many hands before the money goes out: credit, legal, risk and approval officers, then pre-disbursement and disbursement. Before the T24 solution, the loan officers ran this in Excel. They collected forms, notes and details from the other officers, typed them into spreadsheets, and kept their own logs to track where each loan stood. Every hand-off was manual. That meant re-keying data, chasing information between people and having no single record of a loan’s status. Throughput depended on how quickly people could pass spreadsheets and paperwork along.",
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
            text: "I maintained these Versions and Enquiries as the process changed. I also wrote a reporting module.",
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
          "Loan officers now work from one system instead of spreadsheets and paper hand-offs. The module made the loan workflow 30% faster.",
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
  // Project write-ups. Each restates only what the CV says about the project;
  // add detail here as it becomes available.
  {
    slug: "iot-wearable-health-monitor",
    back: { href: "/#projects", label: "Back to projects" },
    scene: "ecg",
    title: "IoT Wearable Health Monitor",
    meta: "Project · SLIIT · Team lead of 5",
    seo: {
      title: "IoT Wearable Health Monitor",
      description: "A wearable for elderly care that detects falls with over 95% accuracy, built by a team of five that I led.",
    },
    sections: [
      {
        heading: "What it is",
        paragraphs: ["A wearable for elderly care that tracks heart rate, motion, steps and falls, and shows them to a caregiver on a dashboard."],
      },
      {
        heading: "My part",
        paragraphs: ["I led the team of five."],
        bullets: [
          { lead: "Detection models.", text: "I built the scikit-learn models for anomaly and fall detection." },
          { lead: "Data pipeline.", text: "I built the MQTT pipeline that feeds the caregiver dashboard." },
        ],
      },
      {
        heading: "Result",
        paragraphs: ["Fall detection reached over 95% accuracy, and the system cut manual monitoring work by about 60%."],
      },
    ],
    tech: ["Python", "scikit-learn", "MQTT", "Arduino", "MERN"],
  },
  {
    slug: "fit-link",
    back: { href: "/#projects", label: "Back to projects" },
    scene: "graph",
    title: "Fit Link",
    meta: "Project · SLIIT · Team lead of 4",
    seo: {
      title: "Fit Link",
      description: "A social platform for sharing workouts and meal plans, with a Spring Boot REST backend I built while leading the team.",
    },
    sections: [
      { heading: "What it is", paragraphs: ["A social platform for sharing workouts and meal plans."] },
      {
        heading: "My part",
        paragraphs: [
          "I led the team of four and built the Spring Boot REST backend for posts and profiles, with secure login and privacy controls over health data.",
        ],
      },
    ],
    tech: ["Java", "Spring Boot", "REST API", "MongoDB"],
  },
  {
    slug: "edge-smart-waste-monitoring",
    back: { href: "/#projects", label: "Back to projects" },
    scene: "edge",
    title: "Edge-based Smart Waste Monitoring",
    meta: "Final-year research · SLIIT · Individual",
    seo: {
      title: "Edge-based Smart Waste Monitoring",
      description: "My final-year research: a two-node IoT prototype where each bin decides how often to report, based on its state.",
    },
    sections: [
      {
        heading: "What it is",
        paragraphs: ["My final-year research project: a two-node IoT prototype for monitoring waste bins, built on an ESP32 and an ESP8266."],
      },
      {
        heading: "How it works",
        bullets: [
          { lead: "Adaptive reporting.", text: "Each bin changes how often it reports depending on its state." },
          { lead: "Edge gateway.", text: "A laptop acts as the edge gateway over MQTT." },
          { lead: "Live dashboard.", text: "Readings appear on a live dashboard." },
        ],
      },
      { heading: "Status", paragraphs: ["Research paper in progress."] },
    ],
    tech: ["ESP32", "ESP8266", "MQTT", "Edge computing", "IoT"],
  },
  {
    slug: "wedding-management-system",
    back: { href: "/#projects", label: "Back to projects" },
    scene: "calendar",
    title: "Wedding Management System",
    meta: "Project · SLIIT · Team lead of 8",
    seo: {
      title: "Wedding Management System",
      description: "A platform connecting couples with venues and vendors, built by a team of eight that I led.",
    },
    sections: [
      {
        heading: "What it is",
        paragraphs: ["A platform connecting couples with venues and vendors, with CRUD dashboards and admin panels."],
      },
      { heading: "My part", paragraphs: ["I led the eight-person team."] },
    ],
    tech: ["MongoDB", "Express", "React", "Node.js"],
  },
];
