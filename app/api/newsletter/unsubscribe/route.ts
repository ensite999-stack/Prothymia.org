import { json, problem, readJson } from "../../../../lib/admin";
import { unsubscribe } from "../../../../lib/articles";
import { emailFromUnsubscribeToken, sameOrigin } from "../../../../lib/security";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return problem("Request origin was rejected.", 403);
  const data = (await readJson(request, 20_000).catch(() => ({}))) as { token?: unknown };
  const email = emailFromUnsubscribeToken(data.token);
  if (!email) return problem("This unsubscribe link is invalid or incomplete.", 400);
  await unsubscribe(email);
  return json({ message: "You have been unsubscribed and the linked local delivery records were deleted." });
}
