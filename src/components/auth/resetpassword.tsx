"use client";

import React, { useTransition } from "react";

import * as ShadcnForm from "@/src/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { toast } from "react-toastify";

import { ResetPasswordSchema } from "@/src/schemas/index";
import { Button, CardWrapper, Input } from "@/src";

import { T_VALIDATE_DATA_TYPES } from "@/src/types.ts/types";
import { resetPassword } from "@/src/server-actions/resetpassword";

export const ResetPassword = () => {
  const [isPending, setTransition] = useTransition();

  // const form
  const form = useForm<zod.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // This will spread a set of functions from the useForm
  /**
   * @param console.log({ ...form })} ;
   */

  const onSubmit = (values: zod.infer<typeof ResetPasswordSchema>) => {
    setTransition(() => {
      resetPassword(values).then((data: T_VALIDATE_DATA_TYPES) => {
        if (data) {
          if (data.error) {
            toast.error(data.error, { theme: "colored" });
            return;
          }
          if (data.success) {
            toast.success(data.success, { theme: "colored" });
            return;
          }
          toast.info(data.info, { theme: "colored" });
          return;
        }

        // toast.error(data.error, { theme: "colored" });
      });
    });
  };

  return (
    <CardWrapper
      headerTitle="next Auth | Reset Password"
      headerLabel="Forgot your password?"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <ShadcnForm.Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 w-full">
            {/* Email Field */}
            <ShadcnForm.FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <ShadcnForm.FormItem>
                  <ShadcnForm.FormLabel>Email</ShadcnForm.FormLabel>
                  <ShadcnForm.FormControl>
                    <Input
                      autoComplete="username webauthn"
                      disabled={isPending}
                      {...field}
                      placeholder="josephngigi775@gmail.com"
                      type="email"
                      className="drop-shadow-md"
                    />
                  </ShadcnForm.FormControl>
                  <ShadcnForm.FormMessage />
                </ShadcnForm.FormItem>
              )}
            />
          </div>

          <Button
            disabled={isPending}
            type="submit"
            className="variant_btn w-full"
          >
            Send Reset Email
          </Button>
        </form>
      </ShadcnForm.Form>
    </CardWrapper>
  );
};
