import { FiPlus } from "react-icons/fi";
import { Reveal } from "@/components/fx/reveal";
import { ServiceSection } from "@/components/services/service-section";
import { services } from "@/content/profile";

const { faq } = services;

/** Plain <details> elements: they open and close without any script. */
export function ServicesFaq() {
  return (
    <ServiceSection id="faq" eyebrow={faq.eyebrow} title={faq.title}>
      <Reveal threshold={0.15}>
        <div className="max-w-3xl divide-y divide-white/8 border-y border-white/8">
          {faq.items.map((item) => (
            <details key={item.q} name="faq" className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold text-ink transition-colors hover:text-sun sm:text-xl [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/[0.05] ring-1 ring-white/10 transition-[transform,background-color] duration-300 group-open:rotate-45 group-open:bg-sun group-open:text-void">
                  <FiPlus aria-hidden className="size-4" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-lg leading-relaxed text-ink-2">{item.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </ServiceSection>
  );
}
