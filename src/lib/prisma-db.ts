import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

export const data_base = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = data_base
}