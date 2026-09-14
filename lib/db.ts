import postgres from "postgres";

let client: ReturnType<typeof postgres> | null = null;
let clientUrl = "";

export function database(): ReturnType<typeof postgres> | null {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return null;
  if (!client || clientUrl !== url) {
    client = postgres(url, {
      max: 4,
      prepare: false,
      ssl: url.includes("localhost") || url.includes("127.0.0.1") ? false : "require",
      idle_timeout: 20,
    });
    clientUrl = url;
  }
  return client;
}

export function requireDatabase(): ReturnType<typeof postgres> {
  const sql = database();
  if (!sql) throw new Error("DATABASE_URL is not configured.");
  return sql;
}
