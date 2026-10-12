import assert from "node:assert/strict";
import { test } from "node:test";
import { buildNetwork, seededRandom } from "./neural.ts";

test("the seeded random stream is repeatable and in [0, 1)", () => {
  const a = seededRandom(42);
  const b = seededRandom(42);
  for (let i = 0; i < 100; i++) {
    const value = a();
    assert.equal(value, b());
    assert.ok(value >= 0 && value < 1);
  }
});

test("builds roughly the requested number of neurons inside the area", () => {
  const { neurons } = buildNetwork(1280, 800, 64);
  assert.ok(neurons.length >= 56 && neurons.length <= 72, `got ${neurons.length}`);
  for (const n of neurons) assert.ok(n.x > 0 && n.x < 1280 && n.y > 0 && n.y < 800);
});

test("synapses are unique, undirected and mirrored in the neighbour lists", () => {
  const { synapses, neighbours } = buildNetwork(900, 600, 40);
  const keys = new Set(synapses.map(([a, b]) => `${a}-${b}`));
  assert.equal(keys.size, synapses.length);
  for (const [a, b] of synapses) {
    assert.ok(a < b);
    assert.ok(neighbours[a]!.includes(b) && neighbours[b]!.includes(a));
  }
});

test("every neuron is wired to something, with no long wires", () => {
  const { neurons, synapses, neighbours, cell } = buildNetwork(390, 900, 26);
  assert.ok(neighbours.every((list) => list.length > 0));
  for (const [a, b] of synapses) {
    const d = Math.hypot(neurons[a]!.x - neurons[b]!.x, neurons[a]!.y - neurons[b]!.y);
    assert.ok(d <= cell * 1.9 + 1e-9);
  }
});

test("the same size always gives the same network", () => {
  assert.deepEqual(buildNetwork(800, 500, 30), buildNetwork(800, 500, 30));
});
