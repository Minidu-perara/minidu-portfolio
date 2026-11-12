import type { IconType } from "react-icons";
import { FiCheckCircle, FiCloud, FiCode, FiCpu, FiCreditCard, FiServer, FiTerminal, FiZap } from "react-icons/fi";
import { Reveal } from "@/components/fx/reveal";
import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag-list";
import { sectionCopy, skills, type SkillGroup } from "@/content/profile";

const icons: Record<SkillGroup["icon"], IconType> = {
  code: FiCode,
  server: FiServer,
  terminal: FiTerminal,
  cloud: FiCloud,
  ai: FiZap,
  check: FiCheckCircle,
  bank: FiCreditCard,
  cpu: FiCpu,
};

const allSkills = skills.flatMap((group) => group.items);
const rows = [allSkills.slice(0, Math.ceil(allSkills.length / 2)), allSkills.slice(Math.ceil(allSkills.length / 2))];

function MarqueeRow({ items, outlined }: { items: string[]; outlined?: boolean }) {
  const content = [...items, ...items]; // two copies make the loop seamless
  return (
    <div className="marquee overflow-hidden py-1">
      <div className="marquee-track gap-8 pr-8" data-reverse={outlined ? "" : undefined}>
        {content.map((item, i) => (
          <span
            key={i}
            className={`flex shrink-0 items-center gap-8 text-[clamp(1.8rem,4.5vw,3.6rem)] leading-none font-extrabold whitespace-nowrap uppercase [font-variation-settings:'wdth'_115] ${
              outlined ? "text-void [-webkit-text-stroke:2px_rgb(165_180_252/0.5)] [paint-order:stroke_fill]" : "text-ink/85"
            }`}
          >
            {item}
            <span className="text-[0.5em] text-signal">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
  return (
    <Section id="stack" eyebrow={sectionCopy.skills.eyebrow} title={sectionCopy.skills.title}>
      <div aria-hidden className="mx-[calc(50%-50vw)] space-y-3 border-y border-white/6 bg-white/[0.012] py-6">
        <MarqueeRow items={rows[0]!} />
        <MarqueeRow items={rows[1]!} outlined />
      </div>
      {/* An index, not a wall of cards: one row per area, read left to right. */}
      <Reveal threshold={0.1} className="mt-14">
        <ul className="border-t border-white/8">
          {skills.map((group, i) => {
            const Icon = icons[group.icon];
            return (
              <li
                key={group.category}
                className="group grid gap-x-8 gap-y-4 border-b border-white/8 py-6 transition-colors duration-300 hover:bg-signal/[0.035] sm:grid-cols-[2.5rem_minmax(0,15rem)_minmax(0,1fr)] sm:items-center sm:px-3 sm:py-7"
              >
                <span aria-hidden className="label-mono hidden text-[0.62rem] text-ink-3 sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="flex items-center gap-3 text-xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-signal sm:text-2xl">
                  <Icon aria-hidden className="size-5 shrink-0 text-signal" />
                  {group.category}
                </h3>
                <TagList items={group.items} label={group.category} />
              </li>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}
