"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "./media";

/**
 * Runs the CSS and SVG (SMIL) animations inside it only while it is on
 * screen, and never when the viewer prefers reduced motion.
 */
export function PlayWhenVisible({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const svgs = Array.from(el.querySelectorAll("svg"));
    const setPlaying = (playing: boolean) => {
      el.dataset.play = String(playing);
      for (const svg of svgs) {
        if (playing) svg.unpauseAnimations();
        else svg.pauseAnimations();
      }
    };
    if (prefersReducedMotion()) {
      setPlaying(false);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setPlaying(Boolean(entry?.isIntersecting)), {
      rootMargin: "100px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`scene ${className}`}>
      {children}
    </div>
  );
}
