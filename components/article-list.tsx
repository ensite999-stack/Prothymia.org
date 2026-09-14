import Link from "next/link";
import { articleCategoryLabel, type Article } from "../lib/articles";

function dateLabel(value: string | null): string {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}

export function ArticleList({ articles }: { articles: Article[] }) {
  if (!articles.length) return <p className="notice">No essays are published here yet.</p>;
  return (
    <div className="article-grid">
      {articles.map((article) => (
        <article className="article-card" key={article.id}>
          <div className="article-meta">
            <span>{articleCategoryLabel(article.topic)}</span>
            {article.publishedAt ? <><span>·</span><time dateTime={article.publishedAt}>{dateLabel(article.publishedAt)}</time></> : null}
          </div>
          <Link href={`/articles/${article.slug}`}>
            <h2>{article.title}</h2>
          </Link>
          {article.dek ? <p>{article.dek}</p> : null}
        </article>
      ))}
    </div>
  );
}
