import { authorizeAdmin, json, problem, readJson } from "../../../../../lib/admin";
import { deleteArticle, updateArticle } from "../../../../../lib/articles";
import { announceIfDue } from "../../../../../lib/email";
import { articleInput, InputError } from "../../../../../lib/validation";

function code(error: unknown): string | undefined {
  return error && typeof error === "object" && "code" in error ? String(error.code) : undefined;
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const denied = authorizeAdmin(request, true);
  if (denied) return denied;
  try {
    const { slug } = await params;
    const article = await updateArticle(slug, articleInput(await readJson(request)));
    let newsletterDeferred = false;
    try { await announceIfDue(article); } catch (error) { newsletterDeferred = true; console.error("Newsletter delivery deferred", error instanceof Error ? error.message : "Unknown"); }
    return json({ article, newsletterDeferred });
  } catch (error) {
    if (error instanceof InputError) return problem(error.message, 400);
    if (code(error) === "23505") return problem("That URL name is already in use.", 409);
    if (error instanceof Error && error.message === "Article not found.") return problem(error.message, 404);
    console.error("Article update failed", error);
    return problem("The article could not be saved.", 503);
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const denied = authorizeAdmin(request, true);
  if (denied) return denied;
  const { slug } = await params;
  await deleteArticle(slug);
  return json({ ok: true });
}
