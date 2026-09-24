"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/components/fx/media";

type Field = { label: string; value: string };

type Props = {
  photo: StaticImageData;
  photoAlt: string;
  name: string;
  role: string;
  fields: Field[];
  serial: string;
};

/** Deterministic barcode stripes from a string (FNV-1a), as a CSS gradient. */
function barcode(seed: string): string {
  let hash = 2166136261;
  let x = 0;
  const stops: string[] = [];
  for (let i = 0; i < 46; i++) {
    hash ^= seed.charCodeAt(i % seed.length) + i;
    hash = Math.imul(hash, 16777619) >>> 0;
    const width = 1 + (hash % 3);
    const color = i % 2 === 0 ? "rgb(233 235 243 / 0.85)" : "transparent";
    stops.push(`${color} ${x}px ${x + width}px`);
    x += width;
  }
  return `linear-gradient(90deg, ${stops.join(", ")})`;
}

/** Spirograph-style security print, like the fine line work on an ID card. */
function drawGuilloche(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = (canvas.width = Math.round(canvas.clientWidth * dpr));
  const height = (canvas.height = Math.round(canvas.clientHeight * dpr));
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 0.55 * dpr;

  const cx = width * 0.5;
  const cy = height * 0.64;
  const rosettes = [
    { R: 0.62, r: 0.137, d: 1.25, color: "rgb(129 140 248 / 0.20)" },
    { R: 0.5, r: 0.119, d: 1.5, color: "rgb(103 232 249 / 0.14)" },
    { R: 0.36, r: 0.083, d: 1.8, color: "rgb(165 180 252 / 0.16)" },
  ];
  for (const { R, r, d, color } of rosettes) {
    const big = R * width;
    const small = r * width;
    const pen = small * d;
    ctx.strokeStyle = color;
    ctx.beginPath();
    for (let t = 0; t <= Math.PI * 44; t += 0.012) {
      const x = cx + (big - small) * Math.cos(t) + pen * Math.cos(((big - small) / small) * t);
      const y = cy + (big - small) * Math.sin(t) - pen * Math.sin(((big - small) / small) * t);
      if (t === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Wavy microprint bands near the top.
  ctx.strokeStyle = "rgb(165 180 252 / 0.10)";
  for (let band = 0; band < 7; band++) {
    ctx.beginPath();
    for (let x = 0; x <= width; x += 2 * dpr) {
      const y = height * 0.06 + band * 5 * dpr + Math.sin(x / (9 * dpr) + band) * 2.2 * dpr;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}

/**
 * A holographic engineer ID badge. On a mouse it tilts toward the pointer
 * with foil and glare following the light; on touch it sways on its own.
 */
export function HoloBadge({ photo, photoAlt, name, role, fields, serial }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const print = printRef.current;
    if (!print) return;
    drawGuilloche(print);
    const observer = new ResizeObserver(() => drawGuilloche(print));
    observer.observe(print);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const card = cardRef.current;
    if (!stage || !card || prefersReducedMotion()) return;
    if (!hasFinePointer()) {
      card.dataset.idle = "true";
      return;
    }
    const onMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const px = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const py = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      card.dataset.tracking = "true";
      card.style.setProperty("--rx", `${(0.5 - py) * 18}deg`);
      card.style.setProperty("--ry", `${(px - 0.5) * 22}deg`);
      card.style.setProperty("--gx", `${px * 100}%`);
      card.style.setProperty("--gy", `${py * 100}%`);
    };
    const onLeave = () => {
      card.dataset.tracking = "false";
      for (const property of ["--rx", "--ry", "--gx", "--gy"]) card.style.removeProperty(property);
    };
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={stageRef} className="relative mx-auto w-full max-w-[21rem] py-4">
      {/* Floor shadow */}
      <div aria-hidden className="absolute inset-x-10 -bottom-2 h-10 rounded-[50%] bg-signal-deep/25 blur-2xl" />
      <div
        ref={cardRef}
        className="badge relative aspect-[54/86] overflow-hidden rounded-[1.6rem] bg-[linear-gradient(160deg,#121632,#0a0c18_55%,#0d1022)] shadow-[0_50px_90px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.09)]"
      >
        <canvas ref={printRef} aria-hidden className="absolute inset-0 size-full" />
        <div aria-hidden className="badge-foil pointer-events-none absolute inset-0 opacity-[0.13]" />

        <div className="relative flex h-full flex-col px-[7%] pt-4 pb-[6%]">
          <div aria-hidden className="mx-auto h-2.5 w-16 rounded-full bg-void shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] ring-1 ring-white/10" />

          <div className="mt-4 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-lg bg-white/8 font-mono text-[0.62rem] font-semibold tracking-wider text-ink ring-1 ring-white/12">
                MP
              </span>
              <span className="label-mono text-[0.6rem] text-ink-2">Engineer ID</span>
            </span>
            <span className="label-mono text-[0.6rem] text-signal">Backend</span>
          </div>

          <div className="relative mt-4 overflow-hidden rounded-2xl ring-1 ring-white/12">
            <Image
              src={photo}
              alt={photoAlt}
              placeholder="blur"
              sizes="(min-width: 1024px) 18rem, 70vw"
              className="aspect-[5/4] w-full object-cover object-[50%_28%] saturate-[0.9]"
            />
            <div aria-hidden className="badge-foil pointer-events-none absolute inset-0 opacity-[0.10]" />
          </div>

          <p className="mt-4 text-[1.55rem] leading-none font-extrabold tracking-[-0.03em] text-ink uppercase [font-variation-settings:'wdth'_112]">
            {name}
          </p>
          <p className="label-mono mt-2 text-[0.62rem] text-signal">{role}</p>

          <dl className="mt-4 grid gap-1.5 border-t border-white/10 pt-3 text-[0.72rem]">
            {fields.map((field) => (
              <div key={field.label} className="grid grid-cols-[4.5rem_1fr] items-baseline">
                <dt className="label-mono text-[0.58rem] text-ink-3">{field.label}</dt>
                <dd className="font-medium text-ink-2">{field.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto flex items-end justify-between gap-4 pt-3">
            <div aria-hidden className="h-8 w-[8.5rem] opacity-80" style={{ backgroundImage: barcode(serial) }} />
            <span className="label-mono text-[0.55rem] text-ink-3">{serial}</span>
          </div>
        </div>

        <div aria-hidden className="badge-glare pointer-events-none absolute inset-0" />
      </div>
    </div>
  );
}
