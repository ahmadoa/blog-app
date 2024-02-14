import { PrismaClient } from "@prisma/client";
import { MongoClient } from "connect-mongo";

const connectionString = env("MONGO_URL");

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const prisma = new PrismaClient({
  datasources: {
    db: {
      client,
    },
  },
});
