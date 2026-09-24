import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
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
          className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(60rem_40rem_at_15%_-10%,rgba(99,102,241,0.12),transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(rgba(148,163,184,0.09)_1px,transparent_1px)] mask-[linear-gradient(to_bottom,black,transparent_85%)] bg-size-[24px_24px]"
        />
        <div className="relative z-10 flex min-h-dvh flex-col">{children}</div>
      </body>
    </html>
  );
}
