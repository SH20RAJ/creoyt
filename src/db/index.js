import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema.js';

let db;

export function getDB() {
  if (!db) {
    // In Cloudflare Workers environment
    if (typeof globalThis.DB !== 'undefined') {
      db = drizzle(globalThis.DB, { schema });
    }
    // In development environment - use a mock database for now
    else if (process.env.NODE_ENV === 'development') {
      console.warn('Development mode: Using mock database. Set up Cloudflare D1 for full functionality.');
      // Create a mock database that doesn't actually persist data
      const mockDB = {
        insert: () => ({ values: () => ({ returning: () => [{ id: 'mock-id' }] }) }),
        select: () => ({ from: () => ({ where: () => ({ limit: () => [] }) }) }),
        update: () => ({ set: () => ({ where: () => ({ returning: () => [] }) }) }),
        delete: () => ({ where: () => Promise.resolve() }),
      };
      db = mockDB;
    }
    else {
      throw new Error('Database connection not available');
    }
  }
  return db;
}

export { schema };
