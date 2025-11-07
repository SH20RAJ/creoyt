import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.TURSO_DB_URL!,
    authToken: process.env.TURSO_DB_TOKEN!,
  },
});