import { listPublished } from "../../lib/articles";
import { site, siteUrl } from "../../lib/site";

export const dynamic = "force-dynamic";

function xml(value: string): string {
  return value.replace(/[<>&'\"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[char] || char);
}

export async function GET() {
  const base = siteUrl();
  const articles = await listPublished({ limit: 50 });
  const items = articles.map((article) => `<item><title>${xml(article.title)}</title><link>${base}/articles/${encodeURIComponent(article.slug)}</link><guid>${base}/articles/${encodeURIComponent(article.slug)}</guid><description>${xml(article.dek)}</description>${article.publishedAt ? `<pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>` : ""}</item>`).join("");
  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${site.name}</title><link>${base}</link><description>${xml(site.motto)}</description><language>en-US</language>${items}</channel></rss>`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=300" } });
}
