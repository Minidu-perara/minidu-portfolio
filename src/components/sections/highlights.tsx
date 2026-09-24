import { CountUp } from "@/components/fx/count-up";
import { Reveal } from "@/components/fx/reveal";
import { SpotlightGroup } from "@/components/fx/spotlight";
import { TagList } from "@/components/ui/tag-list";
import { experience } from "@/content/profile";

const tile = "spot surface flex flex-col p-6 sm:p-7";
const label = "label-mono text-[0.62rem] text-ink-3";
const bigNumber = "font-extrabold leading-none tracking-[-0.045em] [font-variation-settings:'wdth'_115]";

// Aug 2024 → Aug 2025 as 13 monthly ticks; the internship runs Nov → May.
const MONTHS = ["A", "S", "O", "N", "D", "J", "F", "M", "A", "M", "J", "J", "A"];
const START = 3;
const END = 9;

function Timeline() {
  const step = 100 / (MONTHS.length - 1);
  return (
    <div aria-hidden className="pt-2">
      <div className="relative h-10">
        <div className="absolute inset-x-0 top-3 h-px bg-white/10" />
        <div
          className="absolute top-[11px] h-[3px] rounded-full bg-linear-to-r from-pulse to-signal shadow-[0_0_16px_rgba(165,180,252,0.6)]"
          style={{ left: `${START * step}%`, width: `${(END - START) * step}%` }}
        />
        {MONTHS.map((month, i) => (
          <span key={i} className="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-2" style={{ left: `${i * step}%` }}>
            <span className={`h-2 w-px ${i >= START && i <= END ? "bg-signal" : "bg-white/20"}`} />
            <span className={`font-mono text-[0.6rem] ${i >= START && i <= END ? "text-ink-2" : "text-ink-3/60"}`}>{month}</span>
          </span>
        ))}
      </div>
      <div className="mt-3 flex justify-between font-mono text-[0.62rem] text-ink-3">
        <span>Nov 2024</span>
        <span>May 2025</span>
      </div>
    </div>
  );
}

function Bar({ label: name, value, accent = false }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="grid grid-cols-[3.5rem_1fr_2rem] items-center gap-3 font-mono text-[0.68rem] text-ink-3">
      <span>{name}</span>
      <span className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <span
          className={`block h-full rounded-full ${accent ? "bg-linear-to-r from-pulse to-signal" : "bg-white/25"}`}
          style={{ width: `${value}%` }}
        />
      </span>
      <span className="text-right tabular-nums text-ink-2">{value}</span>
    </div>
  );
}

function TeamDots({ size }: { size: number }) {
  return (
    <div>
      <div aria-hidden className="grid w-fit grid-cols-4 gap-1.5">
        {Array.from({ length: size }, (_, i) => (
          <span key={i} className="size-2.5 rounded-full bg-signal/80 shadow-[0_0_10px_rgba(165,180,252,0.5)]" />
        ))}
      </div>
      <p className="mt-2 font-mono text-[0.65rem] text-ink-3">{size} people</p>
    </div>
  );
}

/** At-a-glance facts between the hero and About, as a spotlight bento grid. */
export function Highlights() {
  return (
    <section aria-label="Highlights" className="shell pt-6 sm:pt-10">
      <Reveal threshold={0.1}>
        <SpotlightGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <article className={`${tile} gap-8 sm:col-span-2 lg:col-span-2 lg:row-span-2`}>
            <p className={label}>Time in production</p>
            <Timeline />
            <div className="mt-auto">
              <p className="flex items-baseline gap-3">
                <span className={`${bigNumber} text-[7rem] sm:text-[8.5rem]`}>
                  <CountUp value={6} />
                </span>
                <span className="text-2xl font-semibold text-ink-2">months</span>
              </p>
              <p className="mt-3 max-w-[17rem] text-ink-2">on a live production banking system, on-site with the people who used it</p>
            </div>
          </article>

          <article className={`${tile} lg:col-span-2`}>
            <p className={label}>After my solution went live</p>
            <p className={`${bigNumber} mt-6 text-5xl`}>
              <CountUp value={30} prefix="~" suffix="%" />
            </p>
            <p className="mt-2 text-ink-2">fewer rejected loan disbursements</p>
            <div className="mt-6 space-y-2">
              <Bar label="Before" value={100} />
              <Bar label="After" value={70} accent />
            </div>
            <p className="mt-3 text-[0.7rem] text-ink-3">Rejections, indexed to 100 before deployment</p>
          </article>

          <article className={`${tile} lg:col-span-2`}>
            <p className={label}>Teams led at SLIIT</p>
            <p className="mt-6 flex items-baseline gap-3">
              <span className={`${bigNumber} text-5xl`}>
                <CountUp value={3} />
              </span>
              <span className="text-xl font-semibold text-ink-2">teams</span>
            </p>
            <div className="mt-auto flex items-end gap-6 pt-6">
              <TeamDots size={4} />
              <TeamDots size={5} />
              <TeamDots size={8} />
            </div>
          </article>

          <article className={`${tile} lg:col-span-2`}>
            <p className={label}>On the live system</p>
            <p className="mt-6 text-xl leading-snug font-semibold text-ink">The stack I shipped to production with</p>
            <div className="mt-auto pt-6">
              <TagList items={experience[0]!.tech} label="Technologies used in production" />
            </div>
          </article>

          <article className={`${tile} lg:col-span-2`}>
            <p className={label}>Graduating</p>
            <p className={`${bigNumber} mt-6 text-5xl`}>Oct 2026</p>
            <p className="mt-auto pt-4 text-ink-2">BSc (Hons) IT, SLIIT · final semester</p>
          </article>
        </SpotlightGroup>
      </Reveal>
    </section>
  );
}
