"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/content/profile";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: profile.substackUrl, label: "Substack", external: true },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="flex h-14 items-center justify-center px-2 my-4">
      <nav aria-label="Main">
        <ul className="flex gap-1 rounded-full border border-white/15 p-0.5 shadow-sm backdrop-blur-md">
          {links.map((link) => {
            const external = "external" in link;
            const active = !external && pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-full border px-3 py-1.5 text-base font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none ${
                    active
                      ? "border-white/15 bg-white/10 text-white backdrop-blur-md"
                      : "border-transparent text-gray-200 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                  {external && <span className="sr-only"> (opens in a new tab)</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
