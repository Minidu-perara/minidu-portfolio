import type { CSSProperties } from "react";
import type { ProjectScene } from "@/content/profile";

/*
 * One small animated diagram per project, drawn as SVG so it stays sharp and
 * cheap. Animations pause off-screen (PlayWhenVisible) and for reduced motion.
 */

const label = "fill-ink-3 font-mono text-[8px] tracking-[0.12em] uppercase";

function heartbeatPath(): string {
  let d = "M0 70";
  for (let x = 12; x < 400; x += 96) {
    d += ` L${x} 70 L${x + 7} 65 L${x + 14} 70 L${x + 24} 70 L${x + 29} 80 L${x + 36} 24 L${x + 43} 92 L${x + 49} 70 L${x + 62} 70 L${x + 72} 62 L${x + 84} 70`;
  }
  return `${d} L400 70`;
}

function motionPath(): string {
  const points: string[] = [];
  for (let x = 0; x <= 400; x += 8) {
    const fall = x === 288 ? -26 : x === 296 ? 18 : 0;
    points.push(`${x} ${128 + Math.sin(x / 11) * 2.5 + fall}`);
  }
  return `M${points.join(" L")}`;
}

function Ecg() {
  const heartbeat = heartbeatPath();
  return (
    <svg viewBox="0 0 400 160" className="size-full" aria-hidden>
      <text x="14" y="20" className={label}>
        heart rate
      </text>
      <text x="14" y="112" className={label}>
        motion
      </text>
      <text x="386" y="20" textAnchor="end" className={label}>
        mqtt → caregiver dashboard
      </text>
      <path d={heartbeat} fill="none" stroke="rgb(165 180 252 / 0.22)" strokeWidth="1.5" />
      <path d={heartbeat} pathLength={1000} fill="none" stroke="#a5b4fc" strokeWidth="2" strokeLinejoin="round" className="ecg-trace" />
      <path d={motionPath()} fill="none" stroke="rgb(103 232 249 / 0.45)" strokeWidth="1.25" />
      <g transform="translate(292 96)">
        <line x1="0" y1="4" x2="0" y2="22" stroke="#fb7185" strokeDasharray="2 2" />
        <rect x="-30" y="-10" width="60" height="14" rx="7" fill="rgb(251 113 133 / 0.15)" stroke="rgb(251 113 133 / 0.5)" />
        <text x="0" y="0" textAnchor="middle" className="fill-alert font-mono text-[7px] tracking-[0.1em] uppercase">
          fall flagged
        </text>
      </g>
    </svg>
  );
}

const nodes = [
  { x: 200, y: 82, r: 9 },
  { x: 92, y: 46, r: 5, tag: "workouts" },
  { x: 118, y: 124, r: 4 },
  { x: 300, y: 40, r: 5, tag: "meal plans" },
  { x: 318, y: 120, r: 5, tag: "posts" },
  { x: 164, y: 26, r: 3.5 },
  { x: 250, y: 134, r: 3.5 },
  { x: 54, y: 98, r: 3.5 },
  { x: 352, y: 76, r: 3.5 },
];
const edges: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 5], [1, 7], [2, 7], [3, 8], [4, 8], [4, 6], [3, 5],
];

