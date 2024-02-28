import { data_base } from "../lib/prisma-db";

/**
 * This fucntion is used to fetch an entity of the existing data in the using the token passed
 * @param token
 * @returns {getTokenByToken}
 *
 * the returned value contains an object of:
 * @type {id: string; email: string; token: string; expires: Date;}
 */
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const getTokenByToken = await data_base.verificationToken.findUnique({
      where: { token },
    });

    return getTokenByToken;
  } catch (error) {
    return null;
  }
};

/**
 * This fucntion is used to fetch an entity of the existing data in the using the email passed
 * @param email
 * @returns {getByEmail}
 * the returned value contains an object of:
 * @type {id: string; email: string; token: string; expires: Date;}
 */
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const getTokenByEmail = await data_base.verificationToken.findFirst({
      where: { email },
    });

    return getTokenByEmail;
  } catch (error) {
    return null;
  }
};
