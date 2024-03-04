"use server";

import { getVerificationTokenByToken } from "@/src/data-queries/verification_token";
import { getUserByEmail } from "@/src/data-queries/user_data";
import { data_base } from "@/src/lib/prisma-db";

/**
 * This function is used to check whether the token is expired, and also used to update the database.
 * It update the user **emailVerified** with the newDate of when it has been verified
 * @param token is recieved from the verification token in the new-verification form
 * @returns
 */
export const verificationOfToken = async (token: string) => {
  /**
   *
   *This is a variable that get the data object of the user with the same token as the token on the useParams.
   *We then check if the token exists, if not we return an error
   * @type {id: string; email: string; token: string; expires: Date; }
   */
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return { error: "User Cannot be verified, The token does not exist!" };
  }

  /**
   *This one takes the date from the existing date of the time when it will expires.
   *It then checks whether the time is less that the current date
   */
  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "The token has expired" };
  }

  /**
   * This will check whether the user email of the token, is the same as the email in the token.
   */
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "User Email does not exist" };
  }

  await data_base.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await data_base.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified successfully!" };
};
