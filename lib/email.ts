import {
  deliveryExists,
  markAnnounced,
  pendingAnnouncements,
  recordDelivery,
  subscribers,
  type Article,
} from "./articles";
import { site, siteUrl } from "./site";
import { unsubscribeToken } from "./security";

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char] || char);
}

async function sendEmail(to: string, subject: string, html: string, text: string): Promise<string | null> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.NEWSLETTER_FROM?.trim();
  if (!apiKey || !from) throw new Error("Email delivery is not configured.");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], subject, html, text }),
  });
  if (!response.ok) throw new Error(`Email provider returned ${response.status}.`);
  const data = (await response.json()) as { id?: string };
  return data.id || null;
}

function unsubscribeUrl(email: string): string {
  return `${siteUrl()}/newsletter/unsubscribe?token=${encodeURIComponent(unsubscribeToken(email))}`;
}

export async function sendSubscriptionConfirmation(email: string): Promise<void> {
  const stop = unsubscribeUrl(email);
  await sendEmail(
    email,
    "You are subscribed to Kvisl",
    `<p>You are subscribed to Kvisl.</p><p>You will receive one email whenever a new article is first published.</p><p><a href="${stop}">Unsubscribe</a></p>`,
    `You are subscribed to Kvisl. You will receive one email whenever a new article is first published.\n\nUnsubscribe: ${stop}`,
  );
}

async function announce(article: Article): Promise<void> {
  if (article.announcedAt) return;
  const readers = await subscribers();
  const articleUrl = `${siteUrl()}/articles/${encodeURIComponent(article.slug)}`;
  for (const reader of readers) {
    if (await deliveryExists(article.id, reader.id)) continue;
    const stop = unsubscribeUrl(reader.email);
    const subject = `New from Kvisl: ${article.title}`;
    const html = `<p style="font-family:Georgia,serif;color:#66023C;font-size:20px">${site.name}</p><h1>${escapeHtml(article.title)}</h1>${article.dek ? `<p>${escapeHtml(article.dek)}</p>` : ""}<p><a href="${articleUrl}">Read the essay</a></p><p style="font-size:12px"><a href="${stop}">Unsubscribe</a></p>`;
    const text = `${article.title}\n\n${article.dek}\n\n${articleUrl}\n\nUnsubscribe: ${stop}`;
    const providerId = await sendEmail(reader.email, subject, html, text);
    await recordDelivery(article.id, reader.id, providerId);
  }
  await markAnnounced(article.id);
}

export async function announceIfDue(article: Article): Promise<boolean> {
  if (
    article.status !== "published" ||
    article.announcedAt ||
    !article.publishedAt ||
    new Date(article.publishedAt).getTime() > Date.now()
  ) return false;
  await announce(article);
  return true;
}

export async function sendPendingAnnouncements(): Promise<number> {
  const pending = await pendingAnnouncements();
  let sent = 0;
  for (const article of pending) {
    await announce(article);
    sent += 1;
  }
  return sent;
}
