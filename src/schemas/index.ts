import { UserRole } from "@prisma/client";
import * as zod from "zod";

export const settingsSchemas = zod
  .object({
    name: zod.optional(zod.string()),
    email: zod.optional(
      zod.string().email({ message: "Input the right Email" })
    ),

    isTwoFactorEnabled: zod.optional(zod.boolean()),
    role: zod.enum([UserRole.ADMIN, UserRole.USER]),

    password: zod.optional(zod.string().min(4)),
    newPassword: zod.optional(zod.string().min(4)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    { message: "New password is required!", path: ["newPassword"] }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    { message: "Password Field is required!", path: ["password"] }
  );

/**Login schema with
 * @values {twoFAcode?, email, password}
 */
export const LoginSchema = zod.object({
  twoFAcode: zod.optional(zod.string()),
  email: zod.string().email(),
  password: zod.string().min(3, {
    message: "Input a password of 4 or more characters",
  }),
});

export const NewPasswordSchema = zod.object({
  password: zod.string().min(4, {
    message: "Input a password of 4 or more characters",
  }),
});

export const ResetPasswordSchema = zod.object({
  email: zod.string().email(),
});

export const RegisterSchema = zod.object({
  email: zod.string().email({
    message: "Email is Required",
  }),
  password: zod.string().min(4, {
    message: "Input a password of 4 or more characters",
  }),
  name: zod.string().min(2, {
    message: "Name is Required",
  }),
});
