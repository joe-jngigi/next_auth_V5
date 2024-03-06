"use client";

import React from "react";
import { toast } from "react-toastify";
import * as badge from "@/src/components/ui/badge";
import { FaRegCopy } from "react-icons/fa";

import { Separator } from "@/src";
import { T_USERTYPES } from "@/src/types.ts/types";

export const UserInfo: React.FC<T_USERTYPES> = ({ user, label }) => {
  console.log(user);

  const onCopy = (data?: string | null) => {
    if (!data) {
      toast.error("No text to copy", { theme: "colored" });
      return;
    }
    navigator.clipboard.writeText(data);
    toast.info("Text Copied to Clipboard", { theme: "colored" });
  };
  return (
    <div className="dark:bg-slate-950 bg-white rounded-xl shadow-md w-[1000px] mx-auto min-h-590 p-3">
      <h2 className="text-xl font-semibold font-satoshi mb-2 select-none">
        {label}
      </h2>
      <Separator className="dark:bg-slate-700" />

      <div className="mt-2 py-2 flex flex-col gap-3">
        <div className="p-2 w-full border dark:border-gray-900 flex items-center justify-between shadow-sm rounded-lg">
          <p className="text-sm">USER ID</p>
          <p className="flex flex-row items-center gap-5 truncate text-xs font-mono max-w-[180px]">
            <span className="truncate text-xs font-mono max-w-[180px]">
              {user?.id}
            </span>
            <span className="copy_btn" onClick={() => onCopy(user?.id)}>
              <FaRegCopy size={18} />
            </span>
          </p>
        </div>
        <div className="p-2 w-full border dark:border-gray-900 flex items-center justify-between shadow-sm rounded-lg">
          <p className="text-sm">USER NAME</p>
          <p className="flex flex-row items-center gap-5 truncate text-xs font-mono max-w-[180px]">
            <span className="truncate text-xs font-mono max-w-[180px]">
              {user?.name}
            </span>
            <span className="copy_btn" onClick={() => onCopy(user?.name)}>
              <FaRegCopy size={18} />
            </span>
          </p>
        </div>
        <div className="p-2 w-full border dark:border-gray-900 flex items-center justify-between shadow-sm rounded-lg">
          <p className="text-sm">USER EMAIL</p>
          <p className="flex flex-row items-center gap-5 truncate text-xs font-mono max-w-[180px]">
            <span className="truncate text-xs font-mono max-w-[180px]">
              {user?.email}
            </span>
            <span className="copy_btn" onClick={() => onCopy(user?.email)}>
              <FaRegCopy size={18} />
            </span>
          </p>
        </div>
        <div className="p-2 w-full border dark:border-gray-900 flex items-center justify-between shadow-sm rounded-lg">
          <p className="text-sm">USER ROLE</p>
          <p className="flex flex-row items-center gap-5 ">
            <span className="truncate text-xs font-mono max-w-[180px]">
              {user?.role}
            </span>

            <span className="copy_btn" onClick={() => onCopy(user?.role)}>
              <FaRegCopy size={18} />
            </span>
          </p>
        </div>
        <div className="p-2 w-full border dark:border-gray-900 flex items-center justify-between shadow-sm rounded-lg">
          <p className="text-sm">USER IMAGE URL</p>
          <p className="flex flex-row items-center gap-5 truncate text-xs font-mono max-w-[180px]">
            <span className="truncate text-xs font-mono max-w-[180px]">
              {user?.image}
            </span>
            <span className="copy_btn" onClick={() => onCopy(user?.image)}>
              <FaRegCopy size={18} />
            </span>
          </p>
        </div>

        <div className="p-2 w-full border dark:border-gray-900 flex items-center justify-between shadow-sm rounded-lg">
          <p className="text-sm">TWO FACTOR AUTH</p>
          <div className="flex flex-row items-center gap-5 truncate text-xs font-mono max-w-[180px]">
            <badge.Badge
              variant={user?.twoFactorAuth ? "success" : "default"}
              className="truncate text-xs font-mono max-w-[180px]"
            >
              {user?.twoFactorAuth ? "ON" : "OFF"}
            </badge.Badge>
            <span
              className="copy_btn"
              onClick={() => {
                const faValue = user?.twoFactorAuth ? "true" : "false";
                onCopy(faValue);
              }}
            >
              <FaRegCopy size={18} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
