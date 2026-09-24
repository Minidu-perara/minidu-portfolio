import assert from "node:assert/strict";
import { test } from "node:test";
import { landDots, toUnitVector } from "./land-mask.ts";

test("decodes every land dot from the bitset", () => {
  assert.equal(landDots().length / 3, 4621);
});

test("has land at Colombo and none in the middle of the Pacific", () => {
  const dots = landDots();
  const nearest = (lat: number, lon: number) => {
    const [x, y, z] = toUnitVector(lat, lon);
    let best = -1;
    for (let i = 0; i < dots.length; i += 3) best = Math.max(best, dots[i]! * x + dots[i + 1]! * y + dots[i + 2]! * z);
    return (Math.acos(Math.min(1, best)) * 180) / Math.PI; // degrees to the closest dot
  };
  assert.ok(nearest(6.93, 79.86) < 2, "a dot within 2° of Colombo");
  assert.ok(nearest(-20, -140) > 10, "open ocean stays empty");
});

test("unit vectors point the right way", () => {
  const [x, y, z] = toUnitVector(0, 90);
  assert.ok(Math.abs(x - 1) < 1e-9 && Math.abs(y) < 1e-9 && Math.abs(z) < 1e-9);
});
