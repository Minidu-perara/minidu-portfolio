import type { ReactNode } from "react";
import { Reveal } from "@/components/fx/reveal";

/** A top-level page section: anchor target, path-style eyebrow and a statement heading. */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="shell py-24 sm:py-32">
      <Reveal threshold={0.2}>
        <header className="mb-12 max-w-3xl sm:mb-16">
          <p className="label-mono flex items-center gap-3 text-signal">
            <span aria-hidden className="h-px w-8 bg-linear-to-r from-signal to-transparent" />
            ~/{eyebrow}
          </p>
          <h2 id={`${id}-heading`} className="display-2 mt-5 text-[clamp(2.1rem,5vw,3.9rem)]">
            {title}
          </h2>
          {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">{intro}</p>}
        </header>
      </Reveal>
      {children}
    </section>
  );
}
