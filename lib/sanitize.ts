import sanitizeHtml from "sanitize-html";

export function sanitizeArticleHtml(value: string): string {
  return sanitizeHtml(value, {
    allowedTags: [
      "p", "br", "strong", "em", "s", "blockquote", "h2", "h3",
      "ul", "ol", "li", "a", "img", "hr", "code", "pre",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: { img: ["http", "https"] },
    transformTags: {
      a: (_tagName, attribs) => ({
        tagName: "a",
        attribs: {
          ...attribs,
          rel: "noopener noreferrer",
          target: attribs.target === "_blank" ? "_blank" : "_self",
        },
      }),
    },
  }).trim();
}

export function stripHtml(value: string): string {
  return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim();
}
