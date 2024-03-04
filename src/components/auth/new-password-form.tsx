"use client";

import React, { useTransition } from "react";

import * as ShadcnForm from "@/src/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

import { NewPasswordSchema } from "@/src/schemas/index";
import { Button, CardWrapper, Input } from "@/src";

import { T_VALIDATE_DATA_TYPES } from "@/src/types.ts/types";
import { newPasswordAction } from "@/src/server-actions/new-password";

export const ResetPasswordForm = () => {
  const [isPending, setTransition] = useTransition();
  const newParams = useSearchParams();
  const token = newParams.get("token");
  
  // const form
  const form = useForm<zod.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  // This will spread a set of functions from the useForm
  /**
   * @param console.log({ ...form })} ;
   */

  const onSubmit = (values: zod.infer<typeof NewPasswordSchema>) => {
    setTransition(() => {
      newPasswordAction(values, token).then((data: T_VALIDATE_DATA_TYPES) => {
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
      headerTitle="next Auth | New Password"
      headerLabel="Enter your new Password"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <ShadcnForm.Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 w-full">
            {/* password Field  */}
            <ShadcnForm.FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <ShadcnForm.FormItem>
                  <ShadcnForm.FormLabel>Password</ShadcnForm.FormLabel>
                  <ShadcnForm.FormControl>
                    <Input
                      autoComplete="current-password"
                      disabled={isPending}
                      {...field}
                      placeholder="Password"
                      type="password"
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
            Reset Your Password
          </Button>
        </form>
      </ShadcnForm.Form>
    </CardWrapper>
  );
};
