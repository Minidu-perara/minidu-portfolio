import { services } from "@/content/profile";

const items = services.build.categories.flatMap((category) => category.items);

/**
 * A slow, endless band of everything on offer, between the hero and the
 * grid: it shows the range at a glance. Decorative, since the grid below
 * lists the same services.
 */
export function ServicesTicker() {
  const content = [...items, ...items]; // two copies make the loop seamless
  return (
    <div aria-hidden className="marquee overflow-hidden border-y border-white/6 bg-white/[0.012] py-5">
      <div className="marquee-track gap-6 pr-6">
        {content.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-6 text-[clamp(1.25rem,3.6vw,2.1rem)] leading-none font-bold whitespace-nowrap text-ink/80 [font-variation-settings:'wdth'_110]"
          >
            {item}
            <span className="text-[0.6em] text-signal">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
