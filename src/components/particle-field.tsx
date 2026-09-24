"use client";

import { useEffect, useRef } from "react";

const LINK_DISTANCE = 120;
const MOUSE_LINK_DISTANCE = 220;
/** Particles this close to the pointer also get their neighbour links highlighted. */
const MOUSE_FOCUS_DISTANCE = 60;
/** Screen area per particle: ~120 particles on a 1440×900 desktop, ~30 on a phone. */
const AREA_PER_PARTICLE = 11_000;
const MIN_PARTICLES = 30;
const MAX_PARTICLES = 120;
/** Drift speed in px per 60 fps frame. */
const MAX_SPEED = 0.18;
const JITTER = 0.05;
const MAX_DPR = 2;

const INDIGO = "165,180,252";
const PINK = "244,114,182";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
};

type Pointer = { x: number; y: number } | null;

const random = (min: number, max: number) => Math.random() * (max - min) + min;

function createParticle(width: number, height: number): Particle {
  return {
    x: random(0, width),
    y: random(0, height),
    vx: random(-MAX_SPEED, MAX_SPEED),
    vy: random(-MAX_SPEED, MAX_SPEED),
    size: random(1.2, 2.5),
    phase: random(0, 1000),
  };
}

function targetCount(width: number, height: number) {
  return Math.round(Math.min(MAX_PARTICLES, Math.max(MIN_PARTICLES, (width * height) / AREA_PER_PARTICLE)));
}

/**
 * A pre-rendered glowing star, drawn with drawImage each frame. Much cheaper
 * than a per-particle radial gradient plus canvas shadowBlur.
 */
function createStarSprite(): HTMLCanvasElement {
  const size = 64;
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = size;
  const ctx = sprite.getContext("2d");
  if (!ctx) return sprite;
  const r = size / 2;
  const glow = ctx.createRadialGradient(r, r, 0, r, r, r);
  glow.addColorStop(0, "#fff");
  glow.addColorStop(0.25, "#fff");
  glow.addColorStop(0.5, `rgba(${INDIGO},0.8)`);
  glow.addColorStop(1, `rgba(${INDIGO},0)`);
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);
  return sprite;
}

function drawLink(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  from: string,
  to: string,
  width: number,
) {
  const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  gradient.addColorStop(0, from);
  gradient.addColorStop(1, to);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  sprite: HTMLCanvasElement,
  particles: Particle[],
  pointer: Pointer,
  width: number,
  height: number,
  time: number,
) {
  ctx.clearRect(0, 0, width, height);
  const linkSq = LINK_DISTANCE ** 2;

  for (let i = 0; i < particles.length; i++) {
    const a = particles[i]!;
    for (let j = i + 1; j < particles.length; j++) {
      const b = particles[j]!;
      const distSq = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
      if (distSq >= linkSq) continue;
      const t = Math.sqrt(distSq) / LINK_DISTANCE;
      const alpha = 0.18 * (1 - t);
      drawLink(ctx, a.x, a.y, b.x, b.y, `rgba(${INDIGO},${alpha})`, `rgba(${PINK},${alpha})`, 1.2 - t);
    }
  }

  if (pointer) {
    const mouseSq = MOUSE_LINK_DISTANCE ** 2;
    const focusSq = MOUSE_FOCUS_DISTANCE ** 2;
    for (const p of particles) {
      const distSq = (p.x - pointer.x) ** 2 + (p.y - pointer.y) ** 2;
      if (distSq >= mouseSq) continue;
      const t = Math.sqrt(distSq) / MOUSE_LINK_DISTANCE;
      drawLink(ctx, p.x, p.y, pointer.x, pointer.y, "rgba(252,252,252,0.25)", `rgba(${INDIGO},0.12)`, 1.1 - t);

      if (distSq >= focusSq) continue;
      for (const q of particles) {
        if (q === p) continue;
        const neighbourSq = (p.x - q.x) ** 2 + (p.y - q.y) ** 2;
        if (neighbourSq >= linkSq) continue;
        const u = Math.sqrt(neighbourSq) / LINK_DISTANCE;
        drawLink(ctx, p.x, p.y, q.x, q.y, "rgba(252,252,252,0.18)", `rgba(${INDIGO},0.10)`, 1.2 - u);
      }
    }
  }

  for (const p of particles) {
    const twinkle = time === 0 ? 1 : 0.7 + 0.5 * Math.sin(time / 400 + p.phase);
    // The star body fills the inner half of the sprite; the outer half is its glow.
    const diameter = p.size * twinkle * 4;
    ctx.globalAlpha = time === 0 ? 1 : 0.85 + 0.15 * Math.random();
    ctx.drawImage(sprite, p.x - diameter / 2, p.y - diameter / 2, diameter, diameter);
  }
  ctx.globalAlpha = 1;
}

function step(particles: Particle[], width: number, height: number, frames: number) {
  for (const p of particles) {
    p.x += (p.vx + random(-JITTER, JITTER)) * frames;
    p.y += (p.vy + random(-JITTER, JITTER)) * frames;
    if (p.x < 0 || p.x > width) {
      p.vx *= -1;
      p.x = Math.min(Math.max(p.x, 0), width);
    }
    if (p.y < 0 || p.y > height) {
      p.vy *= -1;
      p.y = Math.min(Math.max(p.y, 0), height);
    }
  }
}

/** Decorative animated constellation that sits behind all page content. */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const sprite = createStarSprite();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let pointer: Pointer = null;
    let frameId = 0;
    let lastTime = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = targetCount(width, height);
      particles = particles.slice(0, count);
      while (particles.length < count) particles.push(createParticle(width, height));
      for (const p of particles) {
        p.x = Math.min(p.x, width);
        p.y = Math.min(p.y, height);
      }
      if (reducedMotion.matches) drawFrame(ctx, sprite, particles, null, width, height, 0);
    };

    const loop = (time: number) => {
      const frames = lastTime ? Math.min((time - lastTime) / (1000 / 60), 3) : 1;
      lastTime = time;
      step(particles, width, height, frames);
      drawFrame(ctx, sprite, particles, pointer, width, height, time);
      frameId = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(frameId);
      lastTime = 0;
      if (reducedMotion.matches) {
        drawFrame(ctx, sprite, particles, null, width, height, 0);
      } else {
        frameId = requestAnimationFrame(loop);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
    };
    const clearPointer = (e?: PointerEvent) => {
      if (!e || e.pointerType !== "mouse") pointer = null;
    };
    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) pointer = null;
    };

    resize();
    start();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", clearPointer);
    window.addEventListener("pointercancel", clearPointer);
    document.addEventListener("mouseout", onMouseOut);
    reducedMotion.addEventListener("change", start);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", clearPointer);
      window.removeEventListener("pointercancel", clearPointer);
      document.removeEventListener("mouseout", onMouseOut);
      reducedMotion.removeEventListener("change", start);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-0 block size-full" />;
}