function Graph() {
  return (
    <svg viewBox="0 0 400 160" className="size-full" aria-hidden>
      {edges.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a]!.x} y1={nodes[a]!.y} x2={nodes[b]!.x} y2={nodes[b]!.y} stroke="rgb(148 163 184 / 0.22)" />
      ))}
      {edges.slice(0, 4).map(([a, b], i) => (
        <line
          key={`pulse-${a}-${b}`}
          x1={nodes[a]!.x}
          y1={nodes[a]!.y}
          x2={nodes[b]!.x}
          y2={nodes[b]!.y}
          pathLength={130}
          stroke="#67e8f9"
          strokeWidth="2"
          strokeLinecap="round"
          className="graph-edge-pulse"
          style={{ animationDelay: `${i * 0.6}s` }}
        />
      ))}
      {nodes.map((node, i) => (
        <g key={i} className="graph-node" style={{ animationDelay: `${i * -0.7}s` }}>
          <circle cx={node.x} cy={node.y} r={node.r} fill={i === 0 ? "#a5b4fc" : "#0f1328"} stroke="#a5b4fc" strokeOpacity={i === 0 ? 1 : 0.6} />
          {i === 0 && <circle cx={node.x} cy={node.y} r={node.r + 6} fill="none" stroke="rgb(165 180 252 / 0.25)" />}
          {node.tag && (
            <text x={node.x} y={node.y - node.r - 6} textAnchor="middle" className={label}>
              {node.tag}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

function Packet({ path, duration, begin = "0s", gap = 0, color = "#67e8f9" }: { path: string; duration: number; begin?: string; gap?: number; color?: string }) {
  // With a gap, the packet travels in `duration` then waits out of sight.
  const total = duration + gap;
  const travel = duration / total;
  return (
    <circle r="3" fill={color}>
      <animateMotion
        dur={`${total}s`}
        begin={begin}
        repeatCount="indefinite"
        path={path}
        keyPoints="0;1;1"
        keyTimes={`0;${travel.toFixed(3)};1`}
        calcMode="linear"
      />
      <animate
        attributeName="opacity"
        dur={`${total}s`}
        begin={begin}
        repeatCount="indefinite"
        values="1;1;0;0"
        keyTimes={`0;${(travel * 0.97).toFixed(3)};${travel.toFixed(3)};1`}
      />
    </circle>
  );
}

function Bin({ x, y, fill, color }: { x: number; y: number; fill: number; color: string }) {
  const height = 46;
  return (
    <g>
      <rect x={x} y={y} width="36" height={height} rx="6" fill="rgb(255 255 255 / 0.02)" stroke="rgb(148 163 184 / 0.4)" />
      <rect
        x={x + 3}
        y={y + 3 + (height - 6) * (1 - fill)}
        width="30"
        height={(height - 6) * fill}
        rx="4"
        fill={color}
        fillOpacity="0.55"
        className="edge-bin-fill"
      />
    </g>
  );
}

function Edge() {
  const fromFull = "M78 38 C120 38 132 70 162 72";
  const fromEmpty = "M78 118 C120 118 132 88 162 86";
  const toDashboard = "M232 79 L306 79";
  return (
    <svg viewBox="0 0 400 160" className="size-full" aria-hidden>
      <Bin x={36} y={15} fill={0.85} color="#fbbf24" />
      <Bin x={36} y={95} fill={0.25} color="#4ade80" />
      <text x="36" y="72" className={label}>
        esp32
      </text>
      <text x="36" y="152" className={label}>
        esp8266
      </text>
      <text x="92" y="30" className="fill-warn font-mono text-[7px] tracking-[0.1em] uppercase">
        near full · reports often
      </text>
      <text x="92" y="136" className="fill-ok font-mono text-[7px] tracking-[0.1em] uppercase">
        mostly empty · reports rarely
      </text>

      {[fromFull, fromEmpty, toDashboard].map((d) => (
        <path key={d} d={d} fill="none" stroke="rgb(148 163 184 / 0.28)" strokeDasharray="3 4" />
      ))}

      {/* Edge gateway (laptop) */}
      <rect x="164" y="60" width="66" height="40" rx="4" fill="#0f1328" stroke="#a5b4fc" strokeOpacity="0.7" />
      <path d="M156 104 H238 L232 110 H162 Z" fill="#0f1328" stroke="#a5b4fc" strokeOpacity="0.7" />
      <text x="197" y="84" textAnchor="middle" className="fill-signal font-mono text-[8px] tracking-[0.12em] uppercase">
        mqtt
      </text>
      <text x="197" y="126" textAnchor="middle" className={label}>
        edge gateway
      </text>

      {/* Dashboard */}
      <rect x="308" y="52" width="64" height="54" rx="6" fill="#0f1328" stroke="rgb(148 163 184 / 0.4)" />
      {[0.55, 0.85, 0.35].map((h, i) => (
        <rect key={i} x={318 + i * 16} y={98 - 36 * h} width="10" height={36 * h} rx="2" fill="#a5b4fc" fillOpacity={0.35 + i * 0.15} />
      ))}
      <text x="340" y="124" textAnchor="middle" className={label}>
        dashboard
      </text>

      <Packet path={fromFull} duration={1.1} begin="0s" gap={0.1} color="#fbbf24" />
      <Packet path={fromFull} duration={1.1} begin="0.6s" gap={0.1} color="#fbbf24" />
      <Packet path={fromEmpty} duration={1.1} begin="0.3s" gap={3.4} color="#4ade80" />
      <Packet path={toDashboard} duration={0.9} begin="0.2s" gap={0.2} />
    </svg>
  );
}

function Calendar() {
  const booked = new Set([2, 4, 9, 10, 15, 19, 23, 25]);
  const days = ["m", "t", "w", "t", "f", "s", "s"];
  return (
    <svg viewBox="0 0 400 160" className="size-full" aria-hidden>
      {["venues", "vendors", "bookings"].map((tag, i) => (
        <g key={tag} transform={`translate(22 ${40 + i * 30})`}>
          <rect width="84" height="20" rx="10" fill="rgb(165 180 252 / 0.08)" stroke="rgb(165 180 252 / 0.3)" />
          <circle cx="12" cy="10" r="3" fill={i === 2 ? "#67e8f9" : "#a5b4fc"} />
          <text x="22" y="13" className={label}>
            {tag}
          </text>
        </g>
      ))}
      {days.map((day, i) => (
        <text key={i} x={140 + i * 36 + 15} y="30" textAnchor="middle" className={label}>
          {day}
        </text>
      ))}
      {Array.from({ length: 28 }, (_, i) => {
        const x = 140 + (i % 7) * 36;
        const y = 38 + Math.floor(i / 7) * 26;
        const isBooked = booked.has(i);
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="30"
            height="20"
            rx="4"
            fill="rgb(165 180 252 / 0.08)"
            stroke={isBooked ? "rgb(165 180 252 / 0.45)" : "rgb(148 163 184 / 0.14)"}
            className={isBooked ? "cal-cell" : undefined}
            style={isBooked ? ({ animationDelay: `${(i * 0.73) % 6}s` } as CSSProperties) : undefined}
          />
        );
      })}
    </svg>
  );
}

export function ProjectSceneArt({ scene }: { scene: ProjectScene }) {
  switch (scene) {
    case "ecg":
      return <Ecg />;
    case "graph":
      return <Graph />;
    case "edge":
      return <Edge />;
    case "calendar":
      return <Calendar />;
  }
}
