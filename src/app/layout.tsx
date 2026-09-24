import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ParticleField } from "@/components/particle-field";
import { SiteHeader } from "@/components/site-header";
import { profile } from "@/content/profile";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: { default: profile.name, template: `%s · ${profile.name}` },
  description: profile.headline,
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: profile.name,
    description: profile.headline,
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
        <ParticleField />
        <div className="relative z-10 flex min-h-dvh flex-col">
          <SiteHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
