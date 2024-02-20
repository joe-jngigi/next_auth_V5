"use client";

import React, { useTransition } from "react";

import * as ShadcnForm from "@/src/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { toast } from "react-toastify";

import { RegisterSchema } from "@/src/schemas/index";
import { Button, CardWrapper, Input } from "@/src";

import { T_VALIDATE_DATA_TYPES } from "@/src/types.ts/types";
import { registerAction } from "@/src/server-actions/register";

export const RegisterForm = () => {
  const [isPending, setTransition] = useTransition();

  // const form
  const form = useForm<zod.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // This will spread a set of functions from the useForm
  /**
   * @param console.log({ ...form })} ;
   */

  const onSubmit = (values: zod.infer<typeof RegisterSchema>) => {
    setTransition(() => {
      registerAction(values).then((data: T_VALIDATE_DATA_TYPES) => {
        toast.error(data.error, { theme: "colored" });
        toast.success(data.success, { theme: "colored" });
      });
      //  toast.success("User Test", {theme: "colored"});
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome, Let's Create an Account"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account?"
      showSocial={true}
    >
      <ShadcnForm.Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 w-full">
            {/* Name Field */}
            <ShadcnForm.FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <ShadcnForm.FormItem>
                  <ShadcnForm.FormLabel>Name</ShadcnForm.FormLabel>
                  <ShadcnForm.FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="Joseph Ngigi"
                      type="text"
                      className="drop-shadow-md"
                    />
                  </ShadcnForm.FormControl>
                  <ShadcnForm.FormMessage />
                </ShadcnForm.FormItem>
              )}
            />
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
            Create An Account
          </Button>
        </form>
      </ShadcnForm.Form>
    </CardWrapper>
  );
};
