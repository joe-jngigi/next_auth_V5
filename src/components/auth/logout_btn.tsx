"use client";
import React from "react";

import { T_LAYOUTPROPS } from "@/src/types.ts/types";
import { useRouter } from "next/navigation";
import { logOut } from "@/src/server-actions/logout";
import { cn } from "@/src/lib/utils";

export const LogOutButton: React.FC<T_LAYOUTPROPS> = ({
  className,
  children,
  asChild,
  mode = "redirect",
}) => {
  const router = useRouter();

  const onClick = () => {
    logOut();
    // router.push("/");
    // router.replace("/");
    // window.location.reload()
  };

  if (mode === "modal") {
    return <span>TODO: implement a modal</span>;
  }
  return (
    <span onClick={onClick} className={(cn("cursor-pointer"), className)}>
      {children}
    </span>
  );
};
