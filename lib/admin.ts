import { cookieValue, sameOrigin, SESSION_COOKIE, validSession } from "./security";

export function problem(message: string, status: number): Response {
  return Response.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
}

export function json(data: unknown, status = 200): Response {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

export function authorizeAdmin(request: Request, write = false): Response | null {
  const token = cookieValue(request, SESSION_COOKIE);
  if (!validSession(token)) return problem("Private access required.", 401);
  if (write && !sameOrigin(request)) return problem("Request origin was rejected.", 403);
  return null;
}

export function cronAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function readJson(request: Request, maxBytes = 500_000): Promise<unknown> {
  const text = await request.text();
  if (text.length > maxBytes) throw new Error("Request is too large.");
  return JSON.parse(text) as unknown;
}
