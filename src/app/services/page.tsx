import type { Metadata } from "next";
import { Footer } from "@/components/sections/footer";
import { ServicesContact } from "@/components/services/contact";
import { ServicesDemo } from "@/components/services/demo";
import { ServicesFaq } from "@/components/services/faq";
import { ServicesHero } from "@/components/services/hero";
import { ServicesOffers } from "@/components/services/offers";
import { ServicesSteps } from "@/components/services/steps";
import { ServicesTicker } from "@/components/services/ticker";
import { WhatsAppDock } from "@/components/services/whatsapp-dock";
import { ServicesWhy } from "@/components/services/why";
import { profile, services } from "@/content/profile";

const { seo, photo } = services;

export const metadata: Metadata = {
  title: { absolute: seo.title },
  description: seo.description,
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: "/services",
    siteName: profile.name,
    title: seo.title,
    description: seo.description,
    images: [{ url: photo.src.src, width: photo.src.width, height: photo.src.height, alt: photo.alt }],
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* A warmer navy wash at the top (from the flyer), settling into the
          site's shared background. */}
      <main id="main" className="flex-1 bg-[linear-gradient(180deg,var(--color-navy),var(--color-void)_70rem)]">
        <ServicesHero />
        <ServicesTicker />
        <ServicesOffers />
        <ServicesSteps />
        <ServicesDemo />
        <ServicesWhy />
        <ServicesFaq />
        <ServicesContact />
      </main>
      {/* Keeps the footer clear of the phone WhatsApp bar. */}
      <div className="pb-24 md:pb-0">
        <Footer />
      </div>
      <WhatsAppDock />
    </>
  );
}
