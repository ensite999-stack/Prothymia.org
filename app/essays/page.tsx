import { ArticleList } from "../../components/article-list";
import { listPublished } from "../../lib/articles";

export const dynamic = "force-dynamic";

export default async function EssaysPage() {
  const articles = await listPublished({ limit: 100 });
  return (
    <section className="section">
      <div className="shell">
        <p className="eyebrow">Essays</p>
        <h1 className="page-title">Writing worth pausing to read.</h1>
        <p className="standfirst">Every article belongs to Essay, with a topic that gives it a more precise place.</p>
        <div style={{ marginTop: "3rem" }}><ArticleList articles={articles} /></div>
      </div>
    </section>
  );
}
