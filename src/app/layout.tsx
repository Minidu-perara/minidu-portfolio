import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ParticleField } from "@/components/particle-field";
import { profile } from "@/content/profile";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: { default: `${profile.name} · ${profile.role}`, template: `%s · ${profile.name}` },
  description: profile.pitch,
  authors: [{ name: profile.name, url: profile.website }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title: `${profile.name} · ${profile.role}`,
    description: profile.pitch,
    images: [
      {
        url: profile.photo.src.src,
        width: profile.photo.src.width,
        height: profile.photo.src.height,
        alt: profile.photo.alt,
      },
    ],
  },
  twitter: { card: "summary" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;translate:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only rounded bg-white px-3 py-2 text-black focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          Skip to content
        </a>
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(60rem_40rem_at_15%_-10%,rgba(99,102,241,0.14),transparent_70%),radial-gradient(50rem_35rem_at_110%_110%,rgba(236,72,153,0.08),transparent_70%)]"
        />
        <ParticleField />
        <div className="relative z-10 flex min-h-dvh flex-col">{children}</div>
      </body>
    </html>
  );
}
