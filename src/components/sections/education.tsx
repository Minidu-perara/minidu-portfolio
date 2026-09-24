import { Reveal } from "@/components/fx/reveal";
import { DegreeProgress } from "@/components/live/degree-progress";
import { Section } from "@/components/ui/section";
import { education, sectionCopy } from "@/content/profile";

// Build-time value; the ring refreshes to today's value in the browser.
const initialProgress = Math.min(1, Math.max(0, (Date.now() - Date.parse(education.start)) / (Date.parse(education.end) - Date.parse(education.start))));

export function EducationSection() {
  return (
    <Section id="education" eyebrow={sectionCopy.education.eyebrow} title={sectionCopy.education.title}>
      <Reveal>
        <article className="surface grid gap-8 p-6 sm:p-10 md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:gap-12">
          <DegreeProgress start={education.start} end={education.end} initial={initialProgress} label="of the way" />
          <div>
            <p className="label-mono text-[0.62rem] text-ink-3">{education.period}</p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">{education.degree}</h3>
            <p className="mt-1 font-medium text-signal">{education.institution}</p>
            <p className="mt-5 max-w-2xl leading-relaxed text-ink-2">{education.summary}</p>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
