import { FiArrowUp } from "react-icons/fi";
import { textLink } from "@/components/ui/styles";
import { profile } from "@/content/profile";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative overflow-clip border-t border-white/6">
      <div className="shell pt-20 pb-10">
        {/* The wordmark is sized to the container by the SVG, at any width. */}
        <svg viewBox="0 0 1000 118" aria-hidden className="group w-full select-none">
          <defs>
            <linearGradient id="wordmark-fill" x1="0" x2="1">
              <stop offset="0" stopColor="#67e8f9" />
              <stop offset="1" stopColor="#a5b4fc" />
            </linearGradient>
          </defs>
          {/* Stroke painted under a void fill hides the font's overlapping contours. */}
          <text
            x="500"
            y="100"
            textAnchor="middle"
            textLength="990"
            lengthAdjust="spacingAndGlyphs"
            className="fill-void stroke-signal/40 text-[118px] font-extrabold uppercase [font-variation-settings:'wdth'_125] [paint-order:stroke_fill] [stroke-width:2.5]"
          >
            {profile.name}
          </text>
          <text
            x="500"
            y="100"
            textAnchor="middle"
            textLength="990"
            lengthAdjust="spacingAndGlyphs"
            className="fill-[url(#wordmark-fill)] text-[118px] font-extrabold uppercase opacity-0 transition-opacity duration-700 [font-variation-settings:'wdth'_125] group-hover:opacity-90"
          >
            {profile.name}
          </text>
        </svg>
        <div className="mt-12 flex flex-col gap-4 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name} · {profile.home.name}, Sri Lanka
          </p>
          <p>Built with Next.js, WebGL and canvas</p>
          <a href="#top" className={textLink}>
            Back to top
            <FiArrowUp aria-hidden className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
