import { sanitizeArticleHtml } from "./sanitize";

export class InputError extends Error {}

export type ArticleInput = {
  slug: string;
  title: string;
  dek: string;
  bodyHtml: string;
  topic: string;
  status: "draft" | "published";
  publishedAt: string | null;
  featured: boolean;
  coverUrl: string | null;
  coverAlt: string;
  coverCredit: string;
  sources: string;
};

const text = (value: unknown, limit: number) =>
  typeof value === "string" ? value.trim().slice(0, limit) : "";

function httpUrl(value: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error();
    return url.href;
  } catch {
    throw new InputError("Image URLs must use HTTP or HTTPS.");
  }
}

export function articleInput(value: unknown): ArticleInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new InputError("Invalid article data.");
  }
  const raw = value as Record<string, unknown>;
  const title = text(raw.title, 180);
  const slug = text(raw.slug, 120).toLowerCase();
  const dek = text(raw.dek, 700);
  const topic = text(raw.topic, 80) || "General";
  const bodyHtml = sanitizeArticleHtml(typeof raw.bodyHtml === "string" ? raw.bodyHtml : "");
  const status = raw.status === "published" ? "published" : "draft";
  const featured = raw.featured === true;
  const coverUrl = httpUrl(text(raw.coverUrl, 2000));
  const coverAlt = text(raw.coverAlt, 300);
  const coverCredit = text(raw.coverCredit, 300);
  const sources = text(raw.sources, 12_000);

  if (title.length < 2) throw new InputError("Add an article title.");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new InputError("The URL name must use lowercase letters, numbers, and hyphens.");
  }
  if (coverUrl && !coverAlt) throw new InputError("Add alternative text for the cover image.");

  let publishedAt: string | null = null;
  const candidate = text(raw.publishedAt, 80);
  if (candidate) {
    const date = new Date(candidate);
    if (Number.isNaN(date.getTime())) throw new InputError("Publication date is invalid.");
    publishedAt = date.toISOString();
  } else if (status === "published") {
    publishedAt = new Date().toISOString();
  }

  return {
    slug,
    title,
    dek,
    bodyHtml,
    topic,
    status,
    publishedAt,
    featured,
    coverUrl,
    coverAlt,
    coverCredit,
    sources,
  };
}

export function normalizeEmail(value: unknown): string {
  const email = text(value, 320).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new InputError("Enter a valid email address.");
  }
  return email;
}
