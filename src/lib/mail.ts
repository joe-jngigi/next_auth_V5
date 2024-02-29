import { Resend } from "resend";
import { EmailTemplate } from "@/src";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * This function is used to send verification email to the user signing in
 *
 * in this project I am using my own email, since I don't have a domain yet
 *
 * @param email gets the user registering email
 * @param token the token is the verificationToken sent by the user
 */

export const sendVerificationEmail = async (email: string, token: string) => {
    
  /**
   * This is the confirmation link which will be sent to the user.
   * This link will create a new verification page, which will be used to check
   *
   * @token expiration, and whether it exists and change the users email
   */
  const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  

    console.log(`${EmailTemplate}`);
    
//   await resend.emails.send({
//     from: "Acme <onboarding@resend.dev>",
//     to: email,
//     subject: "Next-Auth | Confirm you Email",
//     html: `${EmailTemplate}`
//   });
};
