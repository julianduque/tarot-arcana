"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Navigation() {
  const pathname = usePathname();
  const [isSpreadsOpen, setIsSpreadsOpen] = useState(false);

  const spreadItems = [
    { href: "/one-card", label: "One Card Reading", description: "Simple wisdom for your path" },
    { href: "/three-card", label: "Three Card Reading", description: "Past, Present, Future" },
    { href: "/celtic-cross", label: "Celtic Cross", description: "Ancient 10-card spread" },
    // Future spreads can be added here
    // { href: "/horseshoe", label: "Horseshoe Spread", description: "7-card relationship spread" },
  ];

  const isSpreadActive = spreadItems.some(item => pathname === item.href);

  return (
    <nav className="navigation-container">
      <div className="navigation-content">
        {/* Logo/Brand */}
        <Link href="/" className="brand-link">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/logo.png" 
            alt="Tarot Arcana" 
            className="brand-logo"
          />
          <span className="brand-text">Tarot Arcana</span>
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link
            href="/"
            className={`nav-link ${pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>

          {/* Spreads Dropdown */}
          <div className="nav-dropdown">
            <button
              className={`nav-link dropdown-toggle ${isSpreadActive ? "active" : ""}`}
              onClick={() => setIsSpreadsOpen(!isSpreadsOpen)}
              onBlur={() => setTimeout(() => setIsSpreadsOpen(false), 150)}
            >
              Readings
              <span className={`dropdown-arrow ${isSpreadsOpen ? "open" : ""}`}>▼</span>
            </button>

            {isSpreadsOpen && (
              <div className="dropdown-menu">
                {spreadItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`dropdown-item ${pathname === item.href ? "active" : ""}`}
                    onClick={() => setIsSpreadsOpen(false)}
                  >
                    <div className="dropdown-item-content">
                      <span className="dropdown-item-title">{item.label}</span>
                      <span className="dropdown-item-description">{item.description}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-button">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </nav>
  );
}