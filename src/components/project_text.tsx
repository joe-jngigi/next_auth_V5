"use client";
import React from "react";
import { toast } from "sonner";
import { CopyIcon } from "@radix-ui/react-icons";

export const ProjectText = () => {
  const email = "josephngigi775@gmail.com";
  const password = "qwerty";

  const onClick = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success("Text copied successfully");
  };
  return (
    <div className="mt-5 flex flex-col gap-3">
      <h2 className="text-start text-sm font-semibold ">
        Use the following to login.
      </h2>

      <div className="flex flex-col gap-1 text-xs">
        EMAIL:
        <p className="dark:bg-slate-900 flex-between bg-white p-2 rounded-lg">
          <span className="text-xs">{email}</span>
          <span className="cursor-pointer" onClick={() => onClick(email)}>
            <CopyIcon />
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-1 text-xs">
        PASSWORD:
        <p className="dark:bg-slate-900 flex-between bg-white p-2 rounded-lg">
          <span className="">{password}</span>

          <span className="cursor-pointer" onClick={() => onClick(password)}>
            <CopyIcon />
          </span>
        </p>
      </div>
    </div>
  );
};
