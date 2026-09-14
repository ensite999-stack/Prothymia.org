import Link from "next/link";
import { ArticleList } from "../components/article-list";
import { listPublished } from "../lib/articles";
import { site } from "../lib/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const articles = await listPublished({ limit: 10 });
  return (
    <>
      <section className="home-hero">
        <div className="shell">
          <p className="eyebrow">Independent essays</p>
          <h1 className="display-title">Attention is a way of inhabiting the world.</h1>
          <p className="standfirst">Prothymia publishes essays across history, science, politics, countries, culture, and the life of ideas.</p>
          <p className="motto">{site.motto}</p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", marginBottom: "1.5rem" }}>
            <p className="eyebrow">Latest essays</p>
            <Link href="/essays" style={{ color: "var(--brand)", fontSize: ".84rem" }}>View all</Link>
          </div>
          <ArticleList articles={articles} />
        </div>
      </section>
    </>
  );
}
