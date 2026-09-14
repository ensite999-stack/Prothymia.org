"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

export function SiteMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const shell = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      if (shell.current && !shell.current.contains(event.target as Node)) setOpen(false);
    }

    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, []);

  return (
    <div className="menu-shell" ref={shell}>
      <button
        className="menu-button"
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="site-menu-panel"
        data-open={open}
        onClick={() => setOpen((value) => !value)}
      >
        <em className="menu-glyph" aria-hidden="true"><i /><i /><i /></em>
        <b className="menu-word">Menu</b>
      </button>
      <div
        className="menu-panel"
        id="site-menu-panel"
        data-open={open}
        aria-hidden={!open}
      >
        <nav aria-label="Site menu">
          <Link href="/essays" onClick={() => setOpen(false)}>Essays</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/newsletter" onClick={() => setOpen(false)}>Subscribe</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link href="/support" onClick={() => setOpen(false)}>Support Us</Link>
          <ThemeToggle />
        </nav>
      </div>
    </div>
  );
}
