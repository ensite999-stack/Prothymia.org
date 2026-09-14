import type { MetadataRoute } from "next";
import { listPublished } from "../lib/articles";
import { siteUrl, staticPages } from "../lib/site";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const articles = await listPublished({ limit: 100 });
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/essays`, lastModified: new Date() },
    { url: `${base}/search`, lastModified: new Date() },
    { url: `${base}/newsletter`, lastModified: new Date() },
    ...Object.keys(staticPages).map((page) => ({ url: `${base}/${page}`, lastModified: new Date() })),
    ...articles.map((article) => ({ url: `${base}/articles/${article.slug}`, lastModified: new Date(article.updatedAt) })),
  ];
}
