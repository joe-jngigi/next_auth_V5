import { data_base } from "@/src/lib/prisma-db";

/**
 *
 * @param token is the unique tokenValue we get for searching the database in the passwordVerificationToken table
 *
 * We will return the object value according th the token
 * @object {passwordResetToken }
 *
 */
export const getResetpasswordTokenByToken = async (token: string) => {
  try {
    const passwordResetToken =
      await data_base.passwordVerificationToken.findUnique({
        where: { token },
      });

    return passwordResetToken;
  } catch {
    return null;
  }
};

/**
 *
 * @param email is the unique tokenValue we get for searching the database in the passwordVerificationToken table
 *
 * We will return the object value according th the email
 * @object {passwordResetToken }
 *
 */
export const getResetpasswordTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken =
      await data_base.passwordVerificationToken.findFirst({
        where: { email },
      });

    return passwordResetToken;
  } catch {
    return null;
  }
};
