import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MinimalParticles from "./components/MinimalParticles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Minidu's Homepage",
  description: "Made by Minidu perera",
};

export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
          <MinimalParticles />
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
