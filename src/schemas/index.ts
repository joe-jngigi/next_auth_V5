import * as zod from "zod"

export const LoginSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(2, {
        message: "Input a nice Password that I cannot guess"
    })
})

export const RegisterSchema = zod.object({
  email: zod.string().email({
    message: "Email is Required",
  }),
  password: zod.string().min(4, {
    message: "Input a password more of 4 or more characters",
  }),
  name: zod.string().min(3, {
    message: "Name is Required",
  }),
});
