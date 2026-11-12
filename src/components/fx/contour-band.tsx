/**
 * A strip of drifting contour lines between sections: the hero's water,
 * carried down the page. Pure SVG and one compositor-only CSS animation, so
 * it costs nothing to run. Decorative.
 */

const WIDTH = 1200;
const HEIGHT = 120;
const LINES = 7;

/** Height of the "terrain" at x; periodic over WIDTH so the loop is seamless. */
const terrain = (x: number) => {
  const t = (x / WIDTH) * Math.PI * 2;
  return Math.sin(t) * 0.5 + Math.sin(t * 2 + 1.3) * 0.28 + Math.sin(t * 3 + 4.1) * 0.16 + Math.sin(t * 5 + 0.7) * 0.06;
};

// Two periods side by side; the animation slides exactly one period.
const paths = Array.from({ length: LINES }, (_, i) => {
  const level = i / (LINES - 1);
  const base = 14 + level * (HEIGHT - 28);
  // Lines bunch together on slopes and spread on flats, as contours do.
  const swing = 10 + 16 * Math.sin(level * Math.PI);
  let d = "";
  for (let x = 0; x <= WIDTH * 2; x += 20) {
    const y = base + terrain(x + level * 140) * swing;
    d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
  }
  return d;
});

const strokes = { signal: "stroke-signal", sun: "stroke-sun" } as const;

export function ContourBand({ tone = "signal", className = "" }: { tone?: keyof typeof strokes; className?: string }) {
  return (
    <div aria-hidden className={`contour-band h-24 overflow-hidden sm:h-32 ${className}`}>
      <svg
        viewBox={`0 0 ${WIDTH * 2} ${HEIGHT}`}
        preserveAspectRatio="none"
        fill="none"
        className={`contour-band-track h-full w-[200%] min-w-[150rem] ${strokes[tone]}`}
      >
        {paths.map((d, i) => (
          <path key={i} d={d} vectorEffect="non-scaling-stroke" strokeWidth={i % 3 === 1 ? 1.4 : 1} opacity={i % 3 === 1 ? 0.55 : 0.22} />
        ))}
      </svg>
    </div>
  );
}
