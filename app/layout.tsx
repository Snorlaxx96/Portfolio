import type { Metadata, Viewport } from "next";
import { Anybody, JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const anybody = Anybody({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.wordmark}: ${site.name}, ${site.role}`,
  description: site.lede,
  openGraph: { title: site.name, description: site.lede, type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#0E0F0C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anybody.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
