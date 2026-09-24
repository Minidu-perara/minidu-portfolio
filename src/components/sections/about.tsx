import { Section } from "@/components/ui/section";
import { profile } from "@/content/profile";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="flex flex-col gap-4 leading-relaxed text-slate-400">
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
