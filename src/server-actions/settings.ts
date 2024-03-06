"use server";

import * as zod from "zod";
import { settingsSchemas } from "@/src/schemas";

import {  getUserById } from "../data-queries/user_data";
import { data_base } from "../lib/prisma-db";
import { useServerUser } from "../lib/auth";

export const settingsActions = async (
  values: zod.infer<typeof settingsSchemas>
) => {
  const validatedValues = settingsSchemas.safeParse(values);
  if (!validatedValues.success) {
    return { error: "The value input is invalid" };
  }

  const user = await useServerUser();
  if (!user) {
    return { error: "Session not available!" };
  }

  const userDatabase = await getUserById(user.id);
  if (!userDatabase) {
    return { error: "The user is not logged in" };
  }

  await data_base.user.update({
    where: { id: userDatabase.id },
    data: {
      ...validatedValues.data,
    },
  });
  return { success: "Settings Updated Successfully" };
};
