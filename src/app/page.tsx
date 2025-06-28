"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4">
        <div className="reading-container">
          <header className="text-center mb-12">
            <h1 className="text-7xl font-serif mb-6 text-shadow-gold text-gold">
              ✦ Tarot Arcana ✦
            </h1>
            <p className="text-2xl text-antique-gold mb-12 max-w-2xl mx-auto">
              Choose your journey through the cards of destiny
            </p>
          </header>

          <section className="max-w-5xl mx-auto">
            <div className="reading-cards-container">
              {/* Three Card Reading */}
              <Link href="/three-card" className="reading-card">
                <div className="reading-card-content">
                  <div className="reading-card-icon">🔮</div>
                  <h2 className="reading-card-title">Three Card Reading</h2>
                  <p className="reading-card-description">
                    Past, Present, and Future revealed in three sacred cards
                  </p>
                </div>
              </Link>

              {/* Celtic Cross Reading */}
              <Link href="/celtic-cross" className="reading-card">
                <div className="reading-card-content">
                  <div className="reading-card-icon">✨</div>
                  <h2 className="reading-card-title">Celtic Cross</h2>
                  <p className="reading-card-description">
                    The ancient ten-card spread revealing life&apos;s deeper mysteries
                  </p>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
