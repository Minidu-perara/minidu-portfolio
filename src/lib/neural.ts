/**
 * The network behind the /services hero: neurons on a jittered grid, each
 * wired to its nearest neighbours. Pure and seeded, so the same size always
 * gives the same network and the shape can be tested.
 */

export type Neuron = {
  /** Resting position in pixels; the neuron drifts around it. */
  x: number;
  y: number;
  /** Drift phase and reach, so neighbours never move in step. */
  phase: number;
  reach: number;
};

export type Network = {
  neurons: Neuron[];
  /** Undirected synapses as index pairs, each listed once (a < b). */
  synapses: [number, number][];
  /** For each neuron, the neurons it is wired to. */
  neighbours: number[][];
  /** Grid cell size in pixels: the network's natural unit of distance. */
  cell: number;
};

/** A small, fast seeded PRNG (mulberry32). */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Builds a network of about `count` neurons filling `width` × `height`.
 * Each neuron links to its `links` nearest neighbours within reach, so the
 * mesh is local (signals spread like a ripple) and has no long, crossing
 * wires.
 */
export function buildNetwork(width: number, height: number, count: number, links = 3, seed = 7): Network {
  const random = seededRandom(seed);
  const cols = Math.max(1, Math.round(Math.sqrt((count * width) / height)));
  const rows = Math.max(1, Math.ceil(count / cols));
  const cellW = width / cols;
  const cellH = height / rows;
  const cell = Math.sqrt(cellW * cellH);

  const neurons: Neuron[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      neurons.push({
        x: (col + 0.15 + random() * 0.7) * cellW,
        y: (row + 0.15 + random() * 0.7) * cellH,
        phase: random() * Math.PI * 2,
        reach: cell * (0.08 + random() * 0.1),
      });
    }
  }

  const maxDistance = cell * 1.9;
  const seen = new Set<number>();
  const synapses: [number, number][] = [];
  const neighbours: number[][] = neurons.map(() => []);
  neurons.forEach((a, i) => {
    const nearest = neurons
      .map((b, j) => ({ j, d: Math.hypot(a.x - b.x, a.y - b.y) }))
      .filter(({ j, d }) => j !== i && d <= maxDistance)
      .sort((p, q) => p.d - q.d)
      .slice(0, links);
    for (const { j } of nearest) {
      const lo = Math.min(i, j);
      const hi = Math.max(i, j);
      const key = lo * neurons.length + hi;
      if (seen.has(key)) continue;
      seen.add(key);
      synapses.push([lo, hi]);
      neighbours[lo]!.push(hi);
      neighbours[hi]!.push(lo);
    }
  });

  return { neurons, synapses, neighbours, cell };
}
