"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), website: form.get("website") }),
    });
    const data = (await response.json().catch(() => ({}))) as { message?: string; error?: string };
    setMessage(data.message || data.error || "Please try again.");
    if (response.ok) event.currentTarget.reset();
    setBusy(false);
  }

  return (
    <form className="form-stack" onSubmit={submit}>
      <div className="field">
        <label htmlFor="newsletter-email">Email</label>
        <input id="newsletter-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div style={{ position: "absolute", left: "-10000px" }} aria-hidden="true">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label style={{ color: "var(--muted)", fontSize: ".84rem", lineHeight: 1.5 }}>
        <input type="checkbox" required /> I agree to receive Prothymia emails when a new article is published.
      </label>
      <button className="button" type="submit" disabled={busy}>{busy ? "Subscribing…" : "Subscribe"}</button>
      {message ? <p className="notice" role="status">{message}</p> : null}
    </form>
  );
}
