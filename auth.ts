import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { data_base } from "@/src/lib/prisma-db";
import { getUserById } from "@/src/data/user_data";
import { UserRole } from "@prisma/client";

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
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await data_base.user.update({
        where: { id: user.id },
        data: {emailVerified: new Date()} 
      })
    },
  },
  callbacks: {
    // async signIn({ user  }) {

    //   const existingUser = await getUserById(user.id)
    //   console.log({ existingUser });

    //   if (!existingUser || !existingUser.emailVerified) {
    //     return false
    //   }
    //   return true;
    // },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      token.role = existingUser.role;

      // console.log({ token: token });

      return token;
    },
  },
  adapter: PrismaAdapter(data_base),
  session: { strategy: "jwt" },
  ...authConfig,
});
