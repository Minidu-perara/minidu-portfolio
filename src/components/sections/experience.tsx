import { PhotoLightbox } from "@/components/photo-lightbox";
import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag-list";
import { experience } from "@/content/profile";

export function ExperienceSection() {
  return (
    <Section id="experience" title="Experience">
      <ol className="flex flex-col gap-12 border-l border-white/10 pl-6 sm:pl-8">
        {experience.map((job) => (
          <li key={`${job.company}-${job.role}`} className="relative">
            <span
              aria-hidden
              className="absolute top-1.5 -left-[29px] size-2.5 rounded-full bg-indigo-300 ring-4 ring-indigo-300/15 sm:-left-[37px]"
            />
            <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">{job.period}</p>
            <h3 className="mt-1.5 font-semibold text-slate-100">
              {job.role} <span className="text-slate-500">·</span> <span className="text-indigo-200">{job.company}</span>
            </h3>
            <p className="mt-1 text-sm text-slate-500">{job.context}</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm leading-relaxed text-slate-400">
              {job.highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-indigo-300/70" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <TagList items={job.tech} label={`Technologies used at ${job.company}`} />
            </div>
            {job.photo && (
              <div className="mt-6">
                <PhotoLightbox photo={job.photo} caption={`With the ${job.company} team`} />
              </div>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
