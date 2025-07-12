"use client";
import { useEffect, useRef } from "react";

const NUM_PARTICLES = 120;
const LINK_DISTANCE = 120;
const MOUSE_LINK_DISTANCE = 220;
const MOUSE_ATTRACT_DISTANCE = 60; // distance for strong mouse-particle connection

function randomBetween(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

export default function MinimalParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<{ x: number | undefined; y: number | undefined }>({ x: undefined, y: undefined });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = Array.from({ length: NUM_PARTICLES }).map(() => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      vx: randomBetween(-0.18, 0.18),
      vy: randomBetween(-0.18, 0.18),
      size: randomBetween(1.2, 2.5),
      twinkle: Math.random(),
    }));

    window.addEventListener("mousemove", (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    });
    window.addEventListener("mouseleave", () => {
      mouse.current.x = undefined;
      mouse.current.y = undefined;
    });

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            const opacity = 0.18 * (1 - dist / LINK_DISTANCE);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, `rgba(165,180,252,${opacity})`);
            grad.addColorStop(1, `rgba(244,114,182,${opacity})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.2 - dist / LINK_DISTANCE;
            ctx.shadowBlur = 6;
            ctx.shadowColor = "#a5b4fc";
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Draw lines from mouse to nearby particles and enhance their connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (
          typeof mouse.current.x === "number" &&
          typeof mouse.current.y === "number"
        ) {
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_LINK_DISTANCE) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.current.x, mouse.current.y);
            const grad = ctx.createLinearGradient(p.x, p.y, mouse.current.x, mouse.current.y);
            grad.addColorStop(0, `rgba(252,252,252,0.25)`); // more subtle
            grad.addColorStop(1, `rgba(165,180,252,0.12)`); // more subtle
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.1 - dist / MOUSE_LINK_DISTANCE; // thinner lines
            ctx.shadowBlur = 4;
            ctx.shadowColor = "#a5b4fc";
            ctx.stroke();
            ctx.restore();
          }
          // If mouse is very close, connect this particle to its close neighbors
          if (dist < MOUSE_ATTRACT_DISTANCE) {
            for (let j = 0; j < particles.length; j++) {
              if (i === j) continue;
              const p2 = particles[j];
              const dx2 = p.x - p2.x;
              const dy2 = p.y - p2.y;
              const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
              if (dist2 < LINK_DISTANCE) {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                const grad = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
                grad.addColorStop(0, `rgba(252,252,252,0.18)`);
                grad.addColorStop(1, `rgba(165,180,252,0.10)`);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.2 - dist2 / LINK_DISTANCE;
                ctx.shadowBlur = 8;
                ctx.shadowColor = "#fff";
                ctx.stroke();
                ctx.restore();
              }
            }
          }
        }
      }

      // Draw particles (stars)
      for (const p of particles) {
        // Gentle jitter for organic feel
        p.x += p.vx + randomBetween(-0.05, 0.05);
        p.y += p.vy + randomBetween(-0.05, 0.05);
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        // Twinkle effect
        const twinkle = 0.7 + 0.5 * Math.sin(Date.now() / 400 + p.twinkle * 1000);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * twinkle, 0, 2 * Math.PI);
        // Star-like gradient
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * twinkle);
        grad.addColorStop(0, "#fff");
        grad.addColorStop(0.5, "#a5b4fc");
        grad.addColorStop(1, "rgba(165,180,252,0.1)");
        ctx.fillStyle = grad;
        ctx.shadowBlur = 18 * twinkle;
        ctx.shadowColor = "#fff";
        ctx.globalAlpha = 0.85 + 0.15 * Math.random();
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    return () => {};
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        display: "block",
      }}
    />
  );
} 