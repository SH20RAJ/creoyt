import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

// Create Turso client
function createTursoClient() {
  const url = process.env.TURSO_DB_URL;
  const authToken = process.env.TURSO_DB_TOKEN;

  if (!url) {
    throw new Error('TURSO_DB_URL environment variable is required');
  }

  if (!authToken) {
    throw new Error('TURSO_DB_TOKEN environment variable is required');
  }

  return createClient({
    url,
    authToken,
  });
}

// Create database instance
export function createDB() {
  const client = createTursoClient();
  return drizzle(client, { schema });
}

export type Database = ReturnType<typeof createDB>;

// Singleton database instance
let db: Database | null = null;

// Helper function to get database instance
export function getDB(): Database {
  if (!db) {
    db = createDB();
  }
  return db;
}

// Re-export schema for convenience
export * from './schema';