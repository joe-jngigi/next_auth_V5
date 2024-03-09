"use client"

import React from "react";
import { T_LAYOUTPROPS } from "@/src/types.ts/types";

import { cn } from "@/src/lib/utils";
import { useCurrentUser } from "../hooks/user_current_user";

export const RoleGate: React.FC<T_LAYOUTPROPS> =  ({
  children,
  allowedRoles,
  className,
}) => {
  const role =  useCurrentUser();

  if (role.session?.role !== allowedRoles) {
    return (
      <div className={(cn(), className)}>
        <div className="w-56 p-3 rounded-lg border bg-red-500/10 border-red-500">
          <h2 className="text-center w-full font-semibold text-red-600">
            User not Allowed
          </h2>
        </div>
        <p className="mt-5">Users are not allowed to view this page.</p>
      </div>
    );
  }
  return <div className={(cn(), className)}>{children}</div>;
};
