import { profile } from "@/content/profile";

/** Three at-a-glance facts shown before the rest of the content. */
export function Highlights() {
  return (
    <section aria-label="Highlights" className="motion-safe:animate-fade-up motion-safe:[animation-delay:250ms]">
      <ul className="grid gap-3 sm:grid-cols-3">
        {profile.highlights.map(({ value, label }) => (
          <li key={value} className="rounded-2xl bg-white/3 px-5 py-4 ring-1 ring-white/5">
            <p className="text-2xl font-bold tracking-tight text-slate-50">{value}</p>
            <p className="mt-1 text-sm leading-snug text-slate-400">{label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
