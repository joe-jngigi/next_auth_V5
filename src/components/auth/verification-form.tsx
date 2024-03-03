"use client";

import React, { useCallback, useEffect, useState } from "react";
import * as Spinners from "react-spinners";
import { toast } from "react-toastify";

import { CardWrapper } from "@/src";
import { useSearchParams } from "next/navigation";
import { verificationOfToken } from "@/src/server-actions/new-verification";

export const VerificationForm = () => {
  const searchParams = useSearchParams();
  const verifyUserToken = searchParams.get("token");

  const [error, setError] = useState<string | null>();
  const [success, setSuccess] = useState<string | null>();

  /**
   * This function will check whether the user token has expired
   * This will prevent this function to be re-rendered
   */
  const onSubmit = useCallback(() => {
    if (success && error) {
      return;
    }
    if (!verifyUserToken) {
      toast.error("The token is missing!", { theme: "colored" });
      return;
    }
    verificationOfToken(verifyUserToken)
      .then((data) => {
        if (data.success) {
          setSuccess(data.success);
          toast.success(data.success, { theme: "colored" });
        }

        if (data.error) {
          setError(data.error);
          toast.error(data.error, { theme: "colored" });
        }
      })
      .catch(() => {
        toast.error("Something Went wrong!", { theme: "colored" });
      });
  }, [verifyUserToken, error, success]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
      headerTitle="Next Auth | Email confirmation"
      headerLabel="Confirm your email"
    >
      <div className="flex-c-center flex-col gap-10">
        <Spinners.RingLoader />
        {!success && !error && <Spinners.BarLoader />}
      </div>
    </CardWrapper>
  );
};
