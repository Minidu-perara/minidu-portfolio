/** Shared class lists for interactive elements, so every button looks and focuses the same. */

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none";

export const buttonPrimary = `${base} bg-indigo-300 text-slate-950 hover:bg-indigo-200 active:bg-indigo-300`;

export const buttonSecondary = `${base} bg-white/5 text-slate-100 ring-1 ring-white/15 ring-inset backdrop-blur hover:bg-white/10`;

export const iconButton =
  "inline-flex size-10 items-center justify-center rounded-full text-slate-400 ring-1 ring-white/10 ring-inset transition hover:bg-white/5 hover:text-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:outline-none";

export const textLink =
  "rounded-sm font-medium text-slate-100 underline decoration-indigo-300/40 underline-offset-4 transition hover:decoration-indigo-300 focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:outline-none";
