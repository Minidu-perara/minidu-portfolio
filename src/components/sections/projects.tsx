import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { Reveal } from "@/components/fx/reveal";
import { ProjectBrowser } from "@/components/project-browser";
import { Section } from "@/components/ui/section";
import { buttonGhost } from "@/components/ui/styles";
import { profile, projects, sectionCopy } from "@/content/profile";

// Projects marked hidden (e.g. on hold) stay in the content file but off the page.
const visible = projects.filter((project) => !project.hidden);

export function ProjectsSection() {
  return (
    <Section id="projects" eyebrow={sectionCopy.projects.eyebrow} title={sectionCopy.projects.title}>
      <Reveal threshold={0.05}>
        <ProjectBrowser projects={visible} />
      </Reveal>
      <div className="mt-14 flex justify-center">
        <a href={profile.githubHref} target="_blank" rel="noopener noreferrer" className={buttonGhost}>
          <FiGithub aria-hidden className="size-4" />
          See all my projects on GitHub
          <FiArrowUpRight aria-hidden className="size-4 text-ink-3" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </Section>
  );
}
