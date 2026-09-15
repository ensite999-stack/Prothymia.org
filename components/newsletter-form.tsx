"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

export function NewsletterForm() {
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
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const response = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), website: form.get("website") }),
    });
    const data = (await response.json().catch(() => ({}))) as { error?: string };

    if (response.ok) {
      formElement.reset();
      setMessage("Subscribed");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage(data.error || "Please try again.");
    }

    setBusy(false);
  }

  return (
    <form className="form-stack" onSubmit={submit}>
      <div className="field">
        <label htmlFor="newsletter-email">Email</label>
        <input id="newsletter-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="honeypot" aria-hidden="true">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label className="consent-line">
        <input type="checkbox" required /> I agree to receive Kvisl emails when a new article is published.
      </label>
      <button className="button" type="submit" disabled={busy}>{busy ? "Subscribing…" : "Subscribe"}</button>
      {message ? <p className="notice" role="status">{message}</p> : null}
    </form>
  );
}
