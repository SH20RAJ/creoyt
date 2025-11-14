import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  // Drizzle types currently accept either URL-only or D1 credentials.
  // We pass the URL here for type safety; the auth token is read via env by the driver.
  dbCredentials: {
    url: process.env.TURSO_DB_URL as string,
  } as any,
});
