"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import * as shadCnForm from "@/src/components/ui/form";
import { Input } from "@/src";
import { toast } from "sonner";
import { Button, Separator, shadCnSelect } from "@/src";

import { settingsActions } from "@/src/server-actions/settings";
import { settingsSchemas } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentUser } from "@/src/hooks/user_current_user";

export const SettingsMainpanel = () => {
  const [isPending, setUseTransition] = useTransition();
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

  const onSubmitUser = async (values: zod.infer<typeof settingsSchemas>) => {
    setUseTransition(() => {
      settingsActions(values).then((data) => {
        if (data.success) {
          toast.success("Name Change successful", {
            dismissible: true,
            description: <>{dateToday.toDateString()}</>,
            cancel: {
              label: "Cancel",
              onClick: () => toast.info("Cancelled"),
            },
          });
        }

        if (data.error) {
          toast.success("Something went wrong!", {
            dismissible: true,
            description: <>{dateToday.toDateString()}</>,
            cancel: {
              label: "Cancel",
              onClick: () => toast.info("Cancelled"),
            },
          });
        }
      });
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
        <shadCnForm.Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmitUser)}
          >
            <div className="space-y-5">
              {/* User Account */}
              <h2 className="mb-3 font-semibold text-gray-500">User Account</h2>
              <div className=" flex flex-row gap-5 mb-5">
                {/* Name Field */}
                <shadCnForm.FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <shadCnForm.FormItem className="text-sm w-[400px]">
                      <shadCnForm.FormLabel>Name</shadCnForm.FormLabel>
                      <shadCnForm.FormControl>
                        <Input
                          className="dark:border-slate-800 w-full"
                          {...field}
                          placeholder="Joseph Ngigi"
                          disabled={isPending}
                          type="text"
                        />
                      </shadCnForm.FormControl>
                    </shadCnForm.FormItem>
                  )}
                />

                {/* Email Field */}
                <shadCnForm.FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <shadCnForm.FormItem className="text-sm w-[400px]">
                      <shadCnForm.FormLabel>Email</shadCnForm.FormLabel>
                      <shadCnForm.FormControl>
                        <Input
                          className="dark:border-slate-800 w-full"
                          {...field}
                          placeholder="josephngigi775@gmail.com"
                          disabled={isPending}
                          type="email"
                        />
                      </shadCnForm.FormControl>
                    </shadCnForm.FormItem>
                  )}
                />
              </div>

              <Separator className="dark:bg-slate-800 bg-gray-300 " />

              {/* Security */}
              <h2 className="mb-3 font-semibold text-gray-500">
                Password and Security
              </h2>
              <div className="flex flex-row gap-5 mb-5">
                <shadCnForm.FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <shadCnForm.FormItem className="text-sm w-[400px]">
                      <shadCnForm.FormLabel>Current Password</shadCnForm.FormLabel>
                      <shadCnForm.FormControl>
                        <Input
                          className="dark:border-slate-800 w-full"
                          {...field}
                          placeholder="Password"
                          disabled={isPending}
                          type="password"
                        />
                      </shadCnForm.FormControl>
                    </shadCnForm.FormItem>
                  )}
                />
                <shadCnForm.FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <shadCnForm.FormItem className="text-sm w-[400px]">
                      <shadCnForm.FormLabel>New Password</shadCnForm.FormLabel>
                      <shadCnForm.FormControl>
                        <Input
                          className="dark:border-slate-800 w-full"
                          {...field}
                          placeholder="New Password"
                          disabled={isPending}
                          type="password"
                        />
                      </shadCnForm.FormControl>
                    </shadCnForm.FormItem>
                  )}
                />
              </div>
            </div>

            <Separator className="dark:bg-slate-800 bg-gray-300 " />

            <div>
              
            </div>

            <Button disabled={isPending} type="submit" className="variant_btn">
              Save Changes
            </Button>
          </form>
        </shadCnForm.Form>
      </div>
    </div>
  );
};
