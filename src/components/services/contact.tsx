import { FiMail, FiPhone } from "react-icons/fi";
import { Reveal } from "@/components/fx/reveal";
import { WhatsAppButton } from "@/components/services/whatsapp-button";
import { textLink } from "@/components/ui/styles";
import { profile, services } from "@/content/profile";

const { contact, whatsapp } = services;

export function ServicesContact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="shell py-16 sm:py-24">
      <Reveal threshold={0.2}>
        <div className="surface relative isolate overflow-clip p-6 sm:p-10 lg:p-14">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(36rem_22rem_at_100%_0%,rgb(251_191_36/0.12),transparent_70%)]" />
          <p className="inline-flex rounded-full bg-sun px-3.5 py-1.5 text-sm font-semibold text-void">{contact.badge}</p>
          <h2 id="contact-heading" className="display-2 mt-6 max-w-2xl text-[clamp(2.1rem,6vw,3.9rem)]">
            {contact.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">{contact.text}</p>

          <WhatsAppButton size="lg" className="mt-9 w-full sm:w-auto" />

          <div className="mt-10 grid gap-6 border-t border-white/8 pt-8 sm:grid-cols-2 sm:gap-10">
            <div>
              <p className="text-sm text-ink-2">WhatsApp or call</p>
              <a
                href={whatsapp.tel}
                className="mt-1 inline-flex min-h-11 items-center gap-2.5 text-[clamp(1.6rem,7vw,2.4rem)] font-bold tracking-tight text-ink tabular-nums [font-variation-settings:'wdth'_108] hover:text-sun"
              >
                <FiPhone aria-hidden className="size-[0.7em] text-sun" />
                {whatsapp.display}
              </a>
            </div>
            <div>
              <p className="text-sm text-ink-2">Or email</p>
              <a href={`mailto:${profile.email}`} className={`${textLink} mt-1 min-h-11 text-base break-all sm:text-lg`}>
                <FiMail aria-hidden className="size-4 shrink-0" />
                {profile.email}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
