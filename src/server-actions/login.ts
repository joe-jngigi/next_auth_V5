"use server";

import * as zod from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { compare } from "bcryptjs";

import { LoginSchema } from "@/src/schemas/index";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/src/data/user_data";
import { generateVerificationToken } from "@/src/lib/tokens";
import { sendVerificationEmail } from "@/src/lib/mail";

export const loginAction = async (values: zod.infer<typeof LoginSchema>) => {
  const validatedFieldValues = LoginSchema.safeParse(values);

  if (!validatedFieldValues.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFieldValues.data;

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
