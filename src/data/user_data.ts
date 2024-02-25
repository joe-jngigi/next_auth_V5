import { data_base } from "@/src/lib/prisma-db";

export const getUserByEmail = async (email: string) => {
  try {
    const user_email = await data_base.user.findUnique({
      where: {
        email,
      },
    });
    return user_email;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user_id = await data_base.user.findUnique({
      where: {
        id,
      },
    });
    return user_id;
  } catch (error) {
    return null;
  }
};
