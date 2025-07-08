import type { Metadata, Viewport } from "next";
import { Navigation } from "../components";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://tarot-arcana.vercel.app'),
  title: "Tarot Arcana - Esoteric Tarot Readings",
  description: "An esoteric approach to tarot rooted in Western mystical traditions. Explore the Golden Dawn, Thelemic, and Rider-Waite systems for deep spiritual guidance.",
  applicationName: "Tarot Arcana",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Tarot Arcana",
  },
  openGraph: {
    title: "Tarot Arcana - Esoteric Tarot Readings",
    description: "An esoteric approach to tarot rooted in Western mystical traditions",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Tarot Arcana Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarot Arcana - Esoteric Tarot Readings",
    description: "An esoteric approach to tarot rooted in Western mystical traditions",
    images: ["/icon-512x512.png"],
  },
  icons: {
    icon: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1f2937",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
