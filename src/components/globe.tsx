"use client";

import { useEffect, useRef } from "react";
import { clamp, prefersReducedMotion } from "@/components/fx/media";
import type { Place } from "@/content/profile";
import { landDots, toUnitVector, type Vec3 } from "@/lib/land-mask";

const DEG = Math.PI / 180;
const TILT = 0.34; // radians of north-up tilt toward the viewer
const ARC_SAMPLES = 64;

/** Points along the great circle from a to b, lifted off the surface mid-way. */
function arcPoints(a: Vec3, b: Vec3): Vec3[] {
  const dot = clamp(a[0] * b[0] + a[1] * b[1] + a[2] * b[2], -1, 1);
  const angle = Math.acos(dot);
  const sin = Math.sin(angle) || 1;
  const lift = 0.06 + 0.22 * (angle / Math.PI);
  const points: Vec3[] = [];
  for (let i = 0; i <= ARC_SAMPLES; i++) {
    const t = i / ARC_SAMPLES;
    const wa = Math.sin((1 - t) * angle) / sin;
    const wb = Math.sin(t * angle) / sin;
    const height = 1 + lift * Math.sin(Math.PI * t);
    points.push([(a[0] * wa + b[0] * wb) * height, (a[1] * wa + b[1] * wb) * height, (a[2] * wa + b[2] * wb) * height]);
  }
  return points;
}

/**
 * A dotted globe centred on home, with arcs to the given cities. It sways
 * gently, can be dragged to spin, and drifts back home after a moment.
 */
