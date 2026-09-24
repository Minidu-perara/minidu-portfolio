import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

/** A top-level page section: anchor target, labelled heading, reveal-on-scroll. */
export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <Reveal threshold={0.1}>
        <h2
          id={`${id}-heading`}
          className="mb-8 flex items-center gap-3 text-sm font-bold tracking-widest text-slate-100 uppercase"
        >
          <span aria-hidden className="h-px w-6 bg-indigo-300" />
          {title}
        </h2>
        {children}
      </Reveal>
    </section>
  );
}
