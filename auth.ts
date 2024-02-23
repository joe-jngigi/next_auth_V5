import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { data_base } from "@/src/lib/prisma-db";
// console.log("AuthConfig: ", authConfig);

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(data_base),
  ...authConfig,
});
