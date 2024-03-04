import { v4 as uuidv4 } from "uuid";
import { data_base } from "@/src/lib/prisma-db";

import crypto from "crypto";

import { getVerificationTokenByEmail } from "@/src/data-queries/verification_token";
import { getResetpasswordTokenByEmail } from "@/src/data-queries/password_reset_token";
import { getTwoFactorTokenByEmail } from "@/src/data-queries/two_factor_auth_token";

/**
 * This function is used to generate an email verification_token and save in to the database
 * @param email
 *
 * @returns {createPasswordResetToken}
 * @type {id: string; email: string; token: string; expires: Date;}
 */
export const generateVerificationToken = async (email: string) => {
  /**
   * How this works is that it is generating a string of unique id
   *  @function uuid()
   * @type {string}
   */
  const token: string = uuidv4();

  /**
   * Get the current date and time and Add 1 hour to the current time
   * @const  const expiryTime = currentDate.setHours(currentDate.getHours() + 1);
   */
  const expiryTime = new Date(new Date().getTime() + 3600 * 1000);
  // console.log({ expiryTime: expiryTime });

  /**
   * We then check an existingToken already sent for that email in the database.
   * If that emailToken exist, we will delete the whole entity in the database.
   *
   * This will allow us not to have the user multiple verification codes.
   * As when they create a new one,
   * It deletes where the id is the same as the {existingToken.id} returned from the
   * @function getVerificationTokenByEmail()
   */
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await data_base.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const createVerificationToken = await data_base.verificationToken.create({
    data: {
      email,
      token,
      expires: expiryTime,
    },
  });

  return createVerificationToken;
};

// ======================================================================================================

/**
 *
 * @param email
 */
export const generatePasswordResetToken = async (email: string) => {
  const token: string = uuidv4();

  /**
   * Get the current date and time and Add 1 hour to the current time
   */
  const expiryTime = new Date(new Date().getTime() + 3600 * 1000);
  // console.log({ expiryTime: expiryTime });

  /**
   * We then check an existingToken already sent for that email in the database.
   * If that emailToken exist, we will delete the whole entity in the database.
   * @function getResetpasswordTokenByEmail()
   */
  const existingToken = await getResetpasswordTokenByEmail(email);

  if (existingToken) {
    await data_base.passwordVerificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  // ======================================================================================================

  /**
   * This fuction will then create a token, that will return an obect with
   * @type {id: string; email: string; token: string; expires: Date;}
   */
  const createPasswordResetToken =
    await data_base.passwordVerificationToken.create({
      data: {
        email,
        expires: expiryTime,
        token,
      },
    });

  return createPasswordResetToken;
};

/**
 * This functions generates a 2FA code that will expire after one hour
 * It is then saved to the database
 *
 * @param email from the user
 * @returns {twoFAuthToken}
 */
export const generateTwoFactorToken = async (email: string) => {
  const twoFAtoken = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  // Delete if there is an existing token for the user=email
  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await data_base.twoFactorAuthToken.delete({
      where: { id: existingToken.id },
    });
  }

  const twoFAuthToken = await data_base.twoFactorAuthToken.create({
    data: {
      email,
      expires,
      token: twoFAtoken,
    },
  });

  return twoFAuthToken;
};
