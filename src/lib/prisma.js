import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  // Create a new Prisma Client instance for production
  prisma = new PrismaClient();
} else {
  // Reuse Prisma Client instance in development to avoid multiple connections
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
