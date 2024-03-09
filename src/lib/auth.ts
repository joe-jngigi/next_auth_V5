"use server";
import { auth } from "@/auth";

export const ServerUser = async () => {
  const session = await auth();

  return session?.user;
};

export const newUserRole = async () => {
  const session = await auth();

  return session?.user?.role;
};
