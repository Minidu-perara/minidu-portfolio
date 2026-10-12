import { FiCheck } from "react-icons/fi";
import { Reveal } from "@/components/fx/reveal";
import { ServiceSection } from "@/components/services/service-section";
import { services } from "@/content/profile";

const { why } = services;

export function ServicesWhy() {
  return (
    <ServiceSection id="why" eyebrow={why.eyebrow} title={why.title}>
      <Reveal threshold={0.25}>
        <ul className="grid max-w-3xl gap-5">
          {why.facts.map((fact) => (
            <li key={fact} className="flex gap-4 text-lg leading-snug text-ink sm:text-xl">
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-signal/12 text-signal ring-1 ring-signal/40">
                <FiCheck aria-hidden className="size-4" />
              </span>
              {fact}
            </li>
          ))}
        </ul>
      </Reveal>
    </ServiceSection>
  );
}
