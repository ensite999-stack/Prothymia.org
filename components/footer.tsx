import Link from "next/link";
import { site } from "../lib/site";
import { FooterNewsletter } from "./footer-newsletter";

export function Footer() {
  return (
    <footer className="site-footer">
      <p className="footer-motto">{site.motto}</p>
      <FooterNewsletter />
      <nav className="footer-links" aria-label="Footer">
        <Link href="/about">About Prothymia</Link>
        <Link href="/contact">Contact Prothymia</Link>
        <Link href="/support">Support</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/copyright">Copyright</Link>
        <Link href="/feed.xml">RSS</Link>
      </nav>
      <div className="footer-social">
        <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.7 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.7 1.8-1.7h1.9V2.5c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.3H7V13h2.9v9h3.8Z" /></svg>
        </a>
        <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.8" d="M7.5 2.8h9A4.7 4.7 0 0 1 21.2 7.5v9a4.7 4.7 0 0 1-4.7 4.7h-9a4.7 4.7 0 0 1-4.7-4.7v-9a4.7 4.7 0 0 1 4.7-4.7Z" /><circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.4" cy="6.7" r="1" fill="currentColor" /></svg>
        </a>
      </div>
      <p className="footer-copy">©{new Date().getFullYear()} <span lang="en" translate="no">Prothymia</span> All Rights Reserved.</p>
    </footer>
  );
}
