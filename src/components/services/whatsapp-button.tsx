import { FaWhatsapp } from "react-icons/fa";
import { services } from "@/content/profile";

const sizes = {
  md: "min-h-12 px-6 text-base",
  lg: "min-h-14 px-7 text-lg",
} as const;

/**
 * The page's one call to action: opens a WhatsApp chat with a message
 * already typed. Marked with data-whatsapp-cta so the dock can step aside
 * while one of these is on screen.
 */
export function WhatsAppButton({ size = "md", className = "" }: { size?: keyof typeof sizes; className?: string }) {
  return (
    <a
      href={services.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      data-whatsapp-cta
      className={`inline-flex items-center justify-center gap-2.5 rounded-full bg-whatsapp font-semibold text-void shadow-[0_10px_40px_-12px_rgb(37_211_102/0.6)] transition-[background-color,box-shadow] duration-300 hover:bg-[#3fe17d] hover:shadow-[0_14px_50px_-12px_rgb(37_211_102/0.8)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-whatsapp ${sizes[size]} ${className}`}
    >
      <FaWhatsapp aria-hidden className="size-[1.35em] shrink-0" />
      {services.whatsapp.label}
      <span className="sr-only">(opens WhatsApp)</span>
    </a>
  );
}
