export function TagList({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full bg-indigo-400/10 px-3 py-1 text-xs font-medium text-indigo-200 ring-1 ring-indigo-300/20 ring-inset"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
