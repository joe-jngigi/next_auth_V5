"use client";
import React from "react";

import { IoIosArrowForward } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";

import { avatar } from "@/src";
import { FaUser } from "react-icons/fa6";
import { useCurrentUser } from "@/src/hooks/user_current_user";
import { settings_button } from "@/src/lib/ui_data";
import Link from "next/link";

export const SettingsSidePanel = () => {
  const session = useCurrentUser();
  return (
    <div className="h-full">
      <div className="dark:bg-slate-900 bg-slate-100 shadow-lg p-2 cursor-pointer rounded-xl flex-c-center gap-3">
        <avatar.Avatar>
          <avatar.AvatarImage src={session?.image || ""} />
          <avatar.AvatarFallback className="border border-black dark:text-black">
            <FaUser size={24} />
          </avatar.AvatarFallback>
        </avatar.Avatar>

        <p className="text-xs">{session?.email || "user@mail.org"}</p>
      </div>

      <div className="mt-3">
        {settings_button.map((setting) => (
          <Link
            key={Math.random()}
            href={setting.href}
            className="flex-between w-full dark:hover:bg-slate-900 hover:bg-slate-100 hover:shadow-lg py-4 px-2 rounded-xl duration-200 transition-all"
          >
            <span className="flex items-center gap-2">
              <setting.icon size={22} />
              User Account
            </span>

            <span>
              <IoIosArrowForward />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
