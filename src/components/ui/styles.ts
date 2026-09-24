/** Shared class lists for interactive elements, so every control looks and focuses the same. */

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-[background-color,box-shadow,color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal";

export const buttonPrimary = `${base} bg-ink text-void shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_10px_36px_-8px_rgba(165,180,252,0.6)] hover:bg-white hover:shadow-[0_0_0_1px_rgba(255,255,255,0.45),0_12px_48px_-6px_rgba(165,180,252,0.85)]`;

export const buttonGhost = `${base} bg-white/[0.04] text-ink ring-1 ring-white/15 ring-inset backdrop-blur-md hover:bg-white/[0.09] hover:ring-white/30`;

export const iconButton =
  "inline-flex size-10 items-center justify-center rounded-full text-ink-2 ring-1 ring-white/10 ring-inset transition hover:bg-white/[0.06] hover:text-ink hover:ring-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal";

export const textLink =
  "inline-flex items-center gap-1 rounded-sm font-medium text-ink underline decoration-signal/40 underline-offset-4 transition hover:decoration-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal";
