import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { data_base } from "@/src/lib/prisma-db";
// console.log("AuthConfig: ", authConfig);

/**
 * Normally, this is is usually created like this
 * @export const { handlers: { GET, POST }, auth,} = NextAuth({ providers: [GitHub], });
 */
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(data_base),
  session: { strategy: "jwt" },
  ...authConfig,
});
