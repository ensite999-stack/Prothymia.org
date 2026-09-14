import Link from "next/link";
import { SiteMenu } from "./site-menu";

export function Header() {
  return (
    <header className="site-header">
      <a className="brand-link" href="#top" lang="en" translate="no" aria-label="Prothymia — back to top">
        Prothymia
      </a>
      <div className="header-actions">
        <SiteMenu />
        <Link className="search-link" href="/search">Search</Link>
      </div>
    </header>
  );
}
