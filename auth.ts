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
      console.log(
        "-------------------------session------------------------------------"
      );

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

      console.log({ token: token });

      return token;
    },
  },
  adapter: PrismaAdapter(data_base),
  session: { strategy: "jwt" },
  ...authConfig,
});
