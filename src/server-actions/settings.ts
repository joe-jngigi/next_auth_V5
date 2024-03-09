"use server";

import * as zod from "zod";
import { settingsSchemas } from "@/src/schemas";

import { getUserByEmail, getUserById } from "@/src/data-queries/user_data";
import { data_base } from "@/src/lib/prisma-db";
import { ServerUser } from "@/src/lib/auth";

import { unstable_update } from "@/auth";

import { generateVerificationToken } from "@/src/lib/tokens";
import { sendVerificationEmail } from "@/src/lib/mail";

import { compare, hash } from "bcryptjs";

export const settingsActions = async (
  values: zod.infer<typeof settingsSchemas>
) => {
  const validatedValues = settingsSchemas.safeParse(values);

  if (!validatedValues.success) {
    return { error: "The value input is invalid" };
  }

  const user = await ServerUser();
  if (!user) {
    return { error: "Session not available!" };
  }

  const userDatabase = await getUserById(user.id);
  if (!userDatabase) {
    return { error: "The user is not logged in" };
  }

  if (user.isOAuth) {
    validatedValues.data.email = undefined;
    validatedValues.data.password = undefined;
    validatedValues.data.newPassword = undefined;
    validatedValues.data.isTwoFactorEnabled = undefined;

    return;
  }

  if (validatedValues.data.email === undefined) {
    return { info: "Email is undefined" };
  }

  /**
   * Check if the user exists and then check if the id of the signed in user is the same
   *
   * If the userid of the mail being changed is not the same we get an error
   * */
  const existingUser = await getUserByEmail(validatedValues.data.email);
  if (validatedValues.data.email && validatedValues.data.email !== user.email) {
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email is already taken!" };
    }

    /**
     *Generate an email verficationToken and send it to the email being changed to.
     */
    const verficationToken = await generateVerificationToken(
      validatedValues.data.email
    );
    await sendVerificationEmail(
      validatedValues.data.email,
      verficationToken.token
    );

    return { success: "Verification email sent!" };
  }

  if (
    validatedValues.data.password &&
    validatedValues.data.newPassword &&
    userDatabase.password
  ) {
    const hashedPassword = await hash(validatedValues.data.newPassword, 10);
    const passwordMatch = await compare(
      validatedValues.data.password,
      userDatabase.password
    );

    if (!passwordMatch) {
      return { error: "Current Passwords Do not match" };
    }

    validatedValues.data.password = hashedPassword;
    validatedValues.data.newPassword = undefined;
  }

  await data_base.user.update({
    where: { id: userDatabase.id },
    data: {
      ...validatedValues.data,
    },
  });

  unstable_update({
    user: {
      email: userDatabase.email,
      id: userDatabase.id,
      image: userDatabase.image,
      name: userDatabase.name,
      role: userDatabase.role,
      twoFactorAuth: userDatabase.isTwoFactorEnabled,
    },
  });
  return { success: "Settings Updated Successfully" };
};
