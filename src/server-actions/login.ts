"use server";

import * as zod from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import { LoginSchema } from "@/src/schemas/index";
import { getUserByEmail } from "../data/user_data";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const loginAction = async (values: zod.infer<typeof LoginSchema>) => {
  const validatedFieldValues = LoginSchema.safeParse(values);

  if (!validatedFieldValues.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFieldValues.data;

  try {
    await signIn("credentials", {
      // TODO redirectTo: callbacks || DEFAULT_LOGIN_REDIRECT
      redirectTo: DEFAULT_LOGIN_REDIRECT,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        case "EmailSignInError":
          return { info: "Email does not exist" };
        default:
          return { info: "something went wrong" };
      }
    }

    throw error;
  }

  // console.log("validatedFieldValues", validatedFieldValues);
  return { success: "Email Sent" };
};
