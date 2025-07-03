import type { Metadata } from "next";
import { Navigation } from "../components";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://tarot-arcana.vercel.app'),
  title: "Tarot Arcana - Esoteric Tarot Readings",
  description: "An esoteric approach to tarot rooted in Western mystical traditions. Explore the Golden Dawn, Thelemic, and Rider-Waite systems for deep spiritual guidance.",
  openGraph: {
    title: "Tarot Arcana - Esoteric Tarot Readings",
    description: "An esoteric approach to tarot rooted in Western mystical traditions",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Tarot Arcana Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarot Arcana - Esoteric Tarot Readings",
    description: "An esoteric approach to tarot rooted in Western mystical traditions",
    images: ["/logo.png"],
  },
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
