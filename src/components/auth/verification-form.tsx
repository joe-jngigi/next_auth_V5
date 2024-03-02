"use client";

import React, { useCallback, useEffect } from "react";
import * as Spinners from "react-spinners";
import { CardWrapper } from "@/src";
import { useSearchParams } from "next/navigation";

export const VerificationForm = () => {
  const searchParams = useSearchParams();
  const verifyUserToken = searchParams.get("token");

  /**
   * This function will check whether the user token has expired
   * This will prevent this function to be re-rendered
   */
  const onSubmit = useCallback(() => {
    console.log(verifyUserToken);
    
  }, [verifyUserToken]);

  useEffect(() => {
    onSubmit()
  }, [onSubmit])
  
  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
      headerTitle="Next Auth | Email confirmation"
      headerLabel="Confirm your email"
    >
      <div className="flex-c-center gap-10">
        <Spinners.RingLoader />
      </div>
    </CardWrapper>
  );
};
