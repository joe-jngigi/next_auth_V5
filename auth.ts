import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { data_base } from "@/src/lib/prisma-db";
import { getUserById } from "@/src/data-queries/user_data";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "./src/data-queries/two_factor_confirmation";

// console.log("AuthConfig: ", authConfig);

/**
 * Normally, this is is usually created like this
 * @export { { handlers: { GET, POST }, auth,} = NextAuth({ providers: [GitHub], });}
 *
 * But because I am using an adapter, ie. the prisma adapter,
 * I have to create a separate auth configuration file which I can import in the middleware
 *
 * I have documented more about why this is so on the readme file.
 * You can refer to the nextAuth v5 documentation
 *
 * - [Adapters and Edge compatibility](https://authjs.dev/guides/upgrade-to-v5?authentication-method=server-component#edge-compatibility)
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
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }

      /**
       * This checks for an **existingUser**, before checking if the user is emailVerified
       * If the user is not verified, they are denied access through the middleware
       * This provides an extra layer security, as we have already do the same on the frontend part
       */
      const existingUser = await getUserById(user.id);
      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }

      // TODO Add 2FA checking
      /**
       * This will check if the user has two factor authentication as true or false
       * If false, the user will be allowed to login
       *
       * if the 2FA is true, we will then check if it is confirmed;
       * if not, we will not allow the user to login.
       *
       * Take away:
       * - **The user should not be allowed to login if they don't have a confirmation!**
       *
       * If the user has two factor confirmation, we will delete the confirmation
       * Or have an expiry date
       */
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
        if (!twoFactorConfirmation) {
          return false;
        }

        await data_base.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }
      return true;
    },

    /**
     * This just returns the
     */
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
