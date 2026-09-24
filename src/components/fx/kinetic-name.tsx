"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { hasFinePointer, prefersReducedMotion } from "./media";

// Mona Sans axes: weight 200–900, width 75–125.
const REST = { weight: 700, width: 104 };
const PEAK = { weight: 900, width: 125 };
const SWEEP_MS = 2600;
const SWEEP_EVERY_MS = 7000;

/**
 * The hero name. Each letter swells in weight and width as the pointer nears
 * it and picks up the signal colour. On touch screens a light sweep passes
 * over it every few seconds instead.
 */
export function KineticName({ lines, label, className = "" }: { lines: readonly string[]; label: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    const chars = Array.from(root.querySelectorAll<HTMLElement>("[data-char]"));
    const values = chars.map(() => ({ weight: REST.weight, width: REST.width, glow: 0 }));
    const fine = hasFinePointer();
    let pointerX = -1e5;
    let pointerY = -1e5;
    let frame = 0;
    let ready = false;
    let visible = true;
    let sweepStart = -1;
    let sweepTimer = 0;

    const render = (now: number) => {
      frame = 0;
      const fontSize = parseFloat(getComputedStyle(root).fontSize);
      const radius = fontSize * 1.2;
      let x = pointerX;
      let y = pointerY;
      if (!fine) {
        const progress = (now - sweepStart) / SWEEP_MS;
        const box = root.getBoundingClientRect();
        if (progress >= 0 && progress <= 1) {
          x = box.left - radius + progress * (box.width + radius * 2);
          y = box.top + box.height * progress;
        }
      }

      // Read every letter's position first, then write, to avoid layout thrash.
      const rects = chars.map((el) => el.getBoundingClientRect());
      let settling = false;
      rects.forEach((rect, i) => {
        const dx = x - (rect.left + rect.width / 2);
        const dy = (y - (rect.top + rect.height / 2)) * 1.3;
        const influence = Math.exp(-(dx * dx + dy * dy) / (radius * radius));
        const value = values[i]!;
        const weight = REST.weight + (PEAK.weight - REST.weight) * influence;
        const width = REST.width + (PEAK.width - REST.width) * influence;
        value.weight += (weight - value.weight) * 0.16;
        value.width += (width - value.width) * 0.16;
        value.glow += (influence - value.glow) * 0.16;
        if (Math.abs(weight - value.weight) > 0.5 || Math.abs(influence - value.glow) > 0.004) settling = true;
      });
      chars.forEach((el, i) => {
        const value = values[i]!;
        el.style.fontVariationSettings = `"wght" ${value.weight.toFixed(0)}, "wdth" ${value.width.toFixed(1)}`;
        el.style.setProperty("--k", value.glow.toFixed(3));
      });

      const sweeping = !fine && now - sweepStart < SWEEP_MS;
      if (visible && (settling || sweeping)) {
        frame = requestAnimationFrame(render);
      } else if (!fine && visible) {
        sweepTimer = window.setTimeout(startSweep, SWEEP_EVERY_MS - SWEEP_MS);
      }
    };

    const kick = () => {
      if (ready && visible && !frame) frame = requestAnimationFrame(render);
    };
    function startSweep() {
      sweepStart = performance.now();
      kick();
    }

    // Let the CSS entrance finish before taking over the letters.
    const entranceMs = 150 + chars.length * 45 + 1200;
    const readyTimer = window.setTimeout(() => {
      chars.forEach((el) => (el.style.animation = "none"));
      ready = true;
      if (!fine) startSweep();
    }, entranceMs);

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      kick();
    };
    const onLeave = () => {
      pointerX = pointerY = -1e5;
      kick();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible && !fine && ready) startSweep();
    });

    observer.observe(root);
    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    return () => {
      window.clearTimeout(readyTimer);
      window.clearTimeout(sweepTimer);
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  let index = 0;
  return (
    <h1 ref={ref} aria-label={label} className={className}>
      {lines.map((line) => (
        <span key={line} aria-hidden className="block whitespace-nowrap">
          {Array.from(line).map((char, i) => (
            <span key={i} data-char className="kinetic-char" style={{ "--i": index++ } as CSSProperties}>
              {char}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
