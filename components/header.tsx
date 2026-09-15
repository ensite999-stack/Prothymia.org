"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SiteMenu } from "./site-menu";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const lastY = useRef(0);
  const movement = useRef(0);
  const frame = useRef<number | null>(null);
  const hiddenRef = useRef(false);
  const scrolledRef = useRef(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const y = Math.max(0, window.scrollY);
    lastY.current = y;
    movement.current = 0;
    scrolledRef.current = y > 24;
    hiddenRef.current = false;
    setScrolled(scrolledRef.current);
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    lastY.current = Math.max(0, window.scrollY);

    function showHeader() {
      if (!hiddenRef.current) return;
      hiddenRef.current = false;
      setHidden(false);
    }

    function hideHeader() {
      if (hiddenRef.current) return;
      hiddenRef.current = true;
      setHidden(true);
    }

    function updateHeader() {
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY.current;
      const nextScrolled = y > 24;

      if (nextScrolled !== scrolledRef.current) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }

      if (y <= 32) {
        movement.current = 0;
        showHeader();
      } else if (Math.abs(delta) > 0.5) {
        const sameDirection = movement.current === 0 || Math.sign(movement.current) === Math.sign(delta);
        movement.current = sameDirection ? movement.current + delta : delta;

        if (movement.current >= 8 && y > 84) {
          hideHeader();
          movement.current = 0;
        } else if (movement.current <= -5) {
          showHeader();
          movement.current = 0;
        }
      }

      lastY.current = y;
      frame.current = null;
    }

    function onScroll() {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(updateHeader);
    }

    function resetScrollBaseline() {
      lastY.current = Math.max(0, window.scrollY);
      movement.current = 0;
    }

    function onVisibilityChange() {
      if (!document.hidden) resetScrollBaseline();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pageshow", resetScrollBaseline);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pageshow", resetScrollBaseline);
      document.removeEventListener("visibilitychange", onVisibilityChange);
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
