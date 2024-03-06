"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import * as FORM from "@/src/components/ui/form";
import { Input } from "@/src";

import { Button, Separator } from "@/src";
import { settingsActions } from "@/src/server-actions/settings";
import { settingsSchemas } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export const SettingsMainpanel = () => {
  const [isPending, setUseTransition] = useTransition();
  const dateToday = new Date();

  const Form = useForm<zod.infer<typeof settingsSchemas>>({
    resolver: zodResolver(settingsSchemas),
    defaultValues: {
      name: "",
    },
  });

  const onSubmitUser = async (values: zod.infer<typeof settingsSchemas>) => {
    setUseTransition(() => {
      settingsActions(values).then((data) => {
        if (data.success) {
          toast.success("Test Server Action successful. The user is an admin", {
            dismissible: true,
            description: <>{dateToday.toDateString()}</>,
            cancel: {
              label: "Cancel",
              onClick: () => toast.info("Cancelled"),
            },
          });
        }

        if (data.error) {
          toast.success("Test Server Action successful. The user is an admin", {
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
      <Separator className="bg-slate-800" />

      <div className="mt-3">
        <FORM.Form {...Form}>
          <form onClick={Form.handleSubmit(onSubmitUser)}>
            <Button disabled={isPending} type="submit">
              Chage User Name
            </Button>
          </form>
        </FORM.Form>
      </div>
    </div>
  );
};
