import type { IconType } from "react-icons";
import { FiCheck, FiGrid, FiLifeBuoy, FiPackage, FiShoppingBag, FiTruck } from "react-icons/fi";
import { Reveal } from "@/components/fx/reveal";
import { ServiceSection } from "@/components/services/service-section";
import { services, type ServiceOffer } from "@/content/profile";

const icons: Record<ServiceOffer["icon"], IconType> = {
  store: FiShoppingBag,
  stock: FiPackage,
  dealer: FiTruck,
  admin: FiGrid,
};

const { build, support } = services;

export function ServicesOffers() {
  return (
    <ServiceSection id="build" eyebrow={build.eyebrow} title={build.title}>
      <ul className="grid gap-4 sm:grid-cols-2">
        {build.offers.map((offer) => {
          const Icon = icons[offer.icon];
          return (
            <li key={offer.title}>
              <Reveal threshold={0.25} className="h-full">
                <div className="surface flex h-full gap-4 p-5 sm:gap-5 sm:p-7">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sun text-void">
                    <Icon aria-hidden className="size-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink sm:text-xl">{offer.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-ink-2">{offer.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>

      {/* Its own block, not a fifth card: this is what happens after the build. */}
      <Reveal threshold={0.25} className="mt-4">
        <section
          aria-labelledby="support-heading"
          className="surface flex flex-col gap-6 p-5 ring-1 ring-sun/25 sm:p-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex gap-4 sm:gap-5">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sun/12 text-sun ring-1 ring-sun/40">
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
                <FiCheck aria-hidden className="size-4 text-sun" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>
    </ServiceSection>
  );
}
