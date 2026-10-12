import Image from "next/image";
import { WhatsAppButton } from "@/components/services/whatsapp-button";
import { profile, services } from "@/content/profile";

const { hero, photo } = services;

export function ServicesHero() {
  return (
    <section id="top" aria-labelledby="services-heading" className="relative isolate overflow-clip">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70rem_42rem_at_85%_0%,#11163d,transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(40rem_26rem_at_0%_100%,rgb(251_191_36/0.07),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-void to-transparent" />
      </div>

      <div className="shell grid gap-10 pt-24 pb-14 sm:pt-32 sm:pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:items-center lg:gap-16 lg:pt-36 lg:pb-28">
        {/* Phones see a compact "who you're talking to" row first; wider screens a full portrait. */}
        <figure className="flex items-center gap-4 motion-safe:animate-fade-up lg:order-last lg:block">
          <div className="relative w-24 shrink-0 overflow-hidden rounded-2xl shadow-[0_24px_60px_-24px_rgb(0_0_0/0.9)] ring-1 ring-white/12 sm:w-28 lg:w-full lg:rounded-[1.75rem]">
            <Image
              src={photo.src}
              alt={photo.alt}
              placeholder="blur"
              priority
              sizes="(min-width: 1024px) 25rem, 7rem"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="lg:mt-6">
            <span className="block text-xl font-bold tracking-tight text-ink [font-variation-settings:'wdth'_108] lg:text-2xl">
              {profile.name}
            </span>
            <span className="mt-0.5 block text-ink-2 lg:text-lg">Software Engineer</span>
          </figcaption>
        </figure>

        <div>
          <p className="label-mono text-sun motion-safe:animate-fade-up motion-safe:[animation-delay:80ms]">{hero.eyebrow}</p>
          <h1
            id="services-heading"
            className="display-2 mt-5 text-[clamp(2.9rem,12.5vw,6.25rem)] leading-[0.98] font-extrabold motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]"
          >
            {hero.title}
          </h1>
          <span aria-hidden className="mt-7 block h-1.5 w-20 rounded-full bg-sun motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]" />
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl motion-safe:animate-fade-up motion-safe:[animation-delay:320ms]">
            {hero.text}
          </p>
          <div className="mt-9 motion-safe:animate-fade-up motion-safe:[animation-delay:400ms]">
            <WhatsAppButton size="lg" className="w-full sm:w-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
