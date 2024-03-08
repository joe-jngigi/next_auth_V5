"use server";

import * as zod from "zod";
import { hash } from "bcryptjs";
import { NewPasswordSchema } from "@/src/schemas";
import { getResetpasswordTokenByToken } from "@/src/data-queries/password_reset_token";

import { getUserByEmail } from "@/src/data-queries/user_data";
import { data_base } from "@/src/lib/prisma-db";

export const newPasswordAction = async (
  values: zod.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  // password: string, token: string

  if (!token) {
    return { error: "The token is Missing" };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "The password field is invalid" };
  }

  const { password } = validatedFields.data;
  const hashedPassword = await hash(password, 10);
  const existingToken = await getResetpasswordTokenByToken(token);


  if (!existingToken) {
    return {
      info: "The token does not Exist! Use the recent reset password link",
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "The User does not exist" };
  }
  await data_base.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await data_base.passwordVerificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password Updated!" };
};

// $2a$10$igLphpK6NVQmtVodk5dTyus.fA77g6k2zcI3msxRV1 / ar.kDaYhMS;
