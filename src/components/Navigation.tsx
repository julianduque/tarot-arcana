"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", label: "Today", matches: (path: string) => path === "/" },
  {
    href: "/readings",
    label: "Readings",
    matches: (path: string) =>
      ["/readings", "/one-card", "/three-card", "/celtic-cross"].includes(path),
  },
  { href: "/notes", label: "Notes", matches: (path: string) => path === "/notes" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <Link className="site-brand" href="/">
        Tarot Arcana
      </Link>
      <div className="site-nav-actions">
        <div className="site-nav-links">
          {links.map((link) => {
            const active = link.matches(pathname);
            return (
              <Link
                key={link.label}
                href={link.href}
                className="site-nav-link"
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
