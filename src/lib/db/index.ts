import { drizzle } from 'drizzle-orm/libsql';
import { createClient, type Client } from '@libsql/client/web';
import * as schema from './schema';

// Create Turso client - will be initialized in the functions that need it
function createTursoClient(): Client {
  if (!process.env.TURSO_DB_URL) {
    throw new Error('TURSO_DB_URL is not set');
  }

  return createClient({
    url: process.env.TURSO_DB_URL,
    authToken: process.env.TURSO_DB_TOKEN,
  });
}

// Create a function that returns a new database instance each time
export function getDb() {
  const client = createTursoClient();
  return drizzle(client, { schema });
}

export type Database = ReturnType<typeof getDb>;

// Re-export schema and types for convenience
export * from './schema';
