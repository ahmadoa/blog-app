import { PrismaClient } from "@prisma/client";

const connectionString = process.env.MONGO_URL;

// Create a new Prisma client
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: connectionString,
    },
  },
});
