"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

export function FooterNewsletter() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const response = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.get("email"), website: data.get("website") }),
    });
    const payload = (await response.json().catch(() => ({}))) as { error?: string };

    if (response.ok) {
      form.reset();
      setMessage("订阅成功");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage(payload.error || "Subscription is temporarily unavailable.");
    }

    setBusy(false);
  }

  return (
    <div className="footer-newsletter">
      <form className="footer-subscribe" onSubmit={submit}>
        <label className="sr-only" htmlFor="footer-email">Email</label>
        <input id="footer-email" name="email" type="email" autoComplete="email" placeholder="Email address" required />
        <div className="honeypot" aria-hidden="true">
          <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        </div>
        <button type="submit" disabled={busy}>{busy ? "…" : "Subscribe"}</button>
      </form>
      <p className="footer-newsletter-note">By subscribing, you agree to receive an email when a new article is published.</p>
      <div className="footer-subscribe-status" aria-live="polite">{message}</div>
    </div>
  );
}
