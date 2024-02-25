import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

import { LoginSchema } from "@/src/schemas";
import { getUserByEmail } from "./src/data/user_data";

export default {
  providers: [
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
