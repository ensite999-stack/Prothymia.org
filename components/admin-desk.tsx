"use client";

import { ChangeEvent, useMemo, useState } from "react";
import type { Article } from "../lib/articles";
import { RichEditor } from "./rich-editor";

type Draft = {
  slug: string;
  title: string;
  dek: string;
  bodyHtml: string;
  topic: string;
  status: "draft" | "published";
  publishedAt: string;
  featured: boolean;
  coverUrl: string;
  coverAlt: string;
  coverCredit: string;
  sources: string;
};

const emptyDraft = (): Draft => ({
  slug: "",
  title: "",
  dek: "",
  bodyHtml: "",
  topic: "General",
  status: "draft",
  publishedAt: "",
  featured: false,
  coverUrl: "",
  coverAlt: "",
  coverCredit: "",
  sources: "",
});

function toDraft(article: Article): Draft {
  return {
    slug: article.slug,
    title: article.title,
    dek: article.dek,
    bodyHtml: article.bodyHtml,
    topic: article.topic,
    status: article.status === "published" ? "published" : "draft",
    publishedAt: article.publishedAt ? new Date(article.publishedAt).toISOString().slice(0, 16) : "",
    featured: article.featured,
    coverUrl: article.coverUrl || "",
    coverAlt: article.coverAlt,
    coverCredit: article.coverCredit,
    sources: article.sources,
  };
}

export function AdminDesk({ initialArticles }: { initialArticles: Article[] }) {
  const [articles, setArticles] = useState(initialArticles);
  const [originalSlug, setOriginalSlug] = useState<string | null>(initialArticles[0]?.slug || null);
  const [draft, setDraft] = useState<Draft>(initialArticles[0] ? toDraft(initialArticles[0]) : emptyDraft());
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [coverBusy, setCoverBusy] = useState(false);
  const isNew = originalSlug === null;

  const sorted = useMemo(() => [...articles].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)), [articles]);

  function choose(article: Article) {
    setOriginalSlug(article.slug);
    setDraft(toDraft(article));
    setMessage("");
  }

  async function refresh(preferredSlug?: string) {
    const response = await fetch("/api/admin/articles", { cache: "no-store" });
    if (!response.ok) return;
    const data = (await response.json()) as { articles: Article[] };
    setArticles(data.articles);
    const selected = data.articles.find((item) => item.slug === preferredSlug);
    if (selected) {
      setOriginalSlug(selected.slug);
      setDraft(toDraft(selected));
    }
  }

  async function save() {
    setBusy(true);
    setMessage("");
    const payload = {
      ...draft,
      coverUrl: draft.coverUrl || null,
      publishedAt: draft.publishedAt ? new Date(draft.publishedAt).toISOString() : null,
    };
    const endpoint = isNew ? "/api/admin/articles" : `/api/admin/articles/${encodeURIComponent(originalSlug!)}`;
    const response = await fetch(endpoint, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await response.json().catch(() => ({}))) as { article?: Article; error?: string; newsletterDeferred?: boolean };
    if (response.ok && data.article) {
      await refresh(data.article.slug);
      setMessage(data.newsletterDeferred ? "Saved. Newsletter delivery is pending configuration or retry." : "Saved.");
    } else {
      setMessage(data.error || "Save failed.");
    }
    setBusy(false);
  }

  async function remove() {
    if (!originalSlug || !window.confirm("Remove this article from the private list and public site?")) return;
    setBusy(true);
    const response = await fetch(`/api/admin/articles/${encodeURIComponent(originalSlug)}`, { method: "DELETE" });
    if (response.ok) {
      await refresh();
      setOriginalSlug(null);
      setDraft(emptyDraft());
      setMessage("Article removed.");
    } else {
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      setMessage(data.error || "Delete failed.");
    }
    setBusy(false);
  }

  async function uploadCover(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setCoverBusy(true);
    const body = new FormData();
    body.append("file", file);
    const response = await fetch("/api/admin/media", { method: "POST", body });
    const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
    if (response.ok && data.url) setDraft((value) => ({ ...value, coverUrl: data.url! }));
    else setMessage(data.error || "Cover upload failed.");
    setCoverBusy(false);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <section className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-head">
          <strong>Kvisl</strong>
          <button type="button" onClick={() => { setOriginalSlug(null); setDraft(emptyDraft()); setMessage(""); }}>New</button>
        </div>
        <div className="admin-article-list">
          {sorted.map((article) => (
            <button className={originalSlug === article.slug ? "active" : ""} type="button" key={article.id} onClick={() => choose(article)}>
              <span>{article.title}</span>
              <small>Essay / {article.topic} · {article.status}</small>
            </button>
          ))}
        </div>
        <button className="admin-logout" type="button" onClick={logout}>Sign out</button>
      </aside>

      <div className="admin-editor">
        <div className="admin-title-row">
          <div><p className="eyebrow">Private Access</p><h1>{isNew ? "New essay" : "Edit essay"}</h1></div>
          <div className="admin-actions">
            {!isNew ? <button className="button danger" type="button" onClick={remove} disabled={busy}>Delete</button> : null}
            <button className="button" type="button" onClick={save} disabled={busy}>{busy ? "Saving…" : "Save"}</button>
          </div>
        </div>
        {message ? <p className="notice" role="status">{message}</p> : null}
        <div className="admin-fields">
          <div className="field full"><label>Title</label><input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /></div>
          <div className="field"><label>URL name</label><input value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })} placeholder="essay-url-name" /></div>
          <div className="field"><label>Essay topic (shown as Essay / Topic)</label><input value={draft.topic} onChange={(e) => setDraft({ ...draft, topic: e.target.value })} /></div>
          <div className="field full"><label>Standfirst</label><textarea rows={3} value={draft.dek} onChange={(e) => setDraft({ ...draft, dek: e.target.value })} /></div>
          <div className="field"><label>Status</label><select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as Draft["status"] })}><option value="draft">Draft</option><option value="published">Published</option></select></div>
          <div className="field"><label>Publication time (UTC)</label><input type="datetime-local" value={draft.publishedAt} onChange={(e) => setDraft({ ...draft, publishedAt: e.target.value })} /></div>
          <div className="field full"><label><input type="checkbox" checked={draft.featured} onChange={(e) => setDraft({ ...draft, featured: e.target.checked })} /> Feature on article listings</label></div>
          <div className="field full"><label>Cover image URL</label><input value={draft.coverUrl} onChange={(e) => setDraft({ ...draft, coverUrl: e.target.value })} /><label className="editor-upload">{coverBusy ? "Uploading…" : "Upload cover"}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={uploadCover} disabled={coverBusy} /></label></div>
          <div className="field"><label>Cover alternative text</label><input value={draft.coverAlt} onChange={(e) => setDraft({ ...draft, coverAlt: e.target.value })} /></div>
          <div className="field"><label>Cover credit</label><input value={draft.coverCredit} onChange={(e) => setDraft({ ...draft, coverCredit: e.target.value })} /></div>
          <div className="field full"><label>Article body</label><RichEditor value={draft.bodyHtml} onChange={(bodyHtml) => setDraft((value) => ({ ...value, bodyHtml }))} /></div>
          <div className="field full"><label>Sources</label><textarea rows={7} value={draft.sources} onChange={(e) => setDraft({ ...draft, sources: e.target.value })} placeholder="One source or note per line" /></div>
        </div>
      </div>
    </section>
  );
}
