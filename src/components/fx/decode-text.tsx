"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./media";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_+=*#";

/**
 * Text that resolves from random glyphs, left to right, like a terminal
 * decoding it. Replays on hover. Use a monospaced font so width stays put.
 */
export function DecodeText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let frame = 0;
    let last = 0;

    const run = () => {
      cancelAnimationFrame(frame);
      const start = performance.now();
      const duration = 700 + text.length * 22;
      const tick = (now: number) => {
        if (now - last > 40) {
          last = now;
          const settled = Math.floor(((now - start) / duration) * text.length);
          let out = "";
          for (let i = 0; i < text.length; i++) {
            const ch = text[i]!;
            out += i < settled || ch === " " || ch === "·" ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
          el.textContent = out;
        }
        if (now - start < duration) frame = requestAnimationFrame(tick);
        else el.textContent = text;
      };
      frame = requestAnimationFrame(tick);
    };

    const timer = window.setTimeout(run, delay);
    el.addEventListener("pointerenter", run);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", run);
      el.textContent = text;
    };
  }, [text, delay]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden>
        {text}
      </span>
    </span>
  );
}
