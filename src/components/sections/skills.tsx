import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag-list";
import { skills } from "@/content/profile";

export function SkillsSection() {
  return (
    <Section id="skills" title="Skills">
      <dl className="flex flex-col gap-6">
        {skills.map((group) => (
          <div key={group.category} className="grid gap-2.5 sm:grid-cols-[8rem_1fr] sm:gap-6">
            <dt className="text-sm font-medium text-slate-300 sm:pt-1">{group.category}</dt>
            <dd>
              <TagList items={group.items} label={group.category} />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
