import Image from "next/image";
import { FiArrowUpRight, FiBookOpen, FiFileText, FiMail, FiMapPin } from "react-icons/fi";
import { SidebarNav, type NavSection } from "@/components/section-nav";
import { SocialLinks } from "@/components/social-links";
import { buttonPrimary, buttonSecondary } from "@/components/ui/styles";
import { profile } from "@/content/profile";

/**
 * Identity, primary actions and navigation. Sticky beside the content on
 * large screens; a regular hero block above it on smaller ones.
 */
export function Intro({ sections }: { sections: readonly NavSection[] }) {
  return (
    <header className="pt-16 pb-10 sm:pt-24 lg:sticky lg:top-0 lg:flex lg:max-h-dvh lg:w-[42%] lg:flex-col lg:justify-between lg:py-12 lg:tall:py-20">
      <div>
        <div className="flex items-center gap-5 motion-safe:animate-fade-up">
          <Image
            src={profile.photo.src}
            alt={profile.photo.alt}
            width={80}
            height={80}
            placeholder="blur"
            priority
            className="size-16 shrink-0 rounded-full object-cover shadow-[0_0_32px_-4px_rgba(165,180,252,0.45)] ring-2 ring-indigo-300/30 sm:size-20"
          />
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">{profile.name}</h1>
            <p className="mt-1.5 w-fit bg-linear-to-r from-indigo-300 via-pink-300 to-indigo-300 bg-clip-text text-lg font-medium text-transparent sm:text-xl">
              {profile.role}
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-sm leading-relaxed text-slate-300 motion-safe:animate-fade-up motion-safe:[animation-delay:100ms]">
          {profile.pitch}
        </p>

        <ul className="mt-5 flex flex-col gap-2 text-sm text-slate-400 motion-safe:animate-fade-up motion-safe:[animation-delay:150ms]">
          <li className="flex items-center gap-2.5">
            <FiBookOpen aria-hidden className="size-4 shrink-0 text-indigo-300" />
            {profile.status}
          </li>
          <li className="flex items-center gap-2.5">
            <FiMapPin aria-hidden className="size-4 shrink-0 text-indigo-300" />
            Based in {profile.location}
          </li>
        </ul>

        <div className="mt-8 flex flex-wrap gap-3 motion-safe:animate-fade-up motion-safe:[animation-delay:200ms]">
          <a href={`mailto:${profile.email}`} className={buttonPrimary}>
            <FiMail aria-hidden className="size-4" />
            Email me
          </a>
          <a href={profile.resumeHref} target="_blank" rel="noopener" className={buttonSecondary}>
            <FiFileText aria-hidden className="size-4" />
            Résumé
            <FiArrowUpRight aria-hidden className="size-3.5 text-slate-400" />
            <span className="sr-only">(PDF, opens in a new tab)</span>
          </a>
        </div>

        <div className="mt-14 motion-safe:animate-fade-in lg:mt-8 lg:tall:mt-14 motion-safe:[animation-delay:300ms]">
          <SidebarNav sections={sections} />
        </div>
      </div>

      <div className="mt-8 motion-safe:animate-fade-in motion-safe:[animation-delay:300ms] lg:mt-8">
        <SocialLinks />
      </div>
    </header>
  );
}
