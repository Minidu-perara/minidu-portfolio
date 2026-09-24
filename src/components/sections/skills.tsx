import type { IconType } from "react-icons";
import { FiCheckCircle, FiCode, FiCpu, FiCreditCard, FiServer, FiTerminal } from "react-icons/fi";
import { Reveal } from "@/components/fx/reveal";
import { SpotlightGroup } from "@/components/fx/spotlight";
import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag-list";
import { sectionCopy, skills, type SkillGroup } from "@/content/profile";

const icons: Record<SkillGroup["icon"], IconType> = {
  code: FiCode,
  server: FiServer,
  terminal: FiTerminal,
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
      <Reveal threshold={0.1} className="mt-14">
        <SpotlightGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => {
            const Icon = icons[group.icon];
            return (
              <article key={group.category} className="spot surface flex flex-col gap-5 p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-signal/10 text-signal ring-1 ring-signal/20">
                    <Icon aria-hidden className="size-4" />
                  </span>
                  <h3 className="font-semibold text-ink">{group.category}</h3>
                </div>
                <TagList items={group.items} label={group.category} />
              </article>
            );
          })}
        </SpotlightGroup>
      </Reveal>
    </Section>
  );
}
