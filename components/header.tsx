"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SiteMenu } from "./site-menu";

type ScrollDirection = "up" | "down" | null;

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const lastY = useRef(0);
  const directionAnchorY = useRef(0);
  const direction = useRef<ScrollDirection>(null);
  const frame = useRef<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const y = Math.max(0, window.scrollY);
    lastY.current = y;
    directionAnchorY.current = y;
    direction.current = null;
    setScrolled(y > 24);
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    lastY.current = Math.max(0, window.scrollY);
    directionAnchorY.current = lastY.current;

    function updateHeader() {
      const y = Math.max(0, window.scrollY);
      const previous = lastY.current;
      const delta = y - previous;

      setScrolled(y > 24);

      if (y <= 32) {
        setHidden(false);
        direction.current = null;
        directionAnchorY.current = y;
      } else if (Math.abs(delta) > 1) {
        const nextDirection: ScrollDirection = delta > 0 ? "down" : "up";

        if (nextDirection !== direction.current) {
          direction.current = nextDirection;
          directionAnchorY.current = y;
        }

        const travel = Math.abs(y - directionAnchorY.current);
        if (nextDirection === "down" && y > 120 && travel >= 32) setHidden(true);
        if (nextDirection === "up" && travel >= 18) setHidden(false);
      }

      lastY.current = y;
      frame.current = null;
    }

    function onScroll() {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(updateHeader);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
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
        <div className="header-menu-slot"><SiteMenu /></div>
      </div>
    </header>
  );
}
