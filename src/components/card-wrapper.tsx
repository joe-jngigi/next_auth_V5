"use client";

import React from "react";
import { TLAYOUT_CARDWRAPPER_EXTENDS } from "@/src/types.ts/types";
import {
  AuthHeader,
  SocialInfo,
  LinkButton,

  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/index";

const CardWrapper: React.FC<TLAYOUT_CARDWRAPPER_EXTENDS> = ({
  children,
  backButtonHref,
  backButtonLabel,
  headerLabel,
  showSocial,
}) => {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <AuthHeader label={headerLabel} />
      </CardHeader>

      <CardContent>{children}</CardContent>

      {showSocial && (
        <CardFooter>
          <SocialInfo />
        </CardFooter>
      )}

      <CardFooter>
        <LinkButton label = {backButtonLabel} href = {backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
