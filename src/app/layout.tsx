import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import type { Metadata, Viewport } from "next";
import { Navigation } from "../components";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Tarot Arcana",
    template: "%s · Tarot Arcana",
  },
  description: "A quiet tarot reading and reflection practice.",
  applicationName: "Tarot Arcana",
  manifest: "/manifest.json?v=d85b872a5f2e",
  icons: {
    icon: [
      { url: "/icon.svg?v=d85b872a5f2e", type: "image/svg+xml" },
      { url: "/icon-192x192.png?v=d85b872a5f2e", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png?v=d85b872a5f2e", sizes: "512x512", type: "image/png" },
    ],
    shortcut: [{ url: "/icon.svg?v=d85b872a5f2e", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png?v=d85b872a5f2e", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#20232f",
  colorScheme: "light dark",
};

const themeInitScript = `(function(){try{var saved=localStorage.getItem("tarot-arcana:theme");var theme=saved==="light"||saved==="dark"?saved:window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute("content",theme==="light"?"#f2efe8":"#20232f");}catch(_){}})();`;

const directionContract = `<!--
THESIS: Tarot as a quiet daily instrument; refuses the ornate occult landing-page grid.
OWN-WORLD: Midnight ink or dawn paper, warm monospace, hairline rules, violet focus, unframed Rider-Waite art.
STORY: Draw today, then deliberately open a note, source text, or a separate spread.
FIRST VIEWPORT: One centered daily card with no journal or navigation content competing beside it.
FORM: Midnight reader's notebook, seventh grounded direction, seed cc73cb12.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <template aria-hidden="true" dangerouslySetInnerHTML={{ __html: directionContract }} />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
