import Link from "next/link";
import { site } from "../lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-identity">
          <div className="footer-brand" lang="en" translate="no">Kvisl</div>
          <p className="footer-motto">{site.motto}</p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <Link href="/about">About</Link>
          <Link href="/support">Support Us</Link>
          <Link href="/newsletter">Subscribe to Newsletter</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/terms">Terms of Use</Link>
          <Link href="/policies">Policies</Link>
          <Link href="/copyright">Copyright</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
        <p className="footer-copy">© {new Date().getFullYear()} <span lang="en" translate="no">Kvisl</span>. All rights reserved.</p>
      </div>
    </footer>
  );
}
