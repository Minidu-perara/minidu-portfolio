import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { PlayWhenVisible } from "@/components/fx/play-when-visible";
import { Reveal } from "@/components/fx/reveal";
import { SpotlightGroup } from "@/components/fx/spotlight";
import { Tilt } from "@/components/fx/tilt";
import { ProjectSceneArt } from "@/components/project-scenes";
import { Section } from "@/components/ui/section";
import { buttonGhost, textLink } from "@/components/ui/styles";
import { TagList } from "@/components/ui/tag-list";
import { profile, projects, sectionCopy, type ProjectLinks } from "@/content/profile";

const linkLabels: Record<keyof ProjectLinks, string> = { caseStudy: "Case study", demo: "Demo", repo: "Code" };

export function ProjectsSection() {
  return (
    <Section id="projects" eyebrow={sectionCopy.projects.eyebrow} title={sectionCopy.projects.title}>
      <SpotlightGroup className="grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => {
          const links = Object.entries(project.links ?? {}).filter(([, href]) => href) as [keyof ProjectLinks, string][];
          return (
            <Reveal key={project.title} threshold={0.15} className={i % 2 === 1 ? "md:translate-y-12" : undefined}>
              <Tilt className="h-full">
                <article className="spot surface flex h-full flex-col overflow-hidden rounded-3xl">
                  <PlayWhenVisible className="aspect-[5/2] border-b border-white/8 bg-[radial-gradient(40rem_16rem_at_50%_0%,rgb(99_102_241/0.14),transparent_70%)] px-2">
                    <ProjectSceneArt scene={project.scene} />
                  </PlayWhenVisible>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="label-mono text-[0.62rem] text-signal">{project.role}</p>
                    <h3 className="mt-3 text-xl font-bold tracking-tight text-ink sm:text-2xl">{project.title}</h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">{project.summary}</p>
                    <div className="mt-auto pt-6">
                      <TagList items={project.tech} label={`Technologies used in ${project.title}`} />
                    </div>
                    {links.length > 0 && (
                      <ul aria-label={`${project.title} links`} className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                        {links.map(([kind, href]) => (
                          <li key={kind}>
                            <a href={href} target="_blank" rel="noopener noreferrer" className={textLink}>
                              {linkLabels[kind]}
                              <FiArrowUpRight aria-hidden className="size-4" />
                              <span className="sr-only">(opens in a new tab)</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              </Tilt>
            </Reveal>
          );
        })}
      </SpotlightGroup>
      <div className="mt-16 flex justify-center md:mt-24">
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
