"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./media";

/**
 * A number that counts up from zero the first time it scrolls into view.
 * Server-rendered with the final value, so it reads correctly without JS.
 */
export function CountUp({ value, prefix = "", suffix = "", duration = 1600 }: { value: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          el.textContent = `${prefix}${Math.round(value * eased)}${suffix}`;
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = `${prefix}${value}${suffix}`;
    };
  }, [value, prefix, suffix, duration]);

  return (
    <>
      <span ref={ref} aria-hidden className="tabular-nums">{`${prefix}${value}${suffix}`}</span>
      <span className="sr-only">{`${prefix}${value}${suffix}`}</span>
    </>
  );
}
