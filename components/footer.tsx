import Link from "next/link";
import { site } from "../lib/site";
import { FooterNewsletter } from "./footer-newsletter";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand" lang="en" translate="no">Prothymia</div>
      <p className="footer-motto">{site.motto}</p>
      <FooterNewsletter />
      <nav className="footer-links" aria-label="Footer">
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/support">Support</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/copyright">Copyright</Link>
        <Link href="/feed.xml">RSS</Link>
      </nav>
      <p className="footer-copy" style={{ marginTop: "-.65rem" }}>©{new Date().getFullYear()} <span lang="en" translate="no">Prothymia</span> All Rights Reserved.</p>
    </footer>
  );
}
