import { list, put } from "@vercel/blob";
import { authorizeAdmin, json, problem } from "../../../../lib/admin";

const allowed = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

function begins(bytes: Uint8Array, expected: number[]): boolean {
  return expected.every((value, index) => bytes[index] === value);
}

function ascii(bytes: Uint8Array): string {
  return String.fromCharCode(...bytes);
}

export async function GET(request: Request) {
  const denied = authorizeAdmin(request);
  if (denied) return denied;
  if (!process.env.BLOB_READ_WRITE_TOKEN) return problem("Image storage is not configured.", 503);
  const result = await list({ prefix: "prothymia/", limit: 100 });
  return json({ media: result.blobs.map((blob) => ({ url: blob.url, name: blob.pathname })) });
}

export async function POST(request: Request) {
  const denied = authorizeAdmin(request, true);
  if (denied) return denied;
  if (!process.env.BLOB_READ_WRITE_TOKEN) return problem("Image storage is not configured.", 503);
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size < 1 || file.size > 4 * 1024 * 1024 || !allowed.has(file.type)) {
    return problem("Choose a JPEG, PNG, WebP or GIF under 4 MB.", 400);
  }
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const valid =
    (file.type === "image/jpeg" && begins(bytes, [255, 216])) ||
    (file.type === "image/png" && begins(bytes, [137, 80, 78, 71, 13, 10, 26, 10])) ||
    (file.type === "image/gif" && /^GIF8[79]a$/.test(ascii(bytes.subarray(0, 6)))) ||
    (file.type === "image/webp" && ascii(bytes.subarray(0, 4)) === "RIFF" && ascii(bytes.subarray(8, 12)) === "WEBP");
  if (!valid) return problem("The file contents do not match its image format.", 400);
  const ext = allowed.get(file.type)!;
  const blob = await put(`prothymia/${crypto.randomUUID()}.${ext}`, buffer, {
    access: "public",
    contentType: file.type,
    addRandomSuffix: false,
  });
  return json({ url: blob.url }, 201);
}
