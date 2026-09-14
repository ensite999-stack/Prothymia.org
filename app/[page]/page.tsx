import { notFound } from "next/navigation";
import { site, staticPages } from "../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(staticPages).map((page) => ({ page }));
}

export default async function StaticPageRoute({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const content = staticPages[page];
  if (!content) notFound();
  return (
    <section className="section">
      <div className="narrow">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 className="page-title">{content.title}</h1>
        <div className="static-copy">
          {content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        {page === "contact" ? <p><a href={`mailto:${site.email}`} style={{ color: "var(--brand)" }}>{site.email}</a></p> : null}
        {page === "support" ? (
          <div className="donation-grid">
            <div className="donation-box"><strong>Bitcoin (BTC)</strong><code>{site.bitcoin}</code></div>
            <div className="donation-box"><strong>USDC</strong><code>{site.usdc}</code><p style={{ color: "var(--muted)", fontSize: ".82rem" }}>Base or Arbitrum One is recommended. Sending on the wrong network may permanently lose funds.</p></div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
