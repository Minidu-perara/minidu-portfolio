"use client";

import Link from "next/link";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { PlayWhenVisible } from "@/components/fx/play-when-visible";
import { SpotlightGroup } from "@/components/fx/spotlight";
import { ProjectSceneArt } from "@/components/project-scenes";
import { TagList } from "@/components/ui/tag-list";
import { projectTags, type Project, type ProjectTag } from "@/content/profile";

const sceneFrame = "bg-[radial-gradient(40rem_16rem_at_50%_0%,rgb(99_102_241/0.16),transparent_70%)] px-2";
const chip =
  "inline-flex min-h-10 items-center rounded-full px-4 text-sm font-medium ring-1 transition-colors ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal";

/**
 * The title carries the card's link and stretches over the card, so the
 * whole card is clickable with a single tab stop.
 */
function Title({ project }: { project: Project }) {
  const href = project.links?.caseStudy;
  if (!href) return <>{project.title}</>;
  return (
    <Link href={href} className="rounded-sm after:absolute after:inset-0 after:content-['']">
      {project.title}
    </Link>
  );
}

function Meta({ project }: { project: Project }) {
  return (
    <p className="label-mono flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.62rem] text-signal">
      {project.badge && (
        <span className="rounded-full bg-sun/15 px-2.5 py-1 text-sun ring-1 ring-sun/40">{project.badge}</span>
      )}
      {project.role}
    </p>
  );
}

function Tags({ project }: { project: Project }) {
  return (
    <ul aria-label="What it shows" className="flex flex-wrap gap-1.5">
      {project.tags.map((tag) => (
        <li key={tag} className="rounded-md bg-signal/10 px-2 py-0.5 font-mono text-[0.65rem] text-signal">
          {tag}
        </li>
      ))}
    </ul>
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

/** The lead card: wide, with its diagram (or its numbers) large. */
function Feature({ project }: { project: Project }) {
  return (
    <article className="spot surface group relative grid overflow-hidden rounded-3xl lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      {project.scene ? (
        <PlayWhenVisible className={`aspect-[5/2] border-b border-white/8 lg:aspect-auto lg:min-h-[22rem] lg:border-r lg:border-b-0 ${sceneFrame}`}>
          <ProjectSceneArt scene={project.scene} />
        </PlayWhenVisible>
      ) : (
        project.stats && (
          <dl className="grid grid-cols-2 content-center gap-6 border-b border-white/8 bg-[radial-gradient(36rem_18rem_at_30%_20%,rgb(99_102_241/0.18),transparent_70%)] p-6 sm:p-9 lg:grid-cols-1 lg:border-r lg:border-b-0">
            {project.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-2 text-sm text-ink-2">{stat.label}</dt>
                <dd className="text-[clamp(2.6rem,6vw,4.5rem)] leading-none font-extrabold tracking-[-0.045em] text-ink [font-variation-settings:'wdth'_115]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        )
      )}
      <div className="flex flex-col p-6 sm:p-9">
        <Meta project={project} />
        <h3 className="display-2 mt-4 text-[clamp(1.7rem,3.2vw,2.5rem)] text-ink">
          <Title project={project} />
        </h3>
        <p className="mt-4 leading-relaxed text-ink-2">{project.summary}</p>
        {project.scene && project.stats && (
          <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-white/8 pt-6">
            {project.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-ink-2">{stat.label}</dt>
                <dd className="text-[clamp(2rem,4vw,3rem)] leading-none font-extrabold tracking-[-0.045em] text-ink">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="mt-7 space-y-3">
          <Tags project={project} />
          <TagList items={project.tech} label={`Technologies used in ${project.title}`} />
        </div>
        <ReadMore project={project} />
      </div>
    </article>
  );
}

function Card({ project }: { project: Project }) {
  return (
    <article className="spot surface group relative flex h-full flex-col rounded-3xl p-6">
      <Meta project={project} />
      <h3 className="mt-3 text-xl font-bold tracking-tight text-ink">
        <Title project={project} />
      </h3>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">{project.summary}</p>
      <div className="mt-auto space-y-3 pt-6">
        <Tags project={project} />
        <TagList items={project.tech} label={`Technologies used in ${project.title}`} />
      </div>
      <ReadMore project={project} />
    </article>
  );
}

/**
 * Projects with a tag filter. The first project that matches the filter
 * gets the wide feature card; the rest follow as compact cards.
 */
export function ProjectBrowser({ projects }: { projects: Project[] }) {
  const [tag, setTag] = useState<ProjectTag | null>(null);
  const shown = tag ? projects.filter((project) => project.tags.includes(tag)) : projects;
  const [lead, ...rest] = shown;
  const options: (ProjectTag | null)[] = [null, ...projectTags];

  return (
    <div>
      <div role="group" aria-label="Filter projects by what they show" className="mb-8 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option === tag;
          return (
            <button
              key={option ?? "all"}
              type="button"
              aria-pressed={active}
              onClick={() => setTag(option)}
              className={`${chip} ${active ? "bg-signal/15 text-ink ring-signal/50" : "bg-white/[0.03] text-ink-2 ring-white/12 hover:text-ink hover:ring-white/25"}`}
            >
              {option ?? "All"}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="sr-only">
        {shown.length} {shown.length === 1 ? "project" : "projects"} shown
      </p>
      <SpotlightGroup className="grid gap-5">
        {lead && <Feature key={lead.title} project={lead} />}
        {rest.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((project) => (
              <Card key={project.title} project={project} />
            ))}
          </div>
        )}
      </SpotlightGroup>
    </div>
  );
}
