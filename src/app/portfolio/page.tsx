import type { Metadata } from "next";
import Image from "next/image";
import { PhotoLightbox } from "@/components/portfolio/photo-lightbox";
import { PortfolioSection } from "@/components/portfolio/portfolio-section";
import { SectionNav, type NavSection } from "@/components/portfolio/section-nav";
import { ResumeDownload } from "@/components/resume-download";
import { education, experience, profile, projects, skills } from "@/content/profile";

export const metadata: Metadata = {
  title: "Portfolio",
  description: `Education, work experience, projects and skills of ${profile.name}.`,
};

const sections: NavSection[] = [
  { id: "intro", label: "Introduction" },
  { id: "education", label: "Education" },
  { id: "work", label: "Work Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
];

export default function PortfolioPage() {
  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 md:grid md:grid-cols-[12rem_minmax(0,1fr)] md:gap-12 md:px-8 md:pt-8">
      <SectionNav sections={sections} />

      <main id="main" className="flex min-w-0 flex-col gap-20 md:gap-24">
        <section
          id="intro"
          aria-labelledby="intro-title"
          className="flex w-full flex-col items-center gap-8 lg:flex-row lg:justify-between"
        >
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <Image
              src={profile.photo.src}
              alt={profile.photo.alt}
              width={160}
              height={160}
              placeholder="blur"
              className="size-40 shrink-0 rounded-xl border-4 border-indigo-900 object-cover shadow-lg"
            />
            <div className="text-center md:text-left">
              <h1 id="intro-title" className="mb-1 text-2xl font-bold text-indigo-200">
                Welcome to my portfolio!
              </h1>
              <p className="mb-2 text-2xl font-bold text-white md:text-3xl">{profile.headline}</p>
              <p className="text-lg text-gray-300">
                Here you&apos;ll find my education, work experience, projects, and skills.
              </p>
            </div>
          </div>
          <ResumeDownload />
        </section>

        <PortfolioSection id="education" title="Education">
          <article className="card">
            <h3 className="mb-1 text-xl font-extrabold text-white md:text-2xl">{education.degree}</h3>
            <p className="mb-1 text-lg font-semibold text-pink-200">{education.institution}</p>
            <p className="mb-2 text-sm text-gray-400">{education.period}</p>
            <hr className="mb-4 border-white/10" />
            <p className="max-w-prose leading-relaxed text-gray-200">{education.summary}</p>
          </article>
        </PortfolioSection>

        <PortfolioSection id="work" title="Work Experience">
          <ul className="flex flex-col gap-6">
            {experience.map((job) => (
              <li key={`${job.company}-${job.role}`} className="card flex flex-col gap-8 md:flex-row md:items-start lg:gap-12">
                {job.photo && <PhotoLightbox photo={job.photo} />}
                <div className="min-w-0 flex-1">
                  <h3 className="mb-1 font-semibold text-white">{job.role}</h3>
                  <p className="mb-1 text-gray-400">
                    {job.company} | {job.period}
                  </p>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                    {job.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </PortfolioSection>

        <PortfolioSection id="projects" title="Projects">
          <ul className="flex flex-col gap-6">
            {projects.map((project) => (
              <li
                key={project.title}
                className="card transition-transform duration-200 hover:scale-[1.01] hover:shadow-xl motion-reduce:hover:scale-100"
              >
                <h3 className="mb-1 text-lg font-bold text-indigo-100">{project.title}</h3>
                <p className="mb-2 text-sm text-gray-400">
                  {project.role} <span className="font-mono text-pink-200">— {project.stack}</span>
                </p>
                <ul className="list-inside list-disc space-y-1 text-gray-200">
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </PortfolioSection>

        <PortfolioSection id="skills" title="Skills">
          <div className="card flex flex-col gap-5">
            {skills.map((group) => (
              <div key={group.category}>
                <h3 className="mb-2 text-[11px] font-bold tracking-widest text-gray-400 uppercase">{group.category}</h3>
                <ul className="flex flex-wrap gap-3">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-indigo-700/30 bg-indigo-900/40 px-3 py-1 text-sm text-gray-200"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </PortfolioSection>
      </main>
    </div>
  );
}
