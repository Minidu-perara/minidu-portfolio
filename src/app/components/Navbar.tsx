"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "https://minidu.substack.com/", label: "Substack", external: true },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="w-full flex items-center h-14 px-2 md:px-0 my-4 justify-center">
      <div className="flex bg-transparent border border-white/15 rounded-full p-0.5 backdrop-blur-md shadow-sm gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className={`
              capitalize px-3 py-1.5 rounded-full text-base font-medium transition-all duration-150 border
              ${pathname === link.href
                ? "bg-white/10 text-white border-white/15 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                : "bg-transparent text-gray-200 border-transparent hover:bg-white/5 hover:text-white"}
            `}
            style={pathname === link.href ? { WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)' } : {}}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
