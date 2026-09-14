import { database, requireDatabase } from "./db";
import type { ArticleInput } from "./validation";

export type Article = {
  id: number;
  slug: string;
  title: string;
  dek: string;
  bodyHtml: string;
  topic: string;
  status: "draft" | "published" | "deleted";
  publishedAt: string | null;
  featured: boolean;
  coverUrl: string | null;
  coverAlt: string;
  coverCredit: string;
  sources: string;
  announcedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

function articleFromRow(row: Record<string, unknown>): Article {
  return {
    id: Number(row.id),
    slug: String(row.slug),
    title: String(row.title),
    dek: String(row.dek || ""),
    bodyHtml: String(row.body_html || ""),
    topic: String(row.topic || "General"),
    status: row.status as Article["status"],
    publishedAt: row.published_at ? new Date(String(row.published_at)).toISOString() : null,
    featured: Boolean(row.featured),
    coverUrl: row.cover_url ? String(row.cover_url) : null,
    coverAlt: String(row.cover_alt || ""),
    coverCredit: String(row.cover_credit || ""),
    sources: String(row.sources || ""),
    announcedAt: row.announced_at ? new Date(String(row.announced_at)).toISOString() : null,
    createdAt: new Date(String(row.created_at)).toISOString(),
    updatedAt: new Date(String(row.updated_at)).toISOString(),
  };
}

export function articleCategoryLabel(topic: string): string {
  const clean = topic.trim();
  return !clean || clean.toLowerCase() === "essay" ? "Essay" : `Essay / ${clean}`;
}

export async function listPublished(options: {
  limit?: number;
  query?: string;
  topic?: string;
} = {}): Promise<Article[]> {
  const sql = database();
  if (!sql) return [];
  const limit = Math.min(Math.max(options.limit || 30, 1), 100);
  const query = (options.query || "").trim();
  const topic = (options.topic || "").trim();
  const like = `%${query}%`;
  const rows = await sql`
    SELECT * FROM prothymia_articles
    WHERE status = 'published'
      AND published_at IS NOT NULL
      AND published_at <= now()
      AND (${query} = '' OR title ILIKE ${like} OR dek ILIKE ${like} OR body_html ILIKE ${like})
      AND (${topic} = '' OR topic = ${topic})
    ORDER BY featured DESC, published_at DESC, id DESC
    LIMIT ${limit}
  `;
  return rows.map((row) => articleFromRow(row));
}

export async function listTopics(): Promise<string[]> {
  const sql = database();
  if (!sql) return [];
  const rows = await sql`
    SELECT DISTINCT topic FROM prothymia_articles
    WHERE status = 'published' AND published_at <= now() AND topic <> 'Essay'
    ORDER BY topic ASC
  `;
  return rows.map((row) => String(row.topic)).filter(Boolean);
}

export async function publishedArticle(slug: string): Promise<Article | null> {
  const sql = database();
  if (!sql) return null;
  const rows = await sql`
    SELECT * FROM prothymia_articles
    WHERE slug = ${slug} AND status = 'published'
      AND published_at IS NOT NULL AND published_at <= now()
    LIMIT 1
  `;
  return rows[0] ? articleFromRow(rows[0]) : null;
}

export async function listAdminArticles(): Promise<Article[]> {
  const sql = database();
  if (!sql) return [];
  const rows = await sql`
    SELECT * FROM prothymia_articles
    WHERE status <> 'deleted'
    ORDER BY updated_at DESC, id DESC
    LIMIT 250
  `;
  return rows.map((row) => articleFromRow(row));
}

export async function adminArticle(slug: string): Promise<Article | null> {
  const sql = database();
  if (!sql) return null;
  const rows = await sql`
    SELECT * FROM prothymia_articles WHERE slug = ${slug} AND status <> 'deleted' LIMIT 1
  `;
  return rows[0] ? articleFromRow(rows[0]) : null;
}

export async function createArticle(input: ArticleInput): Promise<Article> {
  const sql = requireDatabase();
  const rows = await sql`
    INSERT INTO prothymia_articles (
      slug, title, dek, body_html, topic, status, published_at, featured,
      cover_url, cover_alt, cover_credit, sources
    ) VALUES (
      ${input.slug}, ${input.title}, ${input.dek}, ${input.bodyHtml}, ${input.topic},
      ${input.status}, ${input.publishedAt}, ${input.featured}, ${input.coverUrl},
      ${input.coverAlt}, ${input.coverCredit}, ${input.sources}
    ) RETURNING *
  `;
  return articleFromRow(rows[0]);
}

export async function updateArticle(slug: string, input: ArticleInput): Promise<Article> {
  const sql = requireDatabase();
  const rows = await sql`
    UPDATE prothymia_articles SET
      slug = ${input.slug},
      title = ${input.title},
      dek = ${input.dek},
      body_html = ${input.bodyHtml},
      topic = ${input.topic},
      status = ${input.status},
      published_at = ${input.publishedAt},
      featured = ${input.featured},
      cover_url = ${input.coverUrl},
      cover_alt = ${input.coverAlt},
      cover_credit = ${input.coverCredit},
      sources = ${input.sources},
      updated_at = now()
    WHERE slug = ${slug} AND status <> 'deleted'
    RETURNING *
  `;
  if (!rows[0]) throw new Error("Article not found.");
  return articleFromRow(rows[0]);
}

export async function deleteArticle(slug: string): Promise<void> {
  const sql = requireDatabase();
  await sql`
    UPDATE prothymia_articles
    SET status = 'deleted', deleted_at = now(), updated_at = now()
    WHERE slug = ${slug} AND status <> 'deleted'
  `;
}

export async function pendingAnnouncements(): Promise<Article[]> {
  const sql = database();
  if (!sql) return [];
  const rows = await sql`
    SELECT * FROM prothymia_articles
    WHERE status = 'published' AND published_at <= now() AND announced_at IS NULL
    ORDER BY published_at ASC, id ASC
    LIMIT 25
  `;
  return rows.map((row) => articleFromRow(row));
}

export async function markAnnounced(articleId: number): Promise<void> {
  const sql = requireDatabase();
  await sql`UPDATE prothymia_articles SET announced_at = now() WHERE id = ${articleId}`;
}

export type Subscriber = { id: number; email: string };

export async function subscribe(email: string): Promise<Subscriber> {
  const sql = requireDatabase();
  const rows = await sql`
    INSERT INTO prothymia_subscribers (email)
    VALUES (${email})
    ON CONFLICT (email) DO UPDATE SET subscribed_at = now()
    RETURNING id, email
  `;
  return { id: Number(rows[0].id), email: String(rows[0].email) };
}

export async function subscribers(): Promise<Subscriber[]> {
  const sql = database();
  if (!sql) return [];
  const rows = await sql`SELECT id, email FROM prothymia_subscribers ORDER BY id ASC`;
  return rows.map((row) => ({ id: Number(row.id), email: String(row.email) }));
}

export async function deliveryExists(articleId: number, subscriberId: number): Promise<boolean> {
  const sql = requireDatabase();
  const rows = await sql`
    SELECT 1 FROM prothymia_newsletter_deliveries
    WHERE article_id = ${articleId} AND subscriber_id = ${subscriberId}
    LIMIT 1
  `;
  return Boolean(rows[0]);
}

export async function recordDelivery(
  articleId: number,
  subscriberId: number,
  providerId: string | null,
): Promise<void> {
  const sql = requireDatabase();
  await sql`
    INSERT INTO prothymia_newsletter_deliveries (article_id, subscriber_id, provider_id)
    VALUES (${articleId}, ${subscriberId}, ${providerId})
    ON CONFLICT (article_id, subscriber_id) DO NOTHING
  `;
}

export async function unsubscribe(email: string): Promise<void> {
  const sql = requireDatabase();
  await sql.begin(async (tx) => {
    const rows = await tx`SELECT id FROM prothymia_subscribers WHERE email = ${email}`;
    if (!rows[0]) return;
    const subscriberId = Number(rows[0].id);
    await tx`DELETE FROM prothymia_newsletter_deliveries WHERE subscriber_id = ${subscriberId}`;
    await tx`DELETE FROM prothymia_subscribers WHERE id = ${subscriberId}`;
  });
}
