"use client";

import { useState } from "react";

export function UnsubscribeForm({ token }: { token: string }) {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function unsubscribe() {
    setBusy(true);
    const response = await fetch("/api/newsletter/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const data = (await response.json().catch(() => ({}))) as { message?: string; error?: string };
    setMessage(data.message || data.error || "Please try again.");
    setBusy(false);
  }
  return (
    <div className="form-stack">
      <button className="button" type="button" onClick={unsubscribe} disabled={busy || !token}>
        {busy ? "Unsubscribing…" : "Confirm unsubscribe"}
      </button>
      {message ? <p className="notice" role="status">{message}</p> : null}
    </div>
  );
}
