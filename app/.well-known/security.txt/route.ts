import { site, siteUrl } from "../../../lib/site";

export function GET() {
  return new Response(`Contact: mailto:${site.email}\nCanonical: ${siteUrl()}/.well-known/security.txt\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
