"use client";

import { useEffect, useRef, useState } from "react";

export type NavSection = { id: string; label: string };

/** A section becomes current once its top passes this fraction of the viewport. */
const ACTIVATION_LINE = 0.35;

function useActiveSection(sections: readonly NavSection[]) {
  const [active, setActive] = useState<string | undefined>(undefined);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        setActive(sections.at(-1)?.id);
        return;
      }
      const line = window.innerHeight * ACTIVATION_LINE;
      let current: string | undefined;
      for (const { id } of sections) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line) current = id;
      }
      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sections]);

  return active;
}

/** Desktop: vertical list in the sticky intro column. */
export function SidebarNav({ sections }: { sections: readonly NavSection[] }) {
  const active = useActiveSection(sections);

  return (
    <nav aria-label="Sections" className="hidden lg:block">
      <ul className="flex flex-col gap-1">
        {sections.map(({ id, label }) => {
          const isActive = id === active;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                className="group flex items-center gap-4 py-1.5 text-xs font-bold tracking-widest uppercase focus-visible:outline-none"
              >
                <span
                  aria-hidden
                  className={`h-px transition-all duration-300 motion-reduce:transition-none ${
                    isActive
                      ? "w-16 bg-linear-to-r from-indigo-300 to-pink-300"
                      : "w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200"
                  }`}
                />
                <span
                  className={`transition-colors ${
                    isActive
                      ? "text-slate-100"
                      : "text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200"
                  }`}
                >
                  {label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Mobile and tablet: a sticky, horizontally scrolling bar of section chips. */
export function SectionBar({ sections }: { sections: readonly NavSection[] }) {
  const active = useActiveSection(sections);
  const listRef = useRef<HTMLUListElement>(null);

  // Keep the current chip centred. Scrolls only the bar, never the page.
  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>("[aria-current]");
    if (!list || !item || list.scrollWidth <= list.clientWidth) return;
    const offset = item.getBoundingClientRect().left - list.getBoundingClientRect().left;
    list.scrollTo({ left: list.scrollLeft + offset - (list.clientWidth - item.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Sections"
      className="sticky top-0 z-30 -mx-6 mb-12 border-y border-white/5 bg-black/75 backdrop-blur-lg md:-mx-12 lg:hidden"
    >
      <ul
        ref={listRef}
        className="flex gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] md:px-12 [&::-webkit-scrollbar]:hidden"
      >
        {sections.map(({ id, label }) => {
          const isActive = id === active;
          return (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                className={`block rounded-full px-3.5 py-1.5 text-sm font-medium whitespace-nowrap ring-1 transition-colors ring-inset focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:outline-none ${
                  isActive
                    ? "bg-indigo-400/15 text-indigo-100 ring-indigo-300/40"
                    : "text-slate-400 ring-white/10 hover:text-slate-100"
                }`}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
