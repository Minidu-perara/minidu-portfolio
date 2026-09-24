"use client";

import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "./media";

const SIZE = 640;

/** A soft light that trails the mouse across the page background. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let frame = 0;
    let last = 0;

    // Time-based easing, so the light settles quickly at any frame rate.
    const step = (now: number) => {
      const ease = 1 - Math.exp(-Math.min(0.1, (now - last) / 1000 || 0.016) * 10);
      last = now;
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      if (Math.abs(targetX - x) + Math.abs(targetY - y) < 0.5) {
        x = targetX;
        y = targetY;
      }
      el.style.transform = `translate3d(${x - SIZE / 2}px, ${y - SIZE / 2}px, 0)`;
      frame = x === targetX && y === targetY ? 0 : requestAnimationFrame(step);
    };
    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      el.style.opacity = "1";
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(step);
      }
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-0 rounded-full opacity-0 transition-opacity duration-700"
      style={{
        width: SIZE,
        height: SIZE,
        background: "radial-gradient(circle, rgb(99 102 241 / 0.11), transparent 62%)",
      }}
    />
  );
}
