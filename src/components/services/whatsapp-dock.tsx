"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { services } from "@/content/profile";

/**
 * Keeps WhatsApp one tap away: a bar along the bottom on phones and a
 * floating button on wider screens. It steps aside while one of the page's
 * own WhatsApp buttons is on screen, so there is never two at once.
 */
export function WhatsAppDock() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setShow(visible.size === 0);
    });
    for (const cta of document.querySelectorAll("[data-whatsapp-cta]")) observer.observe(cta);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-40 bg-linear-to-t from-void via-void/90 to-transparent px-4 pt-6 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] transition-[translate,opacity] duration-500 ease-out-expo md:inset-x-auto md:right-6 md:bottom-6 md:bg-none md:p-0 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0 md:translate-y-6"
      }`}
    >
      <a
        href={services.whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-13 w-full items-center justify-center gap-2.5 rounded-full bg-whatsapp px-6 text-base font-semibold text-void shadow-[0_12px_40px_-10px_rgb(0_0_0/0.8)] transition-colors hover:bg-[#3fe17d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-whatsapp md:w-auto"
      >
        <FaWhatsapp aria-hidden className="size-6 shrink-0" />
        {services.whatsapp.label}
        <span className="sr-only">(opens WhatsApp)</span>
      </a>
    </div>
  );
}
