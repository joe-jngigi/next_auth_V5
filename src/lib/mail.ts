import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_URL

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
  const confirmationLink = `${domain}/auth/new-verification?token=${token}`;
  const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />

        <title>Email Template</title>
        <style>
        /* Styles for the email */
        body {
            font-family: "Poppins", sans-serif;
            font-weight: 400;
            font-style: normal;
            font-family: Arial, sans-serif;
            background-color: #242424;
            color: white;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 8px;
        }
        h1 {
            text-align: center;
        }
        p {
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #00ff80;
            color: black;
            text-decoration: none;
            border-radius: 5px;
        }
        </style>
    </head>
    <body>
        <div class="container">
        <h1>Welcome to Next-Auth V5</h1>
        <p>Please confirm your email by clicking here!</p>
        <p>
            <a
            class="button"
            href="${confirmationLink}"
            >Confirm your email</a
            >
        </p>
        </div>
    </body>
    </html>

    `;

  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Next-Auth | Confirm you Email",
    html: emailHtml,
  });
};

/**
 * This function will be used to send password reset link email to the user.
 * @param email
 * @param token
 */
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmationLink = `${domain}/auth/new-password?token=${token}`;
  const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"  />

        <title>Email Template</title>
        <style>
        /* Styles for the email */
        body {
            font-family: "Poppins", sans-serif;
            font-weight: 400;
            font-style: normal;
            font-family: Arial, sans-serif;
            background-color: #242424;
            color: white;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 8px;
        }
        h1 {
            text-align: center;
        }
        p {
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #00ff80;
            color: black;
            text-decoration: none;
            border-radius: 5px;
        }
        </style>
    </head>
    <body>
        <div class="container">
        <h1>Welcome to Next-Auth V5</h1>
        <p>You Recieved this email because you requested to reset your password.</p>
        <p>
            <a
            class="button"
            href="${confirmationLink}"
            >Click Here to Reset your Password</a
            >
        </p>
        </div>
    </body>
    </html>

    `;

  await resend.emails.send({
    from: "Joe_J | 2FA | <onboarding@resend.dev>",
    to: email,
    subject: "Next-Auth | 2 Factor Authentication",
    html: emailHtml,
  });
};

/**
 * After the user saves the 2FA to the database, we will then take and;
 * this will be used to send an email with the generated 2FA code
 * @param email 
 * @param token 
 */
export const sendTwoFAAuthToken = async (email: string, token: string) => {
  const emailHtml = `<!DOCTYPE html>
    <html lang="en">
    <head>
        
        <title>Email Template</title>
        <style>
        /* Styles for the email */

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 8px;
        }
        h1 {
            padding: 2px;
            border-radius: 8px;
            background-color: black;
            text-align: center;
            color: #00ff80;
        }
        p {
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        </style>
    </head>
    <body>
        <div class="container">
        <h1>Welcome to Next-Auth V5</h1>
        <p>You Recieved this email because you requested a 2 Factor Authentication</p>
        <h1>${token}</h1>
        
        </div>
    </body>
    </html>`;
  await resend.emails.send({
    from: "Joe_J | <onboarding@resend.dev>",
    to: email,
    subject: "Next-Auth | Reset your Password",
    html: emailHtml,
  });
};
