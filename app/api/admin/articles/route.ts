import { authorizeAdmin, json, problem, readJson } from "../../../../lib/admin";
import { createArticle, listAdminArticles } from "../../../../lib/articles";
import { announceIfDue } from "../../../../lib/email";
import { articleInput, InputError } from "../../../../lib/validation";

function code(error: unknown): string | undefined {
  return error && typeof error === "object" && "code" in error ? String(error.code) : undefined;
}

export async function GET(request: Request) {
  const denied = authorizeAdmin(request);
  if (denied) return denied;
  return json({ articles: await listAdminArticles() });
}

export async function POST(request: Request) {
  const denied = authorizeAdmin(request, true);
  if (denied) return denied;
  try {
    const article = await createArticle(articleInput(await readJson(request)));
    let newsletterDeferred = false;
    try { await announceIfDue(article); } catch (error) { newsletterDeferred = true; console.error("Newsletter delivery deferred", error instanceof Error ? error.message : "Unknown"); }
    return json({ article, newsletterDeferred }, 201);
  } catch (error) {
    if (error instanceof InputError) return problem(error.message, 400);
    if (code(error) === "23505") return problem("That URL name is already in use.", 409);
    console.error("Article create failed", error);
    return problem("The article could not be saved.", 503);
  }
}
