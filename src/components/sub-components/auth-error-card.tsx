import React from "react";
import { AuthHeader } from "./auth_header";

import { Card, CardHeader, CardFooter, LinkButton } from "@/src";

export const AuthErrorCard = () => {
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <AuthHeader title="Next Auth" label="Oops, something went wrong" />
      </CardHeader>

      <CardFooter>
        <LinkButton href="/auth/login" label="Back to login" />
      </CardFooter>
    </Card>
  );
};
