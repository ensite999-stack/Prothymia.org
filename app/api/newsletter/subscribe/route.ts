import { json, problem, readJson } from "../../../../lib/admin";
import { subscribe } from "../../../../lib/articles";
import { sendSubscriptionConfirmation } from "../../../../lib/email";
import { sameOrigin } from "../../../../lib/security";
import { InputError, normalizeEmail } from "../../../../lib/validation";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return problem("Request origin was rejected.", 403);
  try {
    const data = (await readJson(request, 20_000)) as Record<string, unknown>;
    if (typeof data.website === "string" && data.website.trim()) return json({ message: "Subscription received." });
    const email = normalizeEmail(data.email);
    await subscribe(email);
    try {
      await sendSubscriptionConfirmation(email);
      return json({ message: "Subscribed. Check your inbox for a confirmation email." }, 201);
    } catch (error) {
      console.error("Subscription confirmation deferred", error instanceof Error ? error.message : "Unknown");
      return json({ message: "Your subscription was saved, but the confirmation email could not be sent yet." }, 202);
    }
  } catch (error) {
    if (error instanceof InputError) return problem(error.message, 400);
    console.error("Subscription failed", error);
    return problem("Subscription is temporarily unavailable.", 503);
  }
}
