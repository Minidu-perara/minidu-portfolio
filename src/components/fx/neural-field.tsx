"use client";

import { useEffect, useRef } from "react";
import { buildNetwork, seededRandom, type Network } from "@/lib/neural";
import { hasFinePointer, prefersReducedMotion, whenIdle } from "./media";

/** How long a neuron rests after firing before it can fire again (seconds). */
const REFRACTORY = 1.4;
/** A signal fading below this strength stops spreading. */
const MIN_STRENGTH = 0.22;
/** Touch devices draw at most this often. */
const TOUCH_FRAME_MS = 1000 / 30 - 2;

type Pulse = { from: number; to: number; start: number; duration: number; strength: number };

/**
 * A quiet neural network behind the /services hero. Neurons fire on their
 * own every so often and the signal cascades to their neighbours, weaker at
 * each hop. Neurons near the pointer fire as it passes (a tap does the same
 * on phones), so the page seems to think about whatever you look at.
 */
export function NeuralField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let teardown: (() => void) | undefined;
    const cancel = whenIdle(() => {
      teardown = mountField(canvas);
    });
    return () => {
      cancel();
      teardown?.();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}

function mountField(canvas: HTMLCanvasElement): (() => void) | undefined {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const reduced = prefersReducedMotion();
  const fine = hasFinePointer();
  const random = seededRandom(11);

  let dpr = 1;
  let width = 0;
  let height = 0;
  let net: Network = { neurons: [], synapses: [], neighbours: [], cell: 1 };
  let charge: Float32Array = new Float32Array(0);
  let restUntil: Float32Array = new Float32Array(0);
  let pulses: Pulse[] = [];
  let time = 0;
  let nextSpark = 1.2;
  const pointer = { x: -1e5, y: -1e5 };

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, fine ? 2 : 1.5);
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    if (!cssW || !cssH || (cssW === width && cssH === height)) return;
    width = cssW;
    height = cssH;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    // Density by area: fewer, larger cells on small screens.
    const count = Math.round(Math.min(fine ? 90 : 40, Math.max(fine ? 30 : 22, (width * height) / (fine ? 15000 : 13000))));
    net = buildNetwork(width, height, count);
    charge = new Float32Array(net.neurons.length);
    restUntil = new Float32Array(net.neurons.length);
    pulses = [];
  };

  /** Where a neuron is right now: drifting slowly around its resting spot. */
  const position = (i: number): [number, number] => {
    const n = net.neurons[i]!;
    if (reduced) return [n.x, n.y];
    return [n.x + Math.sin(time * 0.31 + n.phase) * n.reach, n.y + Math.cos(time * 0.27 + n.phase * 1.3) * n.reach];
  };

  const fire = (i: number, strength: number, from = -1) => {
    if (time < restUntil[i]! || strength < MIN_STRENGTH) return;
    charge[i] = Math.max(charge[i]!, strength);
    restUntil[i] = time + REFRACTORY;
    const speed = net.cell * 2.4; // pixels per second
    for (const j of net.neighbours[i]!) {
      if (j === from || random() > 0.72) continue;
      const [ax, ay] = position(i);
      const [bx, by] = position(j);
      pulses.push({ from: i, to: j, start: time, duration: Math.hypot(bx - ax, by - ay) / speed, strength: strength * 0.84 });
    }
    if (pulses.length > 160) pulses.splice(0, pulses.length - 160);
  };

  const draw = () => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const points = net.neurons.map((_, i) => position(i));

    // Synapses: one faint batch, then the ones a recent signal lit up.
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(165,180,252,0.1)";
    ctx.beginPath();
    for (const [a, b] of net.synapses) {
      ctx.moveTo(points[a]![0], points[a]![1]);
      ctx.lineTo(points[b]![0], points[b]![1]);
    }
    ctx.stroke();
    for (const [a, b] of net.synapses) {
      const glow = Math.max(charge[a]!, charge[b]!);
      if (glow < 0.04) continue;
      ctx.strokeStyle = `rgba(165,180,252,${(glow * 0.55).toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(points[a]![0], points[a]![1]);
      ctx.lineTo(points[b]![0], points[b]![1]);
      ctx.stroke();
    }

    // Signals in flight: a bright head with a short tail along the synapse.
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";
    for (const p of pulses) {
      const t = Math.min(1, (time - p.start) / p.duration);
      const [ax, ay] = points[p.from]!;
      const [bx, by] = points[p.to]!;
      const head = t;
      const tail = Math.max(0, t - 0.28);
      ctx.strokeStyle = `rgba(251,191,36,${(0.85 * p.strength).toFixed(3)})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(ax + (bx - ax) * tail, ay + (by - ay) * tail);
      ctx.lineTo(ax + (bx - ax) * head, ay + (by - ay) * head);
      ctx.stroke();
      const hx = ax + (bx - ax) * head;
      const hy = ay + (by - ay) * head;
      ctx.fillStyle = `rgba(251,191,36,${(0.22 * p.strength).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(hx, hy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(255,236,179,${p.strength.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(hx, hy, 2.3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Neurons: dim at rest, a warm halo while charged.
    for (let i = 0; i < points.length; i++) {
      const [x, y] = points[i]!;
      const c = charge[i]!;
      if (c > 0.03) {
        ctx.fillStyle = `rgba(251,191,36,${(c * 0.24).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, 5 + c * 9, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = c > 0.03 ? `rgba(253,224,140,${(0.35 + c * 0.65).toFixed(3)})` : "rgba(199,210,254,0.32)";
      ctx.beginPath();
      ctx.arc(x, y, 1.5 + c * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
  };

  const step = (dt: number) => {
    time += dt;
    // Spontaneous thought: a random neuron fires every second or two.
    if (time >= nextSpark) {
      fire(Math.floor(random() * net.neurons.length), 1);
      nextSpark = time + 0.6 + random() * 1.1;
    }
    // Neurons the pointer passes over fire.
    if (fine) {
      const reach = net.cell * 0.75;
      net.neurons.forEach((_, i) => {
        const [x, y] = position(i);
        if (Math.hypot(x - pointer.x, y - pointer.y) < reach) fire(i, 0.95);
      });
    }
    // Arrivals fire the next neuron, a little weaker each hop.
    const arrived = pulses.filter((p) => time - p.start >= p.duration);
    if (arrived.length) {
      pulses = pulses.filter((p) => time - p.start < p.duration);
      for (const p of arrived) fire(p.to, p.strength, p.from);
    }
    const decay = Math.exp(-dt * 2.2);
    for (let i = 0; i < charge.length; i++) charge[i]! *= decay;
  };

  let frame = 0;
  let running = false;
  let last = 0;
  let scrolling = false;
  let scrollTimer = 0;

  const tick = (now: number) => {
    frame = 0;
    if (!fine && now - last < TOUCH_FRAME_MS) {
      if (running) frame = requestAnimationFrame(tick);
      return;
    }
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now;
    step(dt);
    draw();
    if (running) frame = requestAnimationFrame(tick);
  };
  const start = () => {
    if (running || reduced || scrolling) return;
    running = true;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(frame);
    frame = 0;
  };
  const startIfOnScreen = () => {
    const rect = canvas.getBoundingClientRect();
    if (!document.hidden && rect.bottom > 0 && rect.top < window.innerHeight) start();
  };

  const toLocal = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    return [event.clientX - rect.left, event.clientY - rect.top] as const;
  };
  const onPointerMove = (event: PointerEvent) => {
    [pointer.x, pointer.y] = toLocal(event);
  };
  const onPointerLeave = () => {
    pointer.x = pointer.y = -1e5;
  };
  // A tap (or click) fires the nearest neuron hard.
  const onPointerDown = (event: PointerEvent) => {
    if (reduced) return;
    const [x, y] = toLocal(event);
    if (y < 0 || y > height) return;
    let best = 0;
    let bestDistance = Infinity;
    net.neurons.forEach((_, i) => {
      const [nx, ny] = position(i);
      const d = Math.hypot(nx - x, ny - y);
      if (d < bestDistance) {
        bestDistance = d;
        best = i;
      }
    });
    restUntil[best] = 0;
    fire(best, 1);
  };
  // On phones, hold still while the page scrolls; scrolling comes first.
  const onScroll = () => {
    scrolling = true;
    stop();
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => {
      scrolling = false;
      startIfOnScreen();
    }, 160);
  };
  const onVisibilityChange = () => (document.hidden ? stop() : startIfOnScreen());

  resize();
  // A first frame with a few neurons already lit, so it never starts empty.
  for (let k = 0; k < 3; k++) fire(Math.floor(random() * net.neurons.length), 0.8);
  draw();
  canvas.dataset.state = "ready";

  const resizeObserver = new ResizeObserver(() => {
    resize();
    if (!running) draw();
  });
  const visibility = new IntersectionObserver(([entry]) => (entry?.isIntersecting ? startIfOnScreen() : stop()));
  resizeObserver.observe(canvas);
  visibility.observe(canvas);
  window.addEventListener("pointerdown", onPointerDown, { passive: true });
  if (fine) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
  } else {
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  document.addEventListener("visibilitychange", onVisibilityChange);

  return () => {
    stop();
    resizeObserver.disconnect();
    visibility.disconnect();
    window.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointermove", onPointerMove);
    document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    window.removeEventListener("scroll", onScroll);
    window.clearTimeout(scrollTimer);
    document.removeEventListener("visibilitychange", onVisibilityChange);
  };
}
