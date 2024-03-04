import { data_base } from "@/src/lib/prisma-db";

/**
 * The function is used to query datt from the database using the unique token:::
 * {twoFAtoken}
 * @param twoFAtoken Is the token received from the user
 * @returns {twoFactorToken}
 */
export const getTwoFactorTokenByToken = async (twoFAtoken: string) => {
  try {
    const twoFactorToken = await data_base.twoFactorAuthToken.findUnique({
      where: { token: twoFAtoken },
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};

/**
 * The function is used to query datt from the database using the email
 * - {email}
 * @param email Is the email received from the user
 * @returns {twoFactorToken}
 */
export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await data_base.twoFactorAuthToken.findFirst({
      where: {email },
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};


