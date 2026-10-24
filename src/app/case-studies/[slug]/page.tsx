import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { Reveal } from "@/components/fx/reveal";
import { Footer } from "@/components/sections/footer";
import { TagList } from "@/components/ui/tag-list";
import { textLink } from "@/components/ui/styles";
import { caseStudies, profile } from "@/content/profile";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) return {};
  const path = `/case-studies/${study.slug}`;
  return {
    title: study.seo.title,
    description: study.seo.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      siteName: profile.name,
      title: study.seo.title,
      description: study.seo.description,
      images: [
        {
          url: profile.photo.src.src,
          width: profile.photo.src.width,
          height: profile.photo.src.height,
          alt: profile.photo.alt,
        },
      ],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) notFound();

  return (
    <>
      <main id="main" className="flex-1">
        <article className="shell pt-28 pb-20 sm:pt-36 sm:pb-28">
          <div className="mx-auto max-w-2xl">
            <Link href="/#experience" className={`${textLink} text-sm`}>
              <FiArrowLeft aria-hidden className="size-4" />
              Back to experience
            </Link>

            <header className="mt-8">
              <h1 className="display-2 text-[clamp(2rem,6vw,3.4rem)]">{study.title}</h1>
              <p className="mt-5 text-ink-2 italic">{study.meta}</p>
            </header>

            {study.sections.map((section) => (
              <Reveal key={section.heading} threshold={0.1} className="mt-12">
                <section aria-labelledby={`cs-${section.heading}`}>
                  <h2 id={`cs-${section.heading}`} className="text-2xl font-bold tracking-tight text-ink [font-variation-settings:'wdth'_104]">
                    {section.heading}
                  </h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="mt-4 text-lg leading-relaxed text-ink-2">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-4 space-y-3">
                      {section.bullets.map((bullet) => (
                        <li key={bullet.text} className="flex gap-3 text-lg leading-relaxed text-ink-2">
                          <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-signal" />
                          <span>
                            {bullet.lead && <strong className="font-semibold text-ink">{bullet.lead} </strong>}
                            {bullet.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}

            <Reveal threshold={0.1} className="mt-12 border-t border-white/8 pt-8">
              <p className="label-mono mb-4 text-[0.62rem] text-ink-3">Tech</p>
              <TagList items={study.tech} label="Technologies used" />
            </Reveal>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
