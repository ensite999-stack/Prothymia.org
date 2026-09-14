import { notFound } from "next/navigation";
import { articleCategoryLabel, publishedArticle } from "../../../lib/articles";
import { site } from "../../../lib/site";

export const dynamic = "force-dynamic";

function dateLabel(value: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await publishedArticle(slug);
  if (!article) notFound();
  return (
    <article>
      <header className="article-header narrow">
        <p className="eyebrow">{articleCategoryLabel(article.topic)}</p>
        <h1>{article.title}</h1>
        {article.dek ? <p className="article-dek">{article.dek}</p> : null}
        <div className="article-meta" style={{ marginTop: "1.4rem" }}>
          <span>{site.author}</span>
          {article.publishedAt ? <><span>·</span><time dateTime={article.publishedAt}>{dateLabel(article.publishedAt)}</time></> : null}
        </div>
      </header>
      {article.coverUrl ? (
        <figure className="cover">
          <img src={article.coverUrl} alt={article.coverAlt} />
          {article.coverCredit ? <figcaption>{article.coverCredit}</figcaption> : null}
        </figure>
      ) : null}
      <div className="narrow">
        <div className="prose" dangerouslySetInnerHTML={{ __html: article.bodyHtml }} />
        {article.sources ? <div className="sources"><strong>Sources</strong><br />{article.sources}</div> : null}
        <footer className="article-end">
          <p className="motto">{site.motto}</p>
          <p>{site.author}</p>
        </footer>
      </div>
    </article>
  );
}
