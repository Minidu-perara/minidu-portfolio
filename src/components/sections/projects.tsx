import { FiArrowUpRight } from "react-icons/fi";
import { Section } from "@/components/ui/section";
import { textLink } from "@/components/ui/styles";
import { TagList } from "@/components/ui/tag-list";
import { profile, projects, type ProjectLinks } from "@/content/profile";

const linkLabels: Record<keyof ProjectLinks, string> = {
  caseStudy: "Case study",
  demo: "Demo",
  repo: "Code",
};

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${textLink} inline-flex items-center gap-1`}>
      {children}
      <FiArrowUpRight aria-hidden className="size-4" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function ProjectsSection() {
  return (
    <Section id="projects" title="Projects">
      <ul className="grid gap-4">
        {projects.map((project) => {
          const links = Object.entries(project.links ?? {}).filter(([, href]) => href) as [keyof ProjectLinks, string][];
          return (
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
              {links.length > 0 && (
                <ul aria-label={`${project.title} links`} className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  {links.map(([kind, href]) => (
                    <li key={kind}>
                      <ExternalLink href={href}>{linkLabels[kind]}</ExternalLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      <p className="mt-8 text-sm">
        <ExternalLink href={profile.githubHref}>See all my projects on GitHub</ExternalLink>
      </p>
    </Section>
  );
}
