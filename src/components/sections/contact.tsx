import { FiDownload, FiMail } from "react-icons/fi";
import { CopyEmailButton } from "@/components/copy-email-button";
import { Magnetic } from "@/components/fx/magnetic";
import { Reveal } from "@/components/fx/reveal";
import { Globe } from "@/components/globe";
import { TimezoneOverlap } from "@/components/live/timezone-overlap";
import { SocialLinks } from "@/components/social-links";
import { Section } from "@/components/ui/section";
import { buttonGhost, buttonPrimary } from "@/components/ui/styles";
import { profile, remoteCities, sectionCopy } from "@/content/profile";

export function ContactSection() {
  return (
    <Section id="contact" eyebrow={sectionCopy.contact.eyebrow} title={sectionCopy.contact.title}>
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <p className="max-w-lg text-lg leading-relaxed text-ink-2 sm:text-xl">{profile.contact.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <a href={`mailto:${profile.email}`} className={buttonPrimary}>
                <FiMail aria-hidden className="size-4" />
                Email me
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.resume.href} download={profile.resume.downloadName} className={buttonGhost}>
                <FiDownload aria-hidden className="size-4" />
                Download CV
                <span className="sr-only">(PDF)</span>
              </a>
            </Magnetic>
          </div>
          <div className="mt-5 flex w-fit max-w-full items-center gap-1 rounded-full bg-white/[0.04] py-1 pr-1 pl-4 text-sm text-ink-2 ring-1 ring-white/10">
            <span className="truncate">{profile.email}</span>
            <CopyEmailButton email={profile.email} />
          </div>
          <div className="mt-6">
            <SocialLinks />
          </div>
          <div className="mt-12">
            <TimezoneOverlap home={profile.home} cities={remoteCities} />
          </div>
        </Reveal>

        <Reveal threshold={0.2} className="relative mx-auto w-full max-w-[34rem]">
          <Globe home={profile.home} cities={remoteCities} />
          <p className="label-mono mt-1 text-center text-[0.6rem] text-ink-3">
            {profile.home.name}, working with teams anywhere · drag to spin
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
