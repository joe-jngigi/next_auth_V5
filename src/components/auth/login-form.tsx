"use client";

import React, { useState, useTransition } from "react";

import * as ShadcnForm from "@/src/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { toast } from "react-toastify";

import { LoginSchema } from "@/src/schemas/index";
import { Button, CardWrapper, Input } from "@/src";
import { loginAction } from "@/src/server-actions/login";
import { T_VALIDATE_DATA_TYPES } from "@/src/types.ts/types";
import { useSearchParams } from "next/navigation";

export const LoginForm = () => {
  const [isPending, setTransition] = useTransition();

  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");

  // const form
  const form = useForm<zod.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // This will spread a set of functions from the useForm
  /**
   * @param console.log({ ...form })} ;
   */

  const onSubmit = (values: zod.infer<typeof LoginSchema>) => {
    setTransition(() => {
      loginAction(values).then((data: T_VALIDATE_DATA_TYPES) => {
        if (data) {
          if (data.error) {
            toast.error(data.error, { theme: "colored" });
            return;
          }
          toast.info(data.info, { theme: "colored" });
          return;
        }
        if (urlError === "OAuthAccountNotLinked") {
          toast.error("Email Already in use with another provider", {
            theme: "colored",
          });
        }
        toast.success("Logged in successfully", { theme: "colored" });
        // toast.error(data.error, { theme: "colored" });
      });
      //
    });
  };

  return (
    <CardWrapper
      headerTitle="next Auth | Login"
      headerLabel="Welcome, Let's Authenticate you"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account?"
      showSocial={true}
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

            {/* password Field  */}
            <ShadcnForm.FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <ShadcnForm.FormItem>
                  <ShadcnForm.FormLabel>Password</ShadcnForm.FormLabel>
                  <ShadcnForm.FormControl>
                    <Input
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
            Login
          </Button>
        </form>
      </ShadcnForm.Form>
    </CardWrapper>
  );
};
