import type { Metadata, Viewport } from "next";
import { Geist_Mono, Mona_Sans } from "next/font/google";
import { CursorGlow } from "@/components/fx/cursor-glow";
import { SiteNav } from "@/components/site-nav";
import { profile } from "@/content/profile";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

// Mona Sans is variable in weight and width; the hero animates both axes.
const monaSans = Mona_Sans({ variable: "--font-mona", subsets: ["latin"], axes: ["wdth"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: { default: profile.seo.title, template: `%s · ${profile.name}` },
  description: profile.seo.description,
  authors: [{ name: profile.name, url: profile.website }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title: profile.seo.title,
    description: profile.seo.description,
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
  themeColor: "#04050a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${monaSans.variable} ${geistMono.variable}`}>
      <head>
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;translate:none!important;filter:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only rounded-full bg-ink px-4 py-2 text-sm font-semibold text-void focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80]"
        >
          Skip to content
        </a>
        <div aria-hidden className="grain" />
        <CursorGlow />
        <SiteNav />
        <div className="relative z-10 flex min-h-dvh flex-col">{children}</div>
      </body>
    </html>
  );
}
