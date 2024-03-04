import { data_base } from "@/src/lib/prisma-db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation =
      await data_base.twoFactorConfirmation.findUnique({
        where: { userId },
      });

      return twoFactorConfirmation
  } catch {
    return null;
  }
};
