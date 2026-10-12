import type { ComponentType } from "react";
import type { IconType } from "react-icons";
import { FiArrowRight, FiCheck, FiCloud, FiCode, FiCpu, FiLayers, FiLifeBuoy, FiShoppingBag, FiZap } from "react-icons/fi";
import { PlayWhenVisible } from "@/components/fx/play-when-visible";
import { Reveal } from "@/components/fx/reveal";
import { SpotlightGroup } from "@/components/fx/spotlight";
import { ServiceSection } from "@/components/services/service-section";
import { ChatPreview, CloudPreview, ConnectPreview, DevicePreview, StockPreview, StorePreview } from "@/components/services/visuals";
import { services, whatsappLink, type ServiceCategory } from "@/content/profile";

/**
 * Each category's icon, preview and place in the bento grid: on wide screens
 * a 2+1 row, a row of three, then one full-width tile.
 */
type Tile = {
  icon: IconType;
  preview?: ComponentType;
  span?: string;
  wide?: boolean;
  /** The category's own colour: its icon tile and a soft glow in the corner. */
  tone: string;
  glow: string;
};

const tiles: Record<ServiceCategory["id"], Tile> = {
  web: {
    icon: FiShoppingBag,
    preview: StorePreview,
    span: "sm:col-span-2",
    wide: true,
    tone: "bg-sun",
    glow: "bg-[radial-gradient(34rem_16rem_at_0%_0%,rgb(251_191_36/0.12),transparent_70%)]",
  },
  systems: {
    icon: FiLayers,
    preview: StockPreview,
    tone: "bg-ok",
    glow: "bg-[radial-gradient(26rem_14rem_at_0%_0%,rgb(74_222_128/0.11),transparent_70%)]",
  },
  ai: {
    icon: FiZap,
    preview: ChatPreview,
    tone: "bg-violet",
    glow: "bg-[radial-gradient(26rem_14rem_at_0%_0%,rgb(196_181_253/0.13),transparent_70%)]",
  },
  devices: {
    icon: FiCpu,
    preview: DevicePreview,
    tone: "bg-pulse",
    glow: "bg-[radial-gradient(26rem_14rem_at_0%_0%,rgb(103_232_249/0.11),transparent_70%)]",
  },
  cloud: {
    icon: FiCloud,
    preview: CloudPreview,
    tone: "bg-signal",
    glow: "bg-[radial-gradient(26rem_14rem_at_0%_0%,rgb(165_180_252/0.13),transparent_70%)]",
  },
  custom: {
    icon: FiCode,
    preview: ConnectPreview,
    span: "sm:col-span-2 lg:col-span-3",
    wide: true,
    tone: "bg-alert",
    glow: "bg-[radial-gradient(40rem_16rem_at_0%_0%,rgb(251_113_133/0.11),transparent_70%)]",
  },
};

const { build, support } = services;

export function ServicesOffers() {
  return (
    <ServiceSection id="build" eyebrow={build.eyebrow} title={build.title} intro={build.intro}>
      <SpotlightGroup>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {build.categories.map((category) => {
            const { icon: Icon, preview: Preview, span = "", wide, tone, glow } = tiles[category.id];
            return (
              <li key={category.id} className={span}>
                {/* Both Reveal wrappers stretch, so tiles in a row share one height. */}
                <Reveal threshold={0.15} className="h-full *:h-full">
                  <article
                    aria-labelledby={`service-${category.id}`}
                    className={`surface spot group flex h-full flex-col gap-5 bg-navy/60 p-5 sm:p-6 ${glow}`}
                  >
                    <div className="flex items-start gap-4">
                      <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${tone} text-void transition-transform duration-500 ease-out-expo group-hover:-rotate-6`}>
                        <Icon aria-hidden className="size-6" />
                      </span>
                      <div>
                        <h3 id={`service-${category.id}`} className="text-lg font-semibold text-ink sm:text-xl">
                          {category.title}
                        </h3>
                        <p className="mt-1 leading-relaxed text-ink-2">{category.text}</p>
                      </div>
                    </div>
                    {Preview && (
                      <PlayWhenVisible>
                        <Preview />
                      </PlayWhenVisible>
                    )}
                    <ul className={`grid gap-2 ${wide ? "sm:grid-cols-2 sm:gap-x-6" : ""}`}>
                      {category.items.map((item) => (
                        <li key={item} className="flex gap-2.5 text-[0.95rem] leading-snug text-ink">
                          <FiCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-signal" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={whatsappLink(category.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-sun underline decoration-sun/30 underline-offset-4 transition-colors hover:decoration-sun"
                    >
                      {build.ask}
                      <span className="sr-only">: {category.title} (opens WhatsApp)</span>
                      <FiArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </SpotlightGroup>

      {/* Its own block, not another tile: this is what happens after the build. */}
      <Reveal threshold={0.25} className="mt-4">
        <section
          aria-labelledby="support-heading"
          className="surface flex flex-col gap-6 p-5 ring-1 ring-signal/20 sm:p-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex gap-4 sm:gap-5">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-signal/12 text-signal ring-1 ring-signal/40">
              <FiLifeBuoy aria-hidden className="size-6" />
            </span>
            <div>
              <h3 id="support-heading" className="text-lg font-semibold text-ink sm:text-xl">
                {support.title}
              </h3>
              <p className="mt-1.5 leading-relaxed text-ink-2">{support.text}</p>
            </div>
          </div>
          <ul className="flex flex-wrap gap-2 lg:justify-end">
            {support.items.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3.5 py-2 text-sm text-ink ring-1 ring-white/10">
                <FiCheck aria-hidden className="size-4 text-signal" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>
    </ServiceSection>
  );
}
