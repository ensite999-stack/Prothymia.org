"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SiteMenu } from "./site-menu";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const previousY = useRef(0);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    previousY.current = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      const delta = y - previousY.current;

      if (y <= 24) {
        setScrolled(false);
        setHidden(false);
      } else {
        setScrolled(true);
        if (delta > 7) setHidden(true);
        if (delta < -5) setHidden(false);
      }

      previousY.current = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onBrandClick() {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (window.history.length > 1) router.back();
    else router.push("/");
  }

  return (
    <header className="site-header" data-scrolled={scrolled} data-hidden={hidden}>
      <button
        className="brand-link brand-button"
        type="button"
        lang="en"
        translate="no"
        aria-label={pathname === "/" ? "Prothymia — back to top" : "Prothymia — go back"}
        onClick={onBrandClick}
      >
        Prothymia
      </button>
      <div className="header-actions">
        <Link className="search-link" href="/search">Search</Link>
        <SiteMenu />
      </div>
    </header>
  );
}
