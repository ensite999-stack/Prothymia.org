"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

export function SiteMenu() {
  const [open, setOpen] = useState(false);
  const shell = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(event: MouseEvent) {
      if (shell.current && !shell.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="menu-shell" ref={shell}>
      <button
        className="menu-button"
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span /><span /><span />
      </button>
      {open ? (
        <div className="menu-panel">
          <nav aria-label="Site menu">
            <Link href="/essays" onClick={() => setOpen(false)}>Essays</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About Prothymia</Link>
            <Link href="/newsletter" onClick={() => setOpen(false)}>Subscribe</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact Prothymia</Link>
            <Link href="/support" onClick={() => setOpen(false)}>Support</Link>
            <ThemeToggle />
          </nav>
        </div>
      ) : null}
    </div>
  );
}
