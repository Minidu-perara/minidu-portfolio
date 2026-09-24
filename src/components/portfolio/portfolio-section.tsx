import type { ReactNode } from "react";

export function PortfolioSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="w-full max-w-4xl">
      <h2 id={`${id}-title`} className="mb-2 text-2xl font-bold text-indigo-200">
        {title}
      </h2>
      <hr className="mb-6 border-white/10" />
      {children}
    </section>
  );
}
