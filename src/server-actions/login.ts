"use server";

import * as zod from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import { LoginSchema } from "@/src/schemas/index";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "../data/user_data";

export const loginAction = async (values: zod.infer<typeof LoginSchema>) => {
  const validatedFieldValues = LoginSchema.safeParse(values);

  if (!validatedFieldValues.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFieldValues.data;

  const checUser = await getUserByEmail(email)
  if (!checUser) {
    return {error: "User does not exist....."}
  }
   if (!checUser.password) {
    return {info: "signIn with Google or Github"}
   }

  try {
    await signIn("credentials", {
      // TODO redirectTo: callbacks || DEFAULT_LOGIN_REDIRECT
      redirectTo: DEFAULT_LOGIN_REDIRECT,
      email,
      password,
    });
    return { success: "Email Sent" };
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
