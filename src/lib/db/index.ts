import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

// Create Turso client
const client = createClient({
  url: process.env.TURSO_DB_URL!,
  authToken: process.env.TURSO_DB_TOKEN!,
});

// Create database instance
export const db = drizzle(client, { schema });

export type Database = typeof db;

// Re-export schema and types for convenience
export * from './schema';
