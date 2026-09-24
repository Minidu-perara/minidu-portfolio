"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { hasFinePointer } from "./media";

/**
 * Tracks the pointer over a group of `.spot` cards so each card's glowing
 * edge and fill (see globals.css) follow it, even across card gaps.
 */
export function SpotlightGroup({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !hasFinePointer()) return;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const update = () => {
      frame = 0;
      for (const card of root.querySelectorAll<HTMLElement>(".spot")) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${pointerX - rect.left}px`);
        card.style.setProperty("--my", `${pointerY - rect.top}px`);
      }
    };
    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      root.style.setProperty("--spot-o", "1");
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onLeave = () => root.style.setProperty("--spot-o", "0");

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
