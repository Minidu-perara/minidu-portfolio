import { FiArrowUpRight } from "react-icons/fi";
import { Reveal } from "@/components/fx/reveal";
import { services } from "@/content/profile";

const { demo } = services;

/** Renders nothing until a demo URL is set in the content file. */
export function ServicesDemo() {
  if (!demo.url) return null;
  return (
    <section id="demo" aria-labelledby="demo-heading" className="shell py-8 sm:py-12">
      <Reveal threshold={0.25}>
        <a
          href={demo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="surface group flex items-center justify-between gap-6 p-6 transition-shadow hover:shadow-[inset_0_0_0_1px_rgb(251_191_36/0.4)] sm:p-8"
        >
          <span>
            <span id="demo-heading" className="block text-xl font-semibold text-ink sm:text-2xl">
              {demo.title}
            </span>
            <span className="mt-1.5 block leading-relaxed text-ink-2">{demo.text}</span>
          </span>
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sun text-void transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <FiArrowUpRight aria-hidden className="size-6" />
          </span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </Reveal>
    </section>
  );
}
