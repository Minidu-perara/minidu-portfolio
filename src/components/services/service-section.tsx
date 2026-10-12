import type { ReactNode } from "react";
import { Reveal } from "@/components/fx/reveal";
import { RiseWords } from "@/components/ui/rise-words";

/**
 * A /services section. Like the home page's Section, but with a plain-word
 * eyebrow (no ~/path) and tighter spacing for phones.
 */
export function ServiceSection({
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
    <section id={id} aria-labelledby={`${id}-heading`} className="shell py-16 sm:py-24">
      <Reveal threshold={0.2}>
        <header className="mb-10 max-w-3xl sm:mb-14">
          <p className="label-mono flex items-center gap-3 text-signal">
            <span aria-hidden className="signal-line h-px w-8 bg-linear-to-r from-signal to-transparent" />
            {eyebrow}
          </p>
          <h2 id={`${id}-heading`} className="display-2 mt-4 text-[clamp(1.9rem,5vw,3.4rem)]">
            <RiseWords text={title} />
          </h2>
          {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">{intro}</p>}
        </header>
      </Reveal>
      {children}
    </section>
  );
}