export function Globe({ home, cities, className = "" }: { home: Place; cities: Place[]; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = prefersReducedMotion();
    const dots = landDots();
    const homeVector = toUnitVector(home.lat, home.lon);
    const arcs = cities.map((city, i) => ({
      name: city.name,
      target: toUnitVector(city.lat, city.lon),
      points: arcPoints(homeVector, toUnitVector(city.lat, city.lon)),
      phase: i / cities.length,
    }));
    const baseYaw = -home.lon * DEG;
    const font = getComputedStyle(canvas).fontFamily;

    let dpr = 1;
    let size = 0;
    let atmosphere: HTMLCanvasElement | null = null;
    let yawOffset = 0;
    let pitchOffset = 0;
    let velocity = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let lastInteraction = -1e9;
    let time = 0;
    let frame = 0;
    let running = false;
    let last = 0;

    const buildAtmosphere = () => {
      const layer = document.createElement("canvas");
      layer.width = layer.height = size;
      const g = layer.getContext("2d");
      if (!g) return null;
      const c = size / 2;
      const R = size * 0.4;
      const halo = g.createRadialGradient(c, c, R * 0.92, c, c, R * 1.28);
      halo.addColorStop(0, "rgba(99,102,241,0.34)");
      halo.addColorStop(0.35, "rgba(99,102,241,0.10)");
      halo.addColorStop(1, "rgba(99,102,241,0)");
      g.fillStyle = halo;
      g.fillRect(0, 0, size, size);
      const body = g.createRadialGradient(c - R * 0.35, c - R * 0.45, R * 0.1, c, c, R);
      body.addColorStop(0, "#111634");
      body.addColorStop(0.7, "#080a17");
      body.addColorStop(1, "#05060d");
      g.fillStyle = body;
      g.beginPath();
      g.arc(c, c, R, 0, Math.PI * 2);
      g.fill();
      const rim = g.createRadialGradient(c, c, R * 0.86, c, c, R);
      rim.addColorStop(0, "rgba(165,180,252,0)");
      rim.addColorStop(1, "rgba(165,180,252,0.18)");
      g.fillStyle = rim;
      g.fill();
      return layer;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const next = Math.round(canvas.clientWidth * dpr);
      if (next === size || next === 0) return;
      size = next;
      canvas.width = canvas.height = size;
      atmosphere = buildAtmosphere();
    };

    const draw = () => {
      if (!size) return;
      const c = size / 2;
      const R = size * 0.4;
      const sway = reduced ? 0 : 0.42 * Math.sin(time * 0.11);
      const yaw = baseYaw + sway + yawOffset;
      const pitch = TILT + pitchOffset;
      const cosYaw = Math.cos(yaw);
      const sinYaw = Math.sin(yaw);
      const cosPitch = Math.cos(pitch);
      const sinPitch = Math.sin(pitch);
      const project = (x: number, y: number, z: number): Vec3 => {
        const x1 = x * cosYaw + z * sinYaw;
        const z1 = -x * sinYaw + z * cosYaw;
        return [x1, y * cosPitch - z1 * sinPitch, y * sinPitch + z1 * cosPitch];
      };
      const hidden = ([x, y, z]: Vec3) => z < 0 && x * x + y * y < 1;

      ctx.clearRect(0, 0, size, size);
      if (atmosphere) ctx.drawImage(atmosphere, 0, 0);

      // Land dots, brighter and larger toward the viewer.
      const buckets: number[][] = [[], [], [], [], []];
      for (let i = 0; i < dots.length; i += 3) {
        const [x, y, z] = project(dots[i]!, dots[i + 1]!, dots[i + 2]!);
        if (z <= 0.02) continue;
        buckets[Math.min(4, Math.floor(z * 5))]!.push(c + x * R, c - y * R);
      }
      buckets.forEach((points, level) => {
        ctx.fillStyle = `rgba(199,210,254,${0.16 + level * 0.16})`;
        const dot = (1.05 + level * 0.28) * dpr;
        for (let i = 0; i < points.length; i += 2) ctx.fillRect(points[i]! - dot / 2, points[i + 1]! - dot / 2, dot, dot);
      });

      // Labels are placed after the arcs, avoiding each other and the home pin.
      const [hx, hy, hz] = project(...homeVector);
      const homeX = c + hx * R;
      const homeY = c - hy * R;
      const placed: { x: number; y: number; w: number; h: number }[] = [];
      const overlaps = (box: { x: number; y: number; w: number; h: number }) =>
        placed.some((p) => box.x < p.x + p.w && box.x + box.w > p.x && box.y < p.y + p.h && box.y + box.h > p.y);
      const labels: { text: string; x: number; y: number; alpha: number }[] = [];

      // Arcs from home, each with a travelling comet.
      ctx.lineCap = "round";
      for (const arc of arcs) {
        const projected = arc.points.map((p) => project(p[0], p[1], p[2]));
        ctx.beginPath();
        let drawing = false;
        for (const p of projected) {
          if (hidden(p)) {
            drawing = false;
            continue;
          }
          const X = c + p[0] * R;
          const Y = c - p[1] * R;
          if (drawing) ctx.lineTo(X, Y);
          else ctx.moveTo(X, Y);
          drawing = true;
        }
        ctx.strokeStyle = "rgba(165,180,252,0.30)";
        ctx.lineWidth = 1 * dpr;
        ctx.stroke();

        if (!reduced) {
          const cycle = (time * 0.28 + arc.phase * 1.7) % 1.7;
          if (cycle <= 1) {
            const head = Math.floor(cycle * ARC_SAMPLES);
            for (let k = Math.max(1, head - 16); k <= head; k++) {
              const a = projected[k - 1]!;
              const b = projected[k]!;
              if (hidden(a) || hidden(b)) continue;
              const fade = 1 - (head - k) / 16;
              ctx.strokeStyle = `rgba(103,232,249,${0.9 * fade})`;
              ctx.lineWidth = (0.8 + 1.6 * fade) * dpr;
              ctx.beginPath();
              ctx.moveTo(c + a[0] * R, c - a[1] * R);
              ctx.lineTo(c + b[0] * R, c - b[1] * R);
              ctx.stroke();
            }
          }
        }

        const [tx, ty, tz] = project(...arc.target);
        if (tz > 0.05) {
          ctx.fillStyle = "rgba(233,235,243,0.9)";
          ctx.beginPath();
          ctx.arc(c + tx * R, c - ty * R, 2.2 * dpr, 0, Math.PI * 2);
          ctx.fill();
          if (tz > 0.2) labels.push({ text: arc.name.toUpperCase(), x: c + tx * R, y: c - ty * R, alpha: Math.min(1, tz * 1.5) });
        }
      }

      ctx.font = `${10 * dpr}px ${font}`;
      if (hz > 0) {
        const width = ctx.measureText(home.name.toUpperCase()).width;
        placed.push({ x: homeX + 6 * dpr, y: homeY - 2 * dpr, w: width + 4 * dpr, h: 20 * dpr });
      }
      for (const label of labels) {
        const w = ctx.measureText(label.text).width;
        const h = 11 * dpr;
        const gap = 6 * dpr;
        const candidates = [
          { x: label.x + gap, y: label.y - gap - h },
          { x: label.x - gap - w, y: label.y - gap - h },
          { x: label.x + gap, y: label.y + gap },
          { x: label.x - gap - w, y: label.y + gap },
        ];
        const spot = candidates.find((box) => !overlaps({ ...box, w, h }));
        if (!spot) continue;
        placed.push({ ...spot, w, h });
        ctx.fillStyle = `rgba(164,169,189,${label.alpha})`;
        ctx.fillText(label.text, spot.x, spot.y + h - 2 * dpr);
      }

      // Home: a warm pin with a pulsing ring.
      if (hz > 0) {
        const X = homeX;
        const Y = homeY;
        const pulse = reduced ? 0.5 : (time * 0.6) % 1;
        ctx.strokeStyle = `rgba(251,191,36,${0.7 * (1 - pulse)})`;
        ctx.lineWidth = 1.2 * dpr;
        ctx.beginPath();
        ctx.arc(X, Y, (4 + pulse * 16) * dpr, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#fbbf24";
        ctx.beginPath();
        ctx.arc(X, Y, 3.4 * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = `600 ${10.5 * dpr}px ${font}`;
        ctx.fillStyle = "rgba(251,191,36,0.95)";
        ctx.fillText(home.name.toUpperCase(), X + 8 * dpr, Y + 14 * dpr);
      }
    };

    const tick = (now: number) => {
      frame = 0;
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      time += dt;
      if (!dragging) {
        yawOffset += velocity;
        velocity *= 0.94;
        if (now - lastInteraction > 2500) {
          yawOffset *= 0.985;
          pitchOffset *= 0.985;
        }
      }
      draw();
      if (running) frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      velocity = 0;
      canvas.setPointerCapture(event.pointerId);
      if (reduced) start();
    };
    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      velocity = dx * 0.006;
      yawOffset += velocity;
      pitchOffset = clamp(pitchOffset + dy * 0.004, -0.7, 0.5);
      lastInteraction = performance.now();
      if (reduced) draw();
    };
    const onUp = () => {
      dragging = false;
      lastInteraction = performance.now();
      if (reduced) {
        velocity = 0;
        stop();
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !reduced) start();
      else stop();
    });
    resize();
    draw();
    resizeObserver.observe(canvas);
    visibility.observe(canvas);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, [home, cities]);

  return (
    <canvas
      ref={canvasRef}
      className={`aspect-square w-full cursor-grab touch-pan-y font-mono active:cursor-grabbing ${className}`}
      role="img"
      aria-label={`Globe centred on ${home.name}, with arcs to ${cities.map((c) => c.name).join(", ")}`}
    />
  );
}
