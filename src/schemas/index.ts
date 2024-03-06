import * as zod from "zod";

export const settingsSchemas = zod.object({
  name: zod.optional(zod.string()),
  email: zod.optional(zod.string()),
  password: zod.optional(zod.string()),
});

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
  name: zod.string().min(3, {
    message: "Name is Required",
  }),
});
