import type { CSSProperties } from "react";
import { PlayWhenVisible } from "@/components/fx/play-when-visible";
import { Reveal } from "@/components/fx/reveal";
import { ServiceSection } from "@/components/services/service-section";
import { services } from "@/content/profile";

const { steps } = services;

export function ServicesSteps() {
  return (
    <ServiceSection id="start" eyebrow={steps.eyebrow} title={steps.title}>
      <Reveal threshold={0.25}>
        {/* A signal runs from step to step, and each number fires as it lands. */}
        <PlayWhenVisible>
          <ol className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.items.map((step, i) => (
              <li key={step.title} className="relative flex gap-4 lg:flex-col" style={{ "--i": i } as CSSProperties}>
                {/* Connector to the next step: down on phones, across on wide screens. */}
                {i < steps.items.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute top-12 -bottom-6 left-[1.375rem] w-px bg-linear-to-b from-sun/50 to-sun/10 sm:hidden lg:top-[1.375rem] lg:-right-5 lg:bottom-auto lg:left-14 lg:block lg:h-px lg:w-auto lg:bg-linear-to-r"
                  >
                    <span className="svc-impulse" />
                  </span>
                )}
                <span className="svc-fire relative grid size-11 shrink-0 place-items-center rounded-full bg-sun text-lg font-bold text-void">
                  {i + 1}
                </span>
                <div className="pt-1.5 lg:pt-0">
                  <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1 leading-relaxed text-ink-2">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </PlayWhenVisible>
      </Reveal>
    </ServiceSection>
  );
}
