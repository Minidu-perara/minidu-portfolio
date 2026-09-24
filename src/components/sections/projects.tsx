import { FiArrowUpRight } from "react-icons/fi";
import { Section } from "@/components/ui/section";
import { textLink } from "@/components/ui/styles";
import { TagList } from "@/components/ui/tag-list";
import { profile, projects } from "@/content/profile";

export function ProjectsSection() {
  return (
    <Section id="projects" title="Projects">
      <ul className="grid gap-4">
        {projects.map((project) => (
          <li
            key={project.title}
            className="rounded-2xl bg-white/2 p-5 ring-1 ring-white/5 transition hover:bg-white/4 hover:ring-white/10 sm:p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-semibold text-slate-100">{project.title}</h3>
              <p className="text-xs font-medium text-slate-500">{project.role}</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{project.summary}</p>
            <div className="mt-4">
              <TagList items={project.tech} label={`Technologies used in ${project.title}`} />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm">
        <a href={profile.githubHref} target="_blank" rel="noopener noreferrer" className={`${textLink} inline-flex items-center gap-1`}>
          More on GitHub
          <FiArrowUpRight aria-hidden className="size-4" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </p>
    </Section>
  );
}
