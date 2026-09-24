export function TagList({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full bg-white/[0.04] px-3 py-1 text-xs font-medium text-ink-2 ring-1 ring-white/10 ring-inset"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
