import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema.js';

let db;

export function getDB() {
  if (!db) {
    // In Cloudflare Workers environment with D1 binding
    if (typeof globalThis.DB !== 'undefined') {
      db = drizzle(globalThis.DB, { schema });
    }
    // In development environment or build time - use a mock database
    else if (process.env.NODE_ENV === 'development' || process.env.NEXT_PHASE === 'phase-production-build' || typeof window !== 'undefined') {
      console.warn('Development/Build mode: Using mock database. Deploy to Cloudflare for full D1 functionality.');
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
      throw new Error('Database connection not available. Please deploy to Cloudflare Workers with D1 binding.');
    }
  }
  return db;
}

export { schema };
