import { copyFileSync, existsSync } from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

function ensureSqliteOnVercel() {
  if (!process.env.VERCEL) return;
  const dest = "/tmp/szczep.db";
  if (!existsSync(dest)) {
    const src = path.join(process.cwd(), "data", "szczep.db");
    if (existsSync(src)) copyFileSync(src, dest);
  }
  process.env.DATABASE_URL = "file:/tmp/szczep.db";
}

ensureSqliteOnVercel();

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
