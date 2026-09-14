import { NextResponse } from "next/server";
import { constantEqual, issueSession, sameOrigin, SESSION_COOKIE, sessionCookieOptions } from "../../../../lib/security";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Request origin was rejected." }, { status: 403 });
  const configured = process.env.ADMIN_PASSWORD || "";
  if (!configured) return NextResponse.json({ error: "Private access is not configured." }, { status: 503 });
  const data = (await request.json().catch(() => ({}))) as { password?: unknown };
  if (!constantEqual(data.password, configured)) return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, issueSession(), sessionCookieOptions());
  return response;
}
