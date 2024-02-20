"use server";

import * as zod from "zod";
import { RegisterSchema } from "@/src/schemas/index";

export const registerAction = async (values: zod.infer<typeof RegisterSchema>) => {

    const validateRegisterValues = RegisterSchema.safeParse(values)

    if (!validateRegisterValues) {
        return { error: "Invalid inputs" };
    }

    return { success: "Registered Successfully, Confirm Email " };
    
}