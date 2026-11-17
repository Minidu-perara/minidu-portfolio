import { Reveal } from "@/components/fx/reveal";
import { HoloBadge } from "@/components/holo-badge";
import { Section } from "@/components/ui/section";
import { profile, sectionCopy } from "@/content/profile";

export function About() {
  const { paragraphs } = profile.about;
  return (
    <Section id="about" eyebrow={sectionCopy.about.eyebrow} title={sectionCopy.about.title}>
      <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-20">
        <div>
          <Reveal>
            <div className="space-y-6 text-lg leading-relaxed text-ink-2">
              {paragraphs.map((paragraph, i) => (
                <p key={paragraph} className={i === 0 ? "text-xl leading-snug text-ink sm:text-2xl sm:leading-snug" : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal threshold={0.25} className="lg:pt-2">
          <HoloBadge
            photo={profile.photo.src}
            photoAlt={profile.photo.alt}
            name={profile.name}
            role={profile.role}
            fields={[
              { label: "Base", value: "Colombo, LK" },
              { label: "Status", value: profile.availability },
              { label: "Grad", value: "Dec 2026" },
            ]}
            serial="MP-2026-AI"
          />
          <p className="label-mono mt-4 hidden text-center text-[0.6rem] text-ink-3 pointer-fine:block">Move your pointer over the badge</p>
        </Reveal>
      </div>
    </Section>
  );
}
