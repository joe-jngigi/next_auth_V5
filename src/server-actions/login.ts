"use server";

import * as zod from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { compare } from "bcryptjs";

import { LoginSchema } from "@/src/schemas/index";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/src/data-queries/user_data";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/src/lib/tokens";
import { sendTwoFAAuthToken, sendVerificationEmail } from "@/src/lib/mail";
import { getTwoFactorTokenByEmail } from "../data-queries/two_factor_auth_token";
import { data_base } from "../lib/prisma-db";
import { getTwoFactorConfirmationByUserId } from "../data-queries/two_factor_confirmation";

export const loginAction = async (values: zod.infer<typeof LoginSchema>) => {
  const validatedFieldValues = LoginSchema.safeParse(values);

  if (!validatedFieldValues.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, twoFAcode } = validatedFieldValues.data;

  const checUser = await getUserByEmail(email);

  if (!checUser || !checUser.email) {
    return { error: "User does not exist." };
  }
  if (!checUser.password) {
    return {
      info: "This email already Exists. Check in with Google or GitHub",
    };
  }

  const matchPassword = await compare(password, checUser.password);

  if (!matchPassword) {
    return { error: "Wrong password, Please enter the correct password" };
  }

  if (!checUser.emailVerified) {
    const verificationToken = await generateVerificationToken(checUser.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return {
      success:
        "This E-mail needs verification! Check your Email for Confirmation.",
    };
  }
  /**
   * What this rule does is it checks if the user has the TwoFactorAuthentication as true.
   * If true, it the checks if the email exists in the database, With this information true;
   *
   * We the store the return value object in a variable; of the generated 2FA.
   * It stores it with the user email.
   *
   * The returned value object, we get the;
   * @values {twoFactorAuthToken.email, twoFactorAuthToken.token}
   * Which are the send to value email. And now the token the user has generated
   */
  if (checUser.isTwoFactorEnabled && checUser.email) {
    if (twoFAcode) {
      const existTwoFactor = await getTwoFactorTokenByEmail(checUser.email);

      if (!existTwoFactor) {
        return { error: "2FA token does not exist" };
      }

      if (existTwoFactor.token !== twoFAcode) {
        return { error: "Invalid 2FA code" };
      }

      const isExpired = new Date(existTwoFactor.expires) < new Date();
      if (isExpired) {
        return { info: "The 2FA code is already expired. Login Again!" };
      }

      // Create the 2FA confirmation so that the user can login
      await data_base.twoFactorAuthToken.delete({
        where: { id: existTwoFactor.id },
      });

      /**
       * What we want here is not to return anything, but we will want to create a 2FA confirmation
       * But before we do that, we will first delete any existing Confirmation
       * 
       * Remember, this confirmation is destroyed once the user has been logged in. 
       * ie. the user has confirmed they recieved the 2FA code in their email.
       */
      const existConfirmation = await getTwoFactorConfirmationByUserId(
        checUser.id
      );
      if (existConfirmation) {
        await data_base.twoFactorConfirmation.delete({
          where: { id: existConfirmation.id },
        });
      }

      await data_base.twoFactorConfirmation.create({
        data: {
          userId: checUser.id,
        },
      });
    } else {
      const twoFactorAuthToken = await generateTwoFactorToken(checUser.email);
      await sendTwoFAAuthToken(
        twoFactorAuthToken.email,
        twoFactorAuthToken.token
      );
      return { twoFactor: true };
    }
  }

  /**
   * We have to pass down the email and passowrd as raw format to the signIn server function.
   * We will then do further validation of the user, to check if the passowrd matches, and the user exists in the database
   *
   */
  try {
    await signIn("credentials", {
      // TODO redirectTo: callbacks || DEFAULT_LOGIN_REDIRECT
      redirectTo: DEFAULT_LOGIN_REDIRECT,
      email,
      password,
    });
    return { success: "Login successful" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials Error" };
        default:
          return { info: "something went wrong" };
      }
    }

    throw error;
  }

  // console.log("validatedFieldValues", validatedFieldValues);
};
