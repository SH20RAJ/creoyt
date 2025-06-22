import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export function createDB(d1: D1Database) {
  return drizzle(d1, { schema });
}

export type Database = ReturnType<typeof createDB>;

// Helper function to get database instance in app
export function getDB(env: { DB: D1Database }) {
  return createDB(env.DB);
}

// Re-export schema for convenience
export * from './schema';
