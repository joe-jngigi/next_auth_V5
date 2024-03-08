"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormField,
} from "@/src/components/ui/form";
import { Input } from "@/src";
import { toast } from "sonner";
import { Button, Separator } from "@/src";
import { settingsActions } from "@/src/server-actions/settings";
import { settingsSchemas } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentUser } from "@/src/hooks/user_current_user";

export const SettingsMainpanel = () => {
  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();
  const dateToday = new Date();

  const form = useForm<zod.infer<typeof settingsSchemas>>({
    resolver: zodResolver(settingsSchemas),
    defaultValues: {
      name: user.session?.name || undefined,
      email: user.session?.email || undefined,
      password: undefined,
      newPassword: undefined,
    },
  });

  const onSubmit = (values: zod.infer<typeof settingsSchemas>) => {
    startTransition(() => {
      console.log("Check Settings submit");
    });
  };

  return (
    <div id="#start" className="overflow-y-auto pl-2">
      <div className="mb-2">
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground text-xs">
          Change account values in the database
        </p>
      </div>
      <Separator className="dark:bg-slate-800 bg-gray-300" />

      <div className="my-3">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-5">
              {/* User Account */}
              <h2 className="mb-3 font-semibold text-gray-500">User Account</h2>
              <div className=" flex flex-row gap-5 mb-5">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="text-sm w-[400px]">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          className="dark:border-slate-800 w-full"
                          {...field}
                          placeholder="Joseph Ngigi"
                          disabled={isPending}
                          type="text"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="text-sm w-[400px]">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="dark:border-slate-800 w-full"
                          {...field}
                          placeholder="josephngigi775@gmail.com"
                          disabled={isPending}
                          type="email"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="dark:bg-slate-800 bg-gray-300 " />

              {/* Security */}
              <h2 className="mb-3 font-semibold text-gray-500">
                Password and Security
              </h2>
              <div className="flex flex-row gap-5 mb-5"></div>
            </div>

            <Separator className="dark:bg-slate-800 bg-gray-300 " />

            <div></div>

            <Button disabled={isPending} type="submit" className="variant_btn">
              Save Changes
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
