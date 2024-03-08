"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormDescription,
} from "@/src/components/ui/form";
import { Button, Separator, Input, shadCnSelect, Switch } from "@/src";
import { toast } from "sonner";

import { settingsActions } from "@/src/server-actions/settings";
import { settingsSchemas } from "@/src/schemas";
import { useCurrentUser } from "@/src/hooks/user_current_user";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";

export const SettingsMainpanel = () => {
  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();
  const dateToday = new Date();
  const { update } = useSession();

  const form = useForm<zod.infer<typeof settingsSchemas>>({
    resolver: zodResolver(settingsSchemas),
    defaultValues: {
      name: user.session?.name || undefined,
      email: user.session?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user.session?.role,
      isTwoFactorEnabled: user.session?.twoFactorAuth || undefined,
    },
  });

  const onSubmit = (values: zod.infer<typeof settingsSchemas>) => {
    startTransition(() => {
      settingsActions(values).then((data) => {
        if (data?.success) {
          update();
          toast.success(data.success, {
            description: <>{dateToday.toDateString()}</>,
            cancel: {
              label: "Cancel",
              onClick: () => toast.info("Cancelled"),
            },
          });
        }
        if (data?.error) {
          toast.error(data.error, {
            description: <>{dateToday.toDateString()}</>,
            cancel: {
              label: "Cancel",
              onClick: () => toast.info("Cancelled"),
            },
          });
        }
        if (data?.info) {
          toast.info(data.info, {
            description: <>{dateToday.toDateString()}</>,
            cancel: {
              label: "Cancel",
              onClick: () => toast.info("Cancelled"),
            },
          });
        }
      });
    });
    update();
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
                <div className="flex flex-col gap-5">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="text-xs w-[400px]">
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
                  {user.session?.isOAuth === false && (
                    <>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="text-xs w-[400px]">
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
                    </>
                  )}
                </div>

                {/* User Role */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="text-xs w-[400px]">
                      <FormLabel>User Role</FormLabel>
                      <FormControl>
                        <shadCnSelect.Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isPending}
                        >
                          <FormControl>
                            <shadCnSelect.SelectTrigger className="dark:border-slate-800 w-full text-xs">
                              <shadCnSelect.SelectValue placeholder="Select a role"></shadCnSelect.SelectValue>
                            </shadCnSelect.SelectTrigger>
                          </FormControl>
                          <shadCnSelect.SelectContent className="dark:bg-slate-950 dark:border-slate-800 dark:text-white">
                            <shadCnSelect.SelectItem
                              className="dark:hover:bg-slate-800 dark:hover:text-white"
                              value={UserRole.ADMIN}
                            >
                              Admin
                            </shadCnSelect.SelectItem>
                            <shadCnSelect.SelectItem
                              className="dark:hover:bg-slate-800 dark:hover:text-white"
                              value={UserRole.USER}
                            >
                              User
                            </shadCnSelect.SelectItem>
                          </shadCnSelect.SelectContent>
                        </shadCnSelect.Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="dark:bg-slate-800 bg-gray-300 " />

              {user.session?.isOAuth === false && (
                <>
                  {/* Security */}
                  <h2 className="mb-3 font-semibold text-gray-500">
                    Password and Security
                  </h2>
                  <div className="flex flex-row gap-5 mb-5">
                    <div className="flex flex-col gap-5">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="text-xs w-[400px]">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                className="dark:border-slate-800 w-full"
                                type="password"
                                {...field}
                                placeholder="Old Password"
                                disabled={isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem className="text-xs w-[400px]">
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input
                                className="dark:border-slate-800 w-full"
                                type="password"
                                {...field}
                                placeholder="new password"
                                disabled={isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="isTwoFactorEnabled"
                      render={({ field }) => (
                        <FormItem className="text-xs w-[400px] ">
                          <FormLabel>Two Factor Authentication</FormLabel>
                          <div className="flex-between items-center">
                            <FormDescription className="pt-3">
                              Enable-Two-factor Authentication for your Account
                            </FormDescription>
                            <FormControl>
                              <Switch
                                className="mt-3"
                                disabled={isPending}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Separator className="dark:bg-slate-800 bg-gray-300 " />
                </>
              )}
            </div>

            <Button
              disabled={isPending}
              type="submit"
              className="variant_btn select-none"
            >
              Save Changes
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
