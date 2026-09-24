import { FiDownload, FiMail } from "react-icons/fi";
import { DecodeText } from "@/components/fx/decode-text";
import { KineticName } from "@/components/fx/kinetic-name";
import { Magnetic } from "@/components/fx/magnetic";
import { SignalField } from "@/components/fx/signal-field";
import { LocalTime } from "@/components/live/local-time";
import { buttonGhost, buttonPrimary } from "@/components/ui/styles";
import { profile } from "@/content/profile";
import { utcOffsetMinutes } from "@/lib/timezones";

const { home } = profile;
const offset = utcOffsetMinutes(home.timeZone);
const utcLabel = `UTC${offset >= 0 ? "+" : "−"}${String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0")}:${String(Math.abs(offset) % 60).padStart(2, "0")}`;
const coordinates = `${home.lat.toFixed(4)}° N · ${home.lon.toFixed(4)}° E`;

export function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative isolate flex min-h-[100svh] flex-col overflow-clip">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(80rem_50rem_at_85%_5%,#11163d,transparent_65%)]">
        <SignalField className="absolute inset-0 size-full opacity-0 transition-opacity duration-[2.2s] data-[state=ready]:opacity-100" />
        {/* Keep the text side calm and legible. */}
        <div className="absolute inset-0 bg-[radial-gradient(75rem_48rem_at_8%_92%,rgb(4_5_10/0.94),rgb(4_5_10/0.55)_45%,transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-void to-transparent" />
      </div>

      <div className="shell flex flex-1 flex-col pt-24 pb-8 sm:pt-28">
        <div className="my-auto py-10">
          <p className="inline-flex items-center gap-2.5 rounded-full bg-void/50 px-3.5 py-1.5 text-xs text-ink-2 ring-1 ring-white/10 backdrop-blur-md motion-safe:animate-fade-up">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-ok motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-ok" />
            </span>
            <span className="font-medium text-ink">{profile.availability}</span>
            <span aria-hidden className="text-ink-3">
              ·
            </span>
            <span>
              {home.name} <LocalTime timeZone={home.timeZone} className="text-ink" />
            </span>
          </p>

          <DecodeText text={profile.role} delay={500} className="label-mono mt-8 block text-signal sm:text-[0.8rem]" />

          <KineticName
            lines={profile.nameLines}
            label={profile.name}
            className="display-hero mt-5 text-[clamp(3.3rem,19vw,11.5rem)]"
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,36rem)_auto] lg:items-end lg:justify-between">
            <p className="text-lg leading-relaxed text-ink-2 sm:text-xl motion-safe:animate-fade-up motion-safe:[animation-delay:900ms]">
              {profile.pitch}
            </p>
            <div className="flex flex-wrap gap-3 motion-safe:animate-fade-up motion-safe:[animation-delay:1050ms]">
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
          </div>
        </div>

        <div className="label-mono flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-white/8 pt-5 text-[0.62rem] text-ink-3 motion-safe:animate-fade-in motion-safe:[animation-delay:1300ms]">
          <span>{coordinates}</span>
          <span>{utcLabel}</span>
          <span className="hidden sm:inline">{profile.status}</span>
          <a href="#about" className="group hidden items-center gap-3 text-ink-2 transition-colors hover:text-ink md:flex">
            Scroll
            <span aria-hidden className="relative h-7 w-px overflow-hidden bg-white/12">
              <span className="absolute inset-x-0 top-0 h-3 animate-scroll-cue bg-signal motion-reduce:animate-none" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
