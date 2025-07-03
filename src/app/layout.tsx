import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tarot Arcana",
  description: "A jungian and esoteric approach to tarot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
