import { PrismaClient } from "@prisma/client";

const connectionString = process.env.MONGO_URL;

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: connectionString,
    },
  },
});
