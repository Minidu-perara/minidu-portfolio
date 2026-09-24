/** Media-query checks for effects. Call only from effects or event handlers. */
export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** A mouse or trackpad: hover effects make sense. */
export const hasFinePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
