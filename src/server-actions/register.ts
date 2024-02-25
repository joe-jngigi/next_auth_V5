"use server";

import * as zod from "zod";
import { hash } from "bcryptjs";

import { RegisterSchema } from "@/src/schemas/index";
import { data_base } from "@/src/lib/prisma-db";
import { getUserByEmail } from "@/src/data/user_data";

export const registerAction = async (
  values: zod.infer<typeof RegisterSchema>
) => {
  const validateRegisterValues = RegisterSchema.safeParse(values);

  if (!validateRegisterValues.success) {
    return { error: "Please check your credential details" };
  }

  const { email, password, name } = validateRegisterValues.data;

  const hashedPassword = await hash(password, 10);

  const existing_user = await getUserByEmail(email);
  if (existing_user) {
    return { info: "User Already exists" };
  }

  await data_base.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  // TODO send a verification email later

  return { success: "Registered Successfully, Confirm Email " };
};
