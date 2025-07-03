import type { Metadata } from "next";
import { Navigation } from "../components";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tarot Arcana",
  description: "An esoteric approach to tarot rooted in Western mystical traditions",
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
