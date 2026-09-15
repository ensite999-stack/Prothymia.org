import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "kvisl_private";
const SESSION_MS = 12 * 60 * 60 * 1000;

function secret(): string {
  const value = process.env.ADMIN_SESSION_SECRET || "";
  if (value.length < 32) throw new Error("ADMIN_SESSION_SECRET must contain at least 32 characters.");
  return value;
}

function digest(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

export function constantEqual(left: unknown, right: unknown): boolean {
  return timingSafeEqual(digest(String(left)), digest(String(right)));
}

function signature(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

export function issueSession(now = Date.now()): string {
  const payload = Buffer.from(
    JSON.stringify({ expires: now + SESSION_MS, nonce: randomBytes(18).toString("hex") }),
  ).toString("base64url");
  return `${payload}.${signature(payload)}`;
}

export function validSession(token: unknown, now = Date.now()): boolean {
  try {
    const [payload, sig, extra] = String(token || "").split(".");
    if (!payload || !sig || extra || !constantEqual(sig, signature(payload))) return false;
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { expires?: unknown };
    return (
      typeof parsed.expires === "number" &&
      parsed.expires > now &&
      parsed.expires <= now + SESSION_MS
    );
  } catch {
    return false;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(SESSION_MS / 1000),
  };
}

export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const requestOrigin = new URL(request.url).origin;
  const configured = process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL).origin
    : null;
  return origin === requestOrigin || Boolean(configured && origin === configured);
}

export function cookieValue(request: Request, name: string): string | null {
  const source = request.headers.get("cookie") || "";
  for (const part of source.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}

export function unsubscribeToken(email: string): string {
  const encoded = Buffer.from(email).toString("base64url");
  return `${encoded}.${signature(`unsubscribe:${email}`)}`;
}

export function emailFromUnsubscribeToken(token: unknown): string | null {
  try {
    const [encoded, sig, extra] = String(token || "").split(".");
    if (!encoded || !sig || extra) return null;
    const email = Buffer.from(encoded, "base64url").toString("utf8");
    return constantEqual(sig, signature(`unsubscribe:${email}`)) ? email : null;
  } catch {
    return null;
  }
}
