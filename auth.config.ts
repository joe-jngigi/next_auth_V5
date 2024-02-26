import type { NextAuthConfig } from "next-auth";
import { compare } from "bcryptjs";

import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { LoginSchema } from "@/src/schemas";
import { getUserByEmail } from "./src/data/user_data";

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Credentials({
      // Start Custom Credentials Providers setup
      async authorize(credentials) {
        const validatedLoginData = LoginSchema.safeParse(credentials);

        if (validatedLoginData.success) {
          const { email, password } = validatedLoginData.data;

          /**
           * After we have validated the credentials we received from the custom user, we now have to check two things
           * if the user exists, through the email.
           *
           * Check whether the user signed up by other providers.
           * In this case, if the user signed up, and they don't have a password, they will use the provider.
           *
           * if none of this is true, then it returns a null value, prompting the user to signup
           */
          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            return null;
          }

          const matchedPassword = await compare(password, user.password);

          if (matchedPassword) {
            return user;
          }
        }

        return null;
      },
      // End
    }),
  ],
} satisfies NextAuthConfig;
