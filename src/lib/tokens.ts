import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "../data/verification_token";
import { data_base } from "@/src/lib/prisma-db";

/**
 * This function is used to generate a verification_token and save in to the database
 * @param email 
 * @returns {typeof createVerificationToken}
 */
export const generateVerificationToken = async (email: string ) => {
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
  console.log({ expiryTime: expiryTime });

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
