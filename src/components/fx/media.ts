/** Media-query checks for effects. Call only from effects or event handlers. */
export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** A mouse or trackpad: hover effects make sense. */
export const hasFinePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/**
 * A phone or tablet: a touch-first device whose GPU and CPU budget is far
 * smaller than a laptop's. Effects run lighter (or not at all) here.
 */
export const isTouchDevice = () => !hasFinePointer();

/** Runs `callback` once the browser is idle after load, so heavy setup never delays first paint or taps. */
export function whenIdle(callback: () => void, timeout = 1500): () => void {
  // Safari has no requestIdleCallback; a short timeout stands in for it.
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(callback, 300);
  return () => clearTimeout(id);
}

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
