"use client";

import { useEffect, useRef } from "react";
import { clamp, prefersReducedMotion } from "@/components/fx/media";
import type { LogEntry, LogLevel } from "@/content/profile";

const LEVEL_COLOR: Record<LogLevel, string> = {
  INFO: "text-pulse",
  BUILD: "text-signal",
  DEPLOY: "text-ok",
  METRIC: "text-warn",
  FIX: "text-alert",
  OPS: "text-ink",
};

/**
 * The internship as `tail -f career.log`. On large screens the log is
 * pinned and each line appears as you scroll through the section; on smaller
 * screens the lines stream in once the log is on screen. Every line is in
 * the HTML from the start, so it reads fully without JavaScript.
 */
export function CareerLog({ entries, sectionId }: { entries: LogEntry[]; sectionId: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const lines = Array.from(root.querySelectorAll<HTMLElement>("[data-log-line]"));
    const counter = root.querySelector<HTMLElement>("[data-log-count]");
    const body = root.querySelector<HTMLElement>("[data-log-body]");
    let shown = -1;
    const show = (count: number) => {
      if (count === shown) return;
      shown = count;
      lines.forEach((line, i) => (line.dataset.shown = String(i < count)));
      if (counter) counter.textContent = `${count}/${lines.length}`;
      // Like tail -f: keep the newest line in view when the window scrolls.
      const newest = lines[count - 1];
      if (body && newest && body.scrollHeight > body.clientHeight) {
        body.scrollTo({ top: newest.offsetTop + newest.offsetHeight - body.clientHeight + 40, behavior: "smooth" });
      }
    };
    show(0);

    const section = document.getElementById(sectionId);
    if (section && window.matchMedia("(min-width: 1024px)").matches) {
      let frame = 0;
      const update = () => {
        frame = 0;
        const rect = section.getBoundingClientRect();
        const viewport = window.innerHeight;
        const progress = clamp((viewport * 0.6 - rect.top) / Math.max(1, rect.height - viewport * 0.9), 0, 1);
        show(Math.ceil(progress * lines.length));
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
    }

    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        let count = 0;
        const next = () => {
          show(++count);
          if (count < lines.length) timer = window.setTimeout(next, 320);
        };
        next();
      },
      { threshold: 0.35 },
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [sectionId]);

  return (
    <div
      ref={rootRef}
      className="group/log overflow-hidden rounded-2xl bg-[#070911]/90 shadow-[0_40px_120px_-40px_rgba(99,102,241,0.35)] ring-1 ring-white/10 backdrop-blur"
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/8 px-4 py-3">
        <span className="flex items-center gap-3">
          <span aria-hidden className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </span>
          <span className="font-mono text-xs text-ink-3">minidu@prod-01: ~/career.log</span>
        </span>
        <span className="label-mono flex items-center gap-2 text-[0.62rem] text-ok">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-ok motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-ok" />
          </span>
          Live
        </span>
      </div>

      <div
        data-log-body
        className="relative px-4 py-4 font-mono text-[0.78rem] leading-relaxed [scrollbar-width:thin] sm:px-5 sm:text-[0.8rem] lg:max-h-[calc(100svh-15rem)] lg:overflow-y-auto"
      >
        <p className="text-ink-3">
          <span className="text-signal">$</span> tail -f career.log
        </p>
        <ol className="mt-2">
          {entries.map((entry, i) => (
            <li
              key={i}
              data-log-line
              className="log-line grid grid-cols-[4.2rem_4.4rem_minmax(0,1fr)] gap-x-2 py-[0.3rem] sm:grid-cols-[4.2rem_4.4rem_7.2rem_minmax(0,1fr)]"
            >
              <span className="text-ink-3">{entry.when ?? "·"}</span>
              <span className={`font-semibold ${LEVEL_COLOR[entry.level]}`}>{entry.level}</span>
              <span className="hidden truncate text-ink-3 sm:block">{entry.source}</span>
              <span className="text-ink-2">{entry.message}</span>
            </li>
          ))}
        </ol>
        <p className="mt-2 text-ink-3">
          minidu@prod-01:~$ <span aria-hidden className="inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] animate-blink bg-signal" />
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-white/8 bg-white/[0.02] px-4 py-2 font-mono text-[0.68rem] text-ink-3">
        <span>
          <span className="text-signal">[career]</span> 0:tail*
        </span>
        <span>
          lines <span data-log-count className="text-ink-2 tabular-nums">{`${entries.length}/${entries.length}`}</span>
        </span>
      </div>
    </div>
  );
}
