"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/socials", label: "Socials" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className="w-full flex items-center h-20 px-4 md:px-12 sticky top-0 bg-transparent border-none shadow-lg z-20">
      <div className="flex items-center gap-12 w-full justify-start md:justify-normal">
        {/* Logo/Profile Image */}
        <div className="mr-12 select-none">
          <button
            onClick={() => setShowProfile(true)}
            className="focus:outline-none"
            aria-label="Show profile picture"
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            <Image
              src="/profile-placeholder.jpg"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover shadow-md bg-gray-700 transition-transform duration-200 hover:scale-105"
              alt="Profile picture"
            />
          </button>
          {showProfile && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
              onClick={() => setShowProfile(false)}
              aria-modal="true"
              role="dialog"
            >
              <Image
                src="/profile-placeholder.jpg"
                width={256}
                height={256}
                className="w-64 h-64 rounded-full object-cover shadow-2xl border-4 border-gray-700"
                alt="Profile picture enlarged"
                onClick={e => e.stopPropagation()}
              />
            </div>
          )}
        </div>
        {/* Links */}
        <div className="flex gap-8 md:gap-12 text-lg md:text-xl">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`
                capitalize text-white text-base transition-colors duration-200
                pb-1 border-b-2 border-transparent relative
                focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400
                ${pathname === link.href
                  ? "font-bold border-white"
                  : "text-gray-300 hover:text-white"}
              `}
              style={{
                position: 'relative',
              }}
            >
              <span className="relative z-10">{link.label}</span>
              <span
                className="absolute left-0 bottom-0 w-full h-0.5 bg-white rounded transition-all duration-300 scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100"
                aria-hidden="true"
                style={{
                  transformOrigin: 'left',
                  ...(pathname === link.href ? { transform: 'scaleX(1)' } : {}),
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
