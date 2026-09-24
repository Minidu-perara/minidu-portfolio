import { FiMail } from "react-icons/fi";
import { CopyEmailButton } from "@/components/copy-email-button";
import { Section } from "@/components/ui/section";
import { buttonPrimary } from "@/components/ui/styles";
import { profile } from "@/content/profile";

export function ContactSection() {
  return (
    <Section id="contact" title="Contact">
      <div className="rounded-3xl bg-indigo-400/5 p-6 ring-1 ring-white/10 sm:p-10">
        <h3 className="text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">{profile.contact.heading}</h3>
        <p className="mt-3 max-w-md leading-relaxed text-slate-400">
          {profile.contact.text}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a href={`mailto:${profile.email}`} className={buttonPrimary}>
            <FiMail aria-hidden className="size-4" />
            Say hello
          </a>
          <div className="flex max-w-full items-center gap-1 rounded-full bg-black/30 py-1 pr-1 pl-4 text-sm text-slate-300 ring-1 ring-white/10">
            <span className="truncate">{profile.email}</span>
            <CopyEmailButton email={profile.email} />
          </div>
        </div>
      </div>
    </Section>
  );
}
