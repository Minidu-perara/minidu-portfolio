import Link from "next/link";
import { FiArrowRight, FiArrowUpRight, FiGithub } from "react-icons/fi";
import { PlayWhenVisible } from "@/components/fx/play-when-visible";
import { Reveal } from "@/components/fx/reveal";
import { SpotlightGroup } from "@/components/fx/spotlight";
import { ProjectSceneArt } from "@/components/project-scenes";
import { Section } from "@/components/ui/section";
import { buttonGhost } from "@/components/ui/styles";
import { TagList } from "@/components/ui/tag-list";
import { profile, projects, sectionCopy, type Project } from "@/content/profile";

const sceneFrame = "bg-[radial-gradient(40rem_16rem_at_50%_0%,rgb(99_102_241/0.16),transparent_70%)] px-2";

/** "01", "02": the card's place in the list, as a quiet index. */
const index = (i: number) => String(i + 1).padStart(2, "0");

/**
 * The whole card is one link to the project's write-up: the title carries
 * the link and stretches over the card, so there is a single tab stop.
 */
function CardLink({ project }: { project: Project }) {
  const href = project.links?.caseStudy;
  if (!href) return <>{project.title}</>;
  return (
    <Link href={href} className="rounded-sm outline-offset-4 after:absolute after:inset-0 after:content-['']">
      {project.title}
    </Link>
  );
}

function ReadMore({ project }: { project: Project }) {
  if (!project.links?.caseStudy) return null;
  return (
    <p aria-hidden className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sun">
      Read the write-up
      <FiArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </p>
  );
}

/** The lead project: wide, with its diagram large and its numbers called out. */
function Feature({ project }: { project: Project }) {
  return (
    <article className="spot surface group relative grid overflow-hidden rounded-3xl lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
      <PlayWhenVisible className={`aspect-[5/2] border-b border-white/8 lg:aspect-auto lg:min-h-[22rem] lg:border-r lg:border-b-0 ${sceneFrame}`}>
        <ProjectSceneArt scene={project.scene} />
      </PlayWhenVisible>
      <div className="flex flex-col p-6 sm:p-9">
        <p className="label-mono flex items-center gap-3 text-[0.62rem] text-signal">
          <span className="text-ink-3">{index(0)}</span>
          {project.role}
        </p>
        <h3 className="display-2 mt-4 text-[clamp(1.7rem,3.2vw,2.5rem)] text-ink">
          <CardLink project={project} />
        </h3>
        <p className="mt-4 leading-relaxed text-ink-2">{project.summary}</p>
        {project.stats && (
          <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-white/8 pt-6">
            {project.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-ink-2">{stat.label}</dt>
                <dd className="text-[clamp(2rem,4vw,3rem)] leading-none font-extrabold tracking-[-0.045em] text-ink [font-variation-settings:'wdth'_115]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
        <div className="mt-7">
          <TagList items={project.tech} label={`Technologies used in ${project.title}`} />
        </div>
        <ReadMore project={project} />
      </div>
    </article>
  );
}

function Card({ project, i }: { project: Project; i: number }) {
  return (
    <article className="spot surface group relative flex h-full flex-col overflow-hidden rounded-3xl">
      <PlayWhenVisible className={`aspect-[5/2] border-b border-white/8 ${sceneFrame}`}>
        <ProjectSceneArt scene={project.scene} />
      </PlayWhenVisible>
      <div className="flex flex-1 flex-col p-6">
        <p className="label-mono flex items-center gap-3 text-[0.62rem] text-signal">
          <span className="text-ink-3">{index(i)}</span>
          {project.role}
        </p>
        <h3 className="mt-3 text-xl font-bold tracking-tight text-ink">
          <CardLink project={project} />
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">{project.summary}</p>
        <div className="mt-auto pt-6">
          <TagList items={project.tech} label={`Technologies used in ${project.title}`} />
        </div>
        <ReadMore project={project} />
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const [lead, ...rest] = projects;
  return (
    <Section id="projects" eyebrow={sectionCopy.projects.eyebrow} title={sectionCopy.projects.title}>
      <SpotlightGroup className="grid gap-5">
        {lead && (
          <Reveal threshold={0.15}>
            <Feature project={lead} />
          </Reveal>
        )}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, i) => (
            <Reveal key={project.title} threshold={0.15} className="h-full *:h-full">
              <Card project={project} i={i + 1} />
            </Reveal>
          ))}
        </div>
      </SpotlightGroup>
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
