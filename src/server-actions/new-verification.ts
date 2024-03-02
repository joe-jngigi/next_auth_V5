"use server";

import { getVerificationTokenByToken } from "@/src/data/verification_token";

export const verificationOfToken = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);
    
    if (!existingToken) {
        return {error: "User Cannot be verified, The token does not exist!"}
    }
};
