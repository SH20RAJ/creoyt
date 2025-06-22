import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema.js";

export function getDB() {
  const { env } = getCloudflareContext();
  return drizzle(env.DB, { schema });
}
