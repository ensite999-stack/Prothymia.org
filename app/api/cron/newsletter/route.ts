import { cronAuthorized, json, problem } from "../../../../lib/admin";
import { sendPendingAnnouncements } from "../../../../lib/email";

export async function GET(request: Request) {
  if (!cronAuthorized(request)) return problem("Unauthorized.", 401);
  try {
    const processed = await sendPendingAnnouncements();
    return json({ processed });
  } catch (error) {
    console.error("Newsletter cron failed", error);
    return problem("Newsletter processing failed.", 503);
  }
}
