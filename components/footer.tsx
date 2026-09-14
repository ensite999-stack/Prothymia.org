import Link from "next/link";
import { site } from "../lib/site";
import { FooterNewsletter } from "./footer-newsletter";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand" lang="en" translate="no">Prothymia</div>
      <p className="footer-motto">{site.motto}</p>
      <FooterNewsletter />
      <nav className="footer-links" aria-label="Footer" lang="zh-CN">
        <Link href="/about">关于我们</Link>
        <Link href="/privacy">隐私政策</Link>
        <Link href="/copyright">版权声明</Link>
        <Link href="/contact">联系我们</Link>
        <Link href="/support">支持与捐赠</Link>
      </nav>
      <p className="footer-copy">©{new Date().getFullYear()} <span lang="en" translate="no">Prothymia</span> All Rights Reserved.</p>
    </footer>
  );
}
