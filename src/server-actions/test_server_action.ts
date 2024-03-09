"use server"
import { UserRole } from "@prisma/client";
import { newUserRole } from "@/src/lib/auth";

export const adminServerAction = async () => {
  const role = await newUserRole();

  if (role !== UserRole.ADMIN) {
    return { error: "User is not Admin!" };
  }
  return { success: "User is Allowed. Test for server action successful" };
};
