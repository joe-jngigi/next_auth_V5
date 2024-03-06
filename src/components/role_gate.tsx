import React from "react";
import { T_LAYOUTPROPS } from "@/src/types.ts/types";
import { useUserRole } from "@/src/lib/auth";
import { cn } from "@/src/lib/utils";

export const RoleGate: React.FC<T_LAYOUTPROPS> = async ({
  children,
  allowedRoles,
  className,
}) => {
  console.log(allowedRoles);

  const role = await useUserRole();
  if (role !== allowedRoles) {
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
