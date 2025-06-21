import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema.js';

let db;

export function getLocalDB() {
  if (!db) {
    // Create a local SQLite database for development
    const sqlite = new Database('local.db');
    db = drizzle(sqlite, { schema });
  }
  return db;
}

// For development, use local SQLite instead of Cloudflare D1
export function getDB() {
  if (process.env.NODE_ENV === 'development') {
    return getLocalDB();
  }

  // In production/Cloudflare Workers environment
  if (typeof globalThis.DB !== 'undefined') {
    return drizzle(globalThis.DB, { schema });
  }

  throw new Error('Database connection not available');
}

export { schema };
