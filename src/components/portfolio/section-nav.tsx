"use client";

import { useEffect, useRef, useState } from "react";

export type NavSection = { id: string; label: string };

/** How far down the viewport a section's top must pass to become "current". */
const ACTIVATION_OFFSET = 0.35;

/**
 * Scroll-spy navigation for the portfolio page: a sticky horizontal bar on
 * small screens and a sticky sidebar from the `md` breakpoint up.
 */
export function SectionNav({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(sections.at(-1)?.id);
        return;
      }
      const line = window.innerHeight * ACTIVATION_OFFSET;
      let current = sections[0]?.id;
      for (const { id } of sections) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  // On small screens the list scrolls sideways; keep the current section's chip
  // centred. Scrolls only the list, so it never fights the page's own scrolling.
  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>("[aria-current]");
    if (!list || !item || list.scrollWidth <= list.clientWidth) return;
    const offset = item.getBoundingClientRect().left - list.getBoundingClientRect().left;
    list.scrollTo({ left: list.scrollLeft + offset - (list.clientWidth - item.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Portfolio sections"
      className="sticky top-0 z-20 -mx-4 mb-10 border-b border-white/10 bg-black/70 px-4 py-3 backdrop-blur-md md:top-8 md:mx-0 md:mb-0 md:self-start md:border-b-0 md:bg-transparent md:p-0 md:backdrop-blur-none"
    >
      <p className="mb-2 hidden text-[11px] font-bold tracking-widest text-gray-400 uppercase md:block">Portfolio</p>
      <ul
        ref={listRef}
        className="flex gap-2 overflow-x-auto [scrollbar-width:none] md:flex-col md:gap-1 md:overflow-visible md:border-l md:border-white/10 md:pl-2">
        {sections.map(({ id, label }) => {
          const isActive = id === active;
          return (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                className={`block rounded-full border px-3 py-1 text-sm whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none md:rounded-none md:border-0 md:border-l-2 md:py-1 md:text-base ${
                  isActive
                    ? "border-indigo-400 bg-indigo-400/10 font-bold text-indigo-300 md:bg-transparent"
                    : "border-white/10 text-gray-200 hover:text-indigo-300 md:border-transparent md:hover:border-indigo-300 md:hover:pl-4"
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
