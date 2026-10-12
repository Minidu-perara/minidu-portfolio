import Image from "next/image";
import { FiArrowDown } from "react-icons/fi";
import { NeuralField } from "@/components/fx/neural-field";
import { WhatsAppButton } from "@/components/services/whatsapp-button";
import { profile, services } from "@/content/profile";

const { hero, photo } = services;

export function ServicesHero() {
  return (
    <section id="top" aria-labelledby="services-heading" className="relative isolate overflow-clip">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70rem_42rem_at_85%_0%,#11163d,transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(40rem_26rem_at_0%_100%,rgb(251_191_36/0.07),transparent_70%)]" />
        <NeuralField tone="sun" className="absolute inset-0 size-full opacity-0 transition-opacity duration-[1.6s] data-[state=ready]:opacity-80 lg:data-[state=ready]:opacity-100" />
        {/* Keep the words calm: the network fades out behind the text column. */}
        <div className="absolute inset-0 bg-[radial-gradient(52rem_36rem_at_18%_62%,rgb(7_12_34/0.8),rgb(7_12_34/0.35)_55%,transparent_80%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-navy to-transparent" />
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
          <p className="inline-flex items-center gap-2.5 rounded-full bg-ok/10 px-3.5 py-1.5 text-sm font-medium text-ok ring-1 ring-ok/25 motion-safe:animate-fade-up">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-ok motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-ok" />
            </span>
            {hero.status}
          </p>
          <p className="label-mono mt-6 text-signal motion-safe:animate-fade-up motion-safe:[animation-delay:80ms]">{hero.eyebrow}</p>
          <h1
            id="services-heading"
            className="display-2 mt-5 text-[clamp(2.9rem,12.5vw,6.25rem)] leading-[0.98] font-extrabold"
          >
            {/* Each word rises out of its own line box, one after another. */}
            {hero.title.split(" ").map((word, i) => (
              <span key={i}>
                <span className="-mb-[0.12em] inline-block overflow-clip pb-[0.12em] align-top">
                  <span className="inline-block motion-safe:animate-rise" style={{ animationDelay: `${140 + i * 110}ms` }}>
                    {word}
                  </span>
                </span>{" "}
              </span>
            ))}
          </h1>
          <span aria-hidden className="svc-rule mt-7 block h-1.5 w-20 rounded-full bg-sun" />
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl motion-safe:animate-fade-up motion-safe:[animation-delay:320ms]">
            {hero.text}
          </p>
          <div className="mt-9 flex flex-col gap-3 motion-safe:animate-fade-up motion-safe:[animation-delay:400ms] sm:flex-row sm:items-center">
            <WhatsAppButton size="lg" className="w-full sm:w-auto" />
            <a
              href="#build"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-6 text-base font-semibold text-ink ring-1 ring-white/15 transition-colors ring-inset hover:bg-white/[0.06] hover:ring-white/30"
            >
              {hero.secondary}
              <FiArrowDown aria-hidden className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
