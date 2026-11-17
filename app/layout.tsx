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

// Runs before first paint: repeat visitors in this session never see the cover flash, and first-time
// visitors get the scroll lock before React hydrates. Static string, no user input.
const introFlag = `try{var d=document.documentElement;d.classList.add(sessionStorage.getItem("mhyco:intro-seen")==="1"?"intro-seen":"is-intro")}catch(e){document.documentElement.classList.add("is-intro")}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // the head script adds classes to <html> before hydration, so React must not treat that as a mismatch
    <html lang="en" className={`${anybody.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* inline so it runs before paint; the content is the constant above, never user data */}
        <script id="intro-flag" dangerouslySetInnerHTML={{ __html: introFlag }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
