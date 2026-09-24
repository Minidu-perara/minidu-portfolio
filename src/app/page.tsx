import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SocialLinks } from "@/components/social-links";
import { profile } from "@/content/profile";

export default function HomePage() {
  return (
    <main id="main" className="flex flex-1 flex-col items-center px-4 pb-8 md:px-8">
      <section
        aria-labelledby="hero-title"
        className="flex min-h-[60vh] w-full max-w-2xl flex-1 flex-col items-center justify-center gap-3 py-6 md:min-h-[70vh] md:gap-4 md:py-10"
      >
        <Image
          src={profile.photo.src}
          alt={profile.photo.alt}
          width={150}
          height={150}
          placeholder="blur"
          priority
          className="mb-2 size-[150px] rounded-full object-cover shadow-[0_4px_32px_0_rgba(165,180,252,0.18)] transition-transform duration-200 hover:scale-105 motion-safe:animate-fade-in"
        />
        <h1
          id="hero-title"
          className="text-center text-4xl font-extrabold tracking-tight drop-shadow-lg transition-colors duration-300 hover:text-indigo-300 motion-safe:animate-fade-up md:text-7xl"
        >
          {profile.name}
        </h1>
        <p className="bg-linear-to-r from-indigo-300 via-pink-300 to-indigo-400 bg-clip-text text-center text-xl font-semibold text-transparent drop-shadow-lg motion-safe:animate-fade-up motion-safe:[animation-delay:100ms] md:text-3xl">
          {profile.tagline}
        </p>
        <div className="mt-6 motion-safe:animate-fade-up motion-safe:[animation-delay:300ms]">
          <SocialLinks />
        </div>
        <a
          href={`mailto:${profile.email}`}
          className="glass mt-2 rounded-full px-5 py-1.5 text-sm text-indigo-200 shadow-md transition-colors duration-150 hover:bg-indigo-500/10 hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none motion-safe:animate-fade-up motion-safe:[animation-delay:350ms]"
        >
          {profile.email}
        </a>
        <p className="mt-2 text-xs text-gray-500 motion-safe:animate-fade-up motion-safe:[animation-delay:400ms]">
          Based in {profile.location}
        </p>
      </section>

      <Reveal className="mt-20 mb-4 w-full max-w-xl">
        <section
          aria-labelledby="about-title"
          className="glass rounded-3xl px-8 py-4 text-center text-sm text-indigo-100 shadow-md"
        >
          <h2 id="about-title" className="mb-2 text-base font-bold text-indigo-200">
            About Me
          </h2>
          <p>{profile.summary}</p>
        </section>
      </Reveal>
    </main>
  );
}
