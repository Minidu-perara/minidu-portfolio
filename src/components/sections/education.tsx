import { Section } from "@/components/ui/section";
import { education } from "@/content/profile";

export function EducationSection() {
  return (
    <Section id="education" title="Education">
      <article className="rounded-2xl bg-white/2 p-5 ring-1 ring-white/5 sm:p-6">
        <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">{education.period}</p>
        <h3 className="mt-1.5 font-semibold text-slate-100">{education.degree}</h3>
        <p className="mt-0.5 text-sm text-indigo-200">{education.institution}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">{education.summary}</p>
      </article>
    </Section>
  );
}
