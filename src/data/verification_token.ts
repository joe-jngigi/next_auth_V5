import { data_base } from "../lib/prisma-db";

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
