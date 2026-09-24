"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiDownload, FiMail, FiMenu, FiX } from "react-icons/fi";
import { SocialLinks } from "@/components/social-links";
import { iconButton } from "@/components/ui/styles";
import { navItems, profile } from "@/content/profile";

/** A section becomes current once its top passes this fraction of the viewport. */
const ACTIVATION_LINE = 0.35;

const monogram =
  "grid size-9 place-items-center rounded-full bg-white/[0.06] font-mono text-[0.7rem] font-semibold tracking-wider text-ink ring-1 ring-white/12 transition hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal";

/**
 * Fixed site navigation: a floating pill with a sliding active marker on
 * wider screens, a compact bar with a full-screen menu on phones, and a thin
 * scroll-progress line across the top.
 */
export function SiteNav() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Scroll progress, scrolled state and the current section.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      setScrolled(y > 24);
      let current: string | null = null;
      if (max > 0 && y >= max - 2) {
        current = navItems.at(-1)?.id ?? null;
      } else {
        const line = window.innerHeight * ACTIVATION_LINE;
        for (const item of navItems) {
          const top = document.getElementById(item.id)?.getBoundingClientRect().top;
          if (top !== undefined && top <= line) current = item.id;
        }
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // Slide the marker under the current link.
  useEffect(() => {
    const list = listRef.current;
    const marker = markerRef.current;
    if (!list || !marker) return;
    const place = () => {
      const link = active ? list.querySelector<HTMLElement>(`[data-nav="${active}"]`) : null;
      marker.style.opacity = link ? "1" : "0";
      if (!link) return;
      marker.style.width = `${link.offsetWidth}px`;
      marker.style.transform = `translateX(${link.offsetLeft}px)`;
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (menuOpen && !dialog.open) dialog.showModal();
    if (!menuOpen && dialog.open) dialog.close();
  }, [menuOpen]);

  const activeLabel = navItems.find((item) => item.id === active)?.label;

  return (
    <>
      <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-px">
        <div ref={progressRef} className="h-full origin-left bg-linear-to-r from-pulse via-signal to-signal-deep" style={{ transform: "scaleX(0)" }} />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)]">
        <nav aria-label="Main" className="shell flex justify-center py-3 md:py-4">
          {/* Wider screens: floating pill */}
          <div className="hidden items-center gap-1 rounded-full bg-void/60 p-1.5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)] ring-1 ring-white/10 backdrop-blur-xl md:flex">
            <Link href="/#top" aria-label="Back to top" className={monogram}>
              MP
            </Link>
            <div className="relative">
              <span
                ref={markerRef}
                aria-hidden
                className="absolute inset-y-0 left-0 rounded-full bg-white/[0.08] opacity-0 ring-1 ring-white/10 transition-[transform,width,opacity] duration-500 ease-out-expo"
              />
              <ul ref={listRef} className="relative flex items-center">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`/#${item.id}`}
                      data-nav={item.id}
                      aria-current={active === item.id ? "location" : undefined}
                      className={`block rounded-full px-3.5 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal ${
                        active === item.id ? "text-ink" : "text-ink-2 hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={profile.resume.href}
              download={profile.resume.downloadName}
              className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-void transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            >
              <FiDownload aria-hidden className="size-3.5" />
              CV
            </a>
          </div>

          {/* Phones: compact bar */}
          <div
            className={`flex w-full items-center justify-between rounded-full p-1.5 transition-[background-color,box-shadow] duration-300 md:hidden ${
              scrolled ? "bg-void/70 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)] ring-1 ring-white/10 backdrop-blur-xl" : ""
            }`}
          >
            <Link href="/#top" aria-label="Back to top" className={monogram}>
              MP
            </Link>
            <span className="label-mono text-[0.62rem] text-ink-3">{activeLabel ?? profile.name}</span>
            <button type="button" aria-haspopup="dialog" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} className={iconButton}>
              <FiMenu aria-hidden className="size-[18px]" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </nav>
      </header>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        onClose={() => setMenuOpen(false)}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-void/95 p-0 text-ink backdrop-blur-xl backdrop:bg-transparent open:flex open:flex-col"
      >
        <div className="shell flex items-center justify-between pt-[calc(env(safe-area-inset-top,0px)+0.75rem)] pb-3">
          <span className={monogram}>MP</span>
          <button type="button" onClick={() => setMenuOpen(false)} className={iconButton}>
            <FiX aria-hidden className="size-[18px]" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <ul className="shell flex-1 pt-6">
          {navItems.map((item, i) => (
            <li key={item.id} className="motion-safe:animate-fade-up" style={{ animationDelay: `${60 + i * 55}ms` }}>
              <a
                href={`/#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline justify-between border-b border-white/8 py-4 text-[2.1rem] leading-none font-bold tracking-tight [font-variation-settings:'wdth'_110]"
              >
                {item.label}
                <span className="font-mono text-xs font-normal text-ink-3">~/{item.id}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="shell space-y-5 pt-8 pb-[calc(env(safe-area-inset-bottom,0px)+2rem)]">
          <p className="flex items-center gap-2 text-sm break-all text-ink-2">
            <FiMail aria-hidden className="size-4 shrink-0 text-signal" />
            {profile.email}
          </p>
          <SocialLinks />
        </div>
      </dialog>
    </>
  );
}
