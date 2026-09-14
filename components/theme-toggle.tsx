"use client";

import { useEffect, useState } from "react";

type ReadingTheme = "dark" | "reading";

export function ThemeToggle() {
  const [theme, setTheme] = useState<ReadingTheme>("dark");

  useEffect(() => {
    const current = document.documentElement.dataset.theme === "reading" ? "reading" : "dark";
    setTheme(current);
  }, []);

  function apply(next: ReadingTheme) {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("prothymia-theme", next);
  }

  return (
    <div className="theme-switch" role="group" aria-label="Reading appearance">
      <span>Reading appearance</span>
      <div className="theme-options">
        <button type="button" data-active={theme === "reading"} onClick={() => apply("reading")}>Eye Comfort</button>
        <button type="button" data-active={theme === "dark"} onClick={() => apply("dark")}>Dark</button>
      </div>
    </div>
  );
}
