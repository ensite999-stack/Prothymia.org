import { site, siteUrl } from "../../lib/site";

export function GET() {
  const text = `# ${site.name}\n\n${site.motto}\n\nIndependent essays by ${site.author}.\n\n- Essays: ${siteUrl()}/essays\n- About: ${siteUrl()}/about\n- RSS: ${siteUrl()}/feed.xml\n`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
