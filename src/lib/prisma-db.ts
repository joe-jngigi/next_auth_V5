import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

/**
 * @initialize @param globalThis. This is during the development because of hot reloading in nextJS.
 * If we don't do that, it will always initialize a new PrismaClient
 * everytime it reloads that we have too may active prisma clients.
 * In production, we always initialize it like this:
 * @param export const @var db = new @function PrismaClient()
 */

export const data_base = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = data_base
}

