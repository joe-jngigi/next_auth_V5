"use server";
import { getUserByEmail } from "@/src/data-queries/user_data";

import * as zod from "zod";
import { ResetPasswordSchema } from "@/src/schemas";
import { generatePasswordResetToken } from "@/src/lib/tokens";
import { sendPasswordResetEmail } from "../lib/mail";

/**
 * This is a function used to send an email used for the reset of the password
 * @serverAction
 * @param email is the email from the user
 * @returns
 */
export const resetPassword = async (
  value: zod.infer<typeof ResetPasswordSchema>
) => {
  /**
   * The process of sending data to the database starts with validation
   * We pass it to the zod schema for email resetPassword
   */
  const validatedUserEmail = ResetPasswordSchema.safeParse(value);

  if (!validatedUserEmail.success) {
    return { error: "The email input is wrong" };
  }

  /**
   * We can then check whether the user exists
   * We firts destructure the email for the validated data
   */
  const { email } = validatedUserEmail.data;
  const checkUserExist = await getUserByEmail(email);

  if (!checkUserExist) {
    return {
      error: "User with this email does not exist! Sign Up to continue",
    };
  }

  // TODO: generateVerificationToken and send Email

  const getPasswordToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(getPasswordToken.email, getPasswordToken.token);

  return { success: "Reset Email sent!" };
};
