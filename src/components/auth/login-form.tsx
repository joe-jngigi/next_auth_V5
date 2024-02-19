import React from "react";
import { CardWrapper } from "@/src";

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Welcome, Let's Authenticate you"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account?"
      showSocial = {true}
    >
      Login Form!
    </CardWrapper>
  );
};
