"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ui_link_data } from "@/src/lib/ui_data";
import { UserButton } from "@/src";

export const Navbar = () => {
  const pathName = usePathname();

  return (
    <nav className="w-full p-3 shadow-sm dark:bg-[rgb(20,20,20)] bg-white flex-between">
      {/* Logo */}
      <div>
        <h1 className="head_text">
          Zephyr<span className="text-2xl text-emerald-500">ONE</span>
        </h1>
      </div>

      {/* Links and Pages */}
      <div className="flex-c-center gap-5">
        {ui_link_data.map((ui_link) => (
          <Link key={Math.random()}
            className={`${
              pathName == ui_link.href ? "text-emerald-500 font-semibold" : "dark:text-white font-normal"
            } duration-200 transition-all hover:font-extrabold text-sm`}
            href={ui_link.href}
          >
            {ui_link.page}
          </Link>
        ))}
      </div>

      {/* User Button */}
      <div>
        <UserButton />
      </div>
    </nav>
  );
};
