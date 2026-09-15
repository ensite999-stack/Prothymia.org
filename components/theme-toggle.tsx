"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(current);
  }, []);

  function apply(next: Theme) {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("prothymia-theme", next);
  }

  return (
    <div className="theme-switch" role="group" aria-label="Appearance">
      <div className="theme-options">
        <button
          type="button"
          data-active={theme === "light"}
          aria-pressed={theme === "light"}
          onClick={() => apply("light")}
        >
          Light
        </button>
        <button
          type="button"
          data-active={theme === "dark"}
          aria-pressed={theme === "dark"}
          onClick={() => apply("dark")}
        >
          Dark
        </button>
      </div>
    </div>
  );
}
