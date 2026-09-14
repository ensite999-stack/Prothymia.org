"use client";

import { FormEvent, useState } from "react";

export function AdminLogin() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: form.get("password") }),
    });
    const data = (await response.json().catch(() => ({}))) as { error?: string };
    if (response.ok) window.location.reload();
    else setMessage(data.error || "Private access failed.");
    setBusy(false);
  }

  return (
    <section className="section">
      <div className="narrow">
        <p className="eyebrow">Private Access</p>
        <h1 className="page-title">Prothymia</h1>
        <form className="form-stack" onSubmit={submit}>
          <div className="field">
            <label htmlFor="private-password">Password</label>
            <input id="private-password" name="password" type="password" autoComplete="current-password" required autoFocus />
          </div>
          <button className="button" type="submit" disabled={busy}>{busy ? "Checking…" : "Enter"}</button>
          {message ? <p className="notice" role="alert">{message}</p> : null}
        </form>
      </div>
    </section>
  );
}
