import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export function getPrisma(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const dbUrl = process.env.DATABASE_URL;

  if (dbUrl) {
    const sanitizedUrl = dbUrl.replace(/:[^:@]+@/, ":***@");
    console.log(`[Prisma Init] Initializing PrismaClient with DATABASE_URL: ${sanitizedUrl}`);
  } else {
    console.error("[Prisma Init Error]: DATABASE_URL environment variable is MISSING in runtime environment!");
  }

  const client = new PrismaClient({
    datasources: dbUrl
      ? {
          db: {
            url: dbUrl,
          },
        }
      : undefined,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

  globalForPrisma.prisma = client;
  return client;
}

// Lazy Proxy: prevents new PrismaClient() from executing at module load / build time.
// Instantiation only occurs when a database query or property is accessed at runtime.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop: keyof PrismaClient) {
    const client = getPrisma();
    const value = client[prop];
    if (typeof value === "function") {
      return (value as Function).bind(client);
    }
    return value;
  },
});


