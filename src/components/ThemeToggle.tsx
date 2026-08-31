"use client";

type Theme = "light" | "dark";

const storageKey = "tarot-arcana:theme";

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    "content",
    theme === "light" ? "#f2efe8" : "#20232f",
  );
}

function SunIcon() {
  return (
    <svg className="theme-icon theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v2.2M12 19.8V22M4.93 4.93l1.56 1.56M17.51 17.51l1.56 1.56M2 12h2.2M19.8 12H22M4.93 19.07l1.56-1.56M17.51 6.49l1.56-1.56" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="theme-icon theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 15.1A8.4 8.4 0 0 1 8.9 4a8.4 8.4 0 1 0 11.1 11.1Z" />
    </svg>
  );
}

export function ThemeToggle() {
  function toggleTheme() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(storageKey, next);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark mode"
      title="Toggle light and dark mode"
    >
      <SunIcon />
      <MoonIcon />
    </button>
  );
}
