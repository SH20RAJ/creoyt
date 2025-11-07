import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

// Create database client (Turso for production, local SQLite for development)
function createDatabaseClient() {
  const url = process.env.TURSO_DB_URL;
  const authToken = process.env.TURSO_DB_TOKEN;

  // Use Turso if credentials are available, otherwise use local SQLite
  if (url && authToken) {
    console.log('Using Turso database');
    return createClient({
      url,
      authToken,
    });
  } else {
    console.log('Using local SQLite database');
    return createClient({
      url: 'file:./dev.db',
    });
  }
}

// Create database instance
export function createDB() {
  const client = createDatabaseClient();
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