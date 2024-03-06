"use server"
import { UserRole } from "@prisma/client";
import { useUserRole } from "@/src/lib/auth";

export const adminServerAction = async () => {
  const role = await useUserRole();

  if (role !== UserRole.ADMIN) {
    return { error: "User is not Admin!" };
  }
  return { success: "User is Allowed. Test for server action successful" };
};
