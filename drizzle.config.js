import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  driver: "d1-http",
  dbCredentials: {
    wranglerConfigPath: "./wrangler.jsonc",
    dbName: "creaovate-db",
  },
});
