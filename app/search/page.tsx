import { ArticleList } from "../../components/article-list";
import { listPublished, listTopics } from "../../lib/articles";

export const dynamic = "force-dynamic";

function one(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const query = one(params.q).trim();
  const topic = one(params.topic).trim();
  const topics = await listTopics();
  const articles = query || topic ? await listPublished({ limit: 100, query, topic }) : [];
  return (
    <section className="section">
      <div className="shell">
        <p className="eyebrow">Search</p>
        <h1 className="page-title">Find an essay.</h1>
        <form className="search-form" method="get">
          <input name="q" defaultValue={query} aria-label="Search essays" placeholder="Search words or phrases" />
          <select name="topic" defaultValue={topic} aria-label="Topic">
            <option value="">All topics</option>
            {topics.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <button className="button" type="submit">Search</button>
        </form>
        {query || topic ? <ArticleList articles={articles} /> : <p className="notice">Enter a search term or choose a topic.</p>}
      </div>
    </section>
  );
}
