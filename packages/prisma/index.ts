import { PrismaClient } from "./generated/client/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

let prisma: PrismaClient | null = null;

export const getPrismaClient = (databaseUrl: string) => {
  if (!prisma) {
    const pool = new Pool({ connectionString: databaseUrl });
    const adapter = new PrismaPg(pool);

    prisma = new PrismaClient({
      adapter,
      log:
        process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
  }

  return prisma;
};

// Export all Prisma types
// NOTE: Use relative path here. Using the absolute alias (@packages/prisma/generated/client)
// fails during local build (tsc) because the package's own tsconfig treats baseUrl as "."
export * from "./generated/client/index.js";
export { prisma, PrismaClient };
