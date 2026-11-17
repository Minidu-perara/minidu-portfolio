import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { CareerLog } from "@/components/career-log";
import { Reveal } from "@/components/fx/reveal";
import { PhotoLightbox } from "@/components/photo-lightbox";
import { Section } from "@/components/ui/section";
import { textLink } from "@/components/ui/styles";
import { TagList } from "@/components/ui/tag-list";
import { experience, sectionCopy } from "@/content/profile";

/**
 * On large screens the role card and the career log stay pinned while the
 * section scrolls past, and the log fills in line by line.
 */
export function ExperienceSection() {
  // The internship (with its career log) is pinned; other roles are compact cards above it.
  const job = experience.find((role) => role.log)!;
  const others = experience.filter((role) => role !== job);
  return (
    <Section id="experience" eyebrow={sectionCopy.experience.eyebrow} title={sectionCopy.experience.title} intro={sectionCopy.experience.intro}>
      {others.map((role) => (
        <Reveal key={role.role} className="mb-6">
          <article className="surface grid gap-4 p-6 sm:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
            <div>
              <p className="label-mono text-[0.62rem] text-ink-3">{role.period}</p>
              <h3 className="mt-3 text-2xl leading-tight font-bold tracking-tight text-ink">{role.role}</h3>
              <p className="mt-1 text-sm text-ink-3">{role.context}</p>
            </div>
            <ul className="space-y-3 lg:pt-6">
              {role.highlights.map((point) => (
                <li key={point} className="flex gap-3 leading-relaxed text-ink-2">
                  <span aria-hidden className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-signal" />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      ))}
      <div className="grid gap-6 lg:min-h-[175vh] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <article className="surface p-6 sm:p-8">
            <p className="label-mono text-[0.62rem] text-ink-3">{job.period}</p>
            <h3 className="mt-4 text-2xl leading-tight font-bold tracking-tight text-ink sm:text-[1.7rem]">{job.role}</h3>
            <p className="mt-2 font-semibold text-signal">{job.company}</p>
            <p className="mt-1 text-sm text-ink-3">{job.context}</p>
            <p className="mt-6 leading-relaxed text-ink-2">{job.highlights[0]}</p>
            {job.caseStudy && (
              <Link href={job.caseStudy} className={`${textLink} mt-4 min-h-11`}>
                Read the case study
                <FiArrowRight aria-hidden className="size-4" />
              </Link>
            )}
            <div className="mt-6">
              <TagList items={job.tech} label={`Technologies used at ${job.company}`} />
            </div>
            {job.photo && (
              <div className="mt-7 border-t border-white/8 pt-6">
                <PhotoLightbox photo={job.photo} caption={`With the ${job.company} team`} />
              </div>
            )}
          </article>
        </Reveal>
        <Reveal threshold={0.1} className="lg:sticky lg:top-28 lg:self-start">
          <CareerLog entries={job.log ?? []} sectionId="experience" />
        </Reveal>
      </div>
    </Section>
  );
}
