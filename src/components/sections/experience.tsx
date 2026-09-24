import { CareerLog } from "@/components/career-log";
import { Reveal } from "@/components/fx/reveal";
import { PhotoLightbox } from "@/components/photo-lightbox";
import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag-list";
import { experience, sectionCopy } from "@/content/profile";

/**
 * On large screens the role card and the career log stay pinned while the
 * section scrolls past, and the log fills in line by line.
 */
export function ExperienceSection() {
  const job = experience[0]!;
  return (
    <Section id="experience" eyebrow={sectionCopy.experience.eyebrow} title={sectionCopy.experience.title} intro={sectionCopy.experience.intro}>
      <div className="grid gap-6 lg:min-h-[175vh] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <article className="surface p-6 sm:p-8">
            <p className="label-mono text-[0.62rem] text-ink-3">{job.period}</p>
            <h3 className="mt-4 text-2xl leading-tight font-bold tracking-tight text-ink sm:text-[1.7rem]">{job.role}</h3>
            <p className="mt-2 font-semibold text-signal">{job.company}</p>
            <p className="mt-1 text-sm text-ink-3">{job.context}</p>
            <p className="mt-6 leading-relaxed text-ink-2">{job.highlights[0]}</p>
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
          <CareerLog entries={job.log} sectionId="experience" />
        </Reveal>
      </div>
    </Section>
  );
}
