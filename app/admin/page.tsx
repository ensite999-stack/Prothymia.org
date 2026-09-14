import { cookies } from "next/headers";
import { AdminDesk } from "../../components/admin-desk";
import { AdminLogin } from "../../components/admin-login";
import { listAdminArticles } from "../../lib/articles";
import { SESSION_COOKIE, validSession } from "../../lib/security";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const jar = await cookies();
  const authenticated = validSession(jar.get(SESSION_COOKIE)?.value);
  if (!authenticated) return <AdminLogin />;
  const articles = await listAdminArticles();
  return <AdminDesk initialArticles={articles} />;
}
