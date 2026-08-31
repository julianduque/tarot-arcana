import Link from "next/link";
import { SpreadGlyph } from "../../components/SpreadGlyph";

const readings = [
  {
    href: "/one-card",
    count: 1 as const,
    title: "One card",
    description: "A single point of focus.",
  },
  {
    href: "/three-card",
    count: 3 as const,
    title: "Past, present, future",
    description: "See the movement around a question.",
  },
  {
    href: "/celtic-cross",
    count: 10 as const,
    title: "Celtic Cross",
    description: "Waite’s full pattern with an optional significator.",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

export default function ReadingsPage() {
  return (
    <main className="app-shell readings-page">
      <header className="readings-heading">
        <p>Choose a spread</p>
        <h1>Read only as deeply as the question needs.</h1>
      </header>

      <section className="readings-grid" aria-label="Tarot spreads">
        {readings.map((reading) => (
          <Link key={reading.href} className="reading-choice" href={reading.href}>
            <span className="reading-count">{String(reading.count).padStart(2, "0")}</span>
            <SpreadGlyph count={reading.count} />
            <span>
              <strong>{reading.title}</strong>
              <small>{reading.description}</small>
            </span>
            <ArrowIcon />
          </Link>
        ))}
      </section>

      <section className="omarchy-install" aria-labelledby="omarchy-heading">
        <div>
          <p>Desktop companion</p>
          <h2 id="omarchy-heading">Omarchy Tarot</h2>
          <span>Daily card and full readings in the Omarchy bar.</span>
        </div>
        <div>
          <code>omarchy plugin add https://github.com/julianduque/omarchy-tarot.git --enable</code>
          <a
            href="https://github.com/julianduque/omarchy-tarot#install"
            target="_blank"
            rel="noreferrer"
          >
            Open installation guide
            <ArrowIcon />
          </a>
        </div>
      </section>
    </main>
  );
}
