"use client";

import { useEffect, useRef, useState } from "react";

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function progressAt(start: string, end: string, at: number): number {
  const from = Date.parse(start);
  const to = Date.parse(end);
  return Math.min(1, Math.max(0, (at - from) / (to - from)));
}

/**
 * A ring showing how much of the degree's calendar time has passed, from the
 * start and expected end dates. The ring draws itself when it comes into view.
 */
export function DegreeProgress({ start, end, initial, label }: { start: string; end: string; initial: number; label: string }) {
  const [progress, setProgress] = useState(initial);
  const [drawn, setDrawn] = useState(false);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setProgress(progressAt(start, end, Date.now())), 0);
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setDrawn(true);
        observer.disconnect();
      }
    });
    if (el) observer.observe(el);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [start, end]);

  const percent = Math.round(progress * 100);
  return (
    <figure className="relative grid size-32 shrink-0 place-items-center">
      <svg ref={ref} viewBox="0 0 120 120" className="absolute inset-0 size-full -rotate-90" aria-hidden>
        <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="rgb(148 163 184 / 0.14)" strokeWidth="6" />
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke="url(#degree-gradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={drawn ? CIRCUMFERENCE * (1 - progress) : CIRCUMFERENCE}
          className="transition-[stroke-dashoffset] duration-[1.8s] ease-out-expo motion-reduce:transition-none"
        />
        <defs>
          <linearGradient id="degree-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#67e8f9" />
            <stop offset="1" stopColor="#a5b4fc" />
          </linearGradient>
        </defs>
      </svg>
      <figcaption className="text-center">
        <span className="block text-2xl font-bold tabular-nums">{percent}%</span>
        <span className="label-mono block text-[0.55rem] text-ink-3">{label}</span>
      </figcaption>
    </figure>
  );
}
