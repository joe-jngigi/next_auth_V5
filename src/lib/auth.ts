"use server"
import { auth } from "@/auth";

export const useServerUser = async () => {
  const session = await auth();

  return session?.user;
};

export const useUserRole = async () => {
  const session = await auth();

  return session?.user?.role;
};