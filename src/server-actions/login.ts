"use server"

import * as zod from "zod";
import { LoginSchema } from "@/src/schemas/index";

export const loginAction = async (values: zod.infer<typeof LoginSchema>) => {

    const validatedFieldValues = LoginSchema.safeParse(values)

    if (!validatedFieldValues) {
        return { error: "Invalid fields" }
    }

    // console.log("validatedFieldValues", validatedFieldValues);
    return { success: "Email Sent" }
    
}