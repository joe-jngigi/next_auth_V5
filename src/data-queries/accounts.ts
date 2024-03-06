import { data_base } from "@/src/lib/prisma-db";

export const getUserAccountById = async (userId: string) => {
  try {
    const userAccount = await data_base.account.findFirst({
      where: { userId },
    });
      return userAccount
  } catch (error) {
    return { error: "User account not found" };
  }
};
