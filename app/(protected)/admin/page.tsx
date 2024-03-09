import React from "react";

import { newUserRole } from "@/src/lib/auth";
import { Badge } from "@/src/components/ui/badge";
import { RoleGate, Separator } from "@/src";
import { UserRole } from "@prisma/client";
import { TestRoutes } from "@/app/(protected)/_components/test_routes";

const AdminPage = async () => {
  const userRole = newUserRole();
  return (
    <div className="min-h-[92vh] w-full px-3 p-2 mx-auto">
      <div className="logo_text text-xl flex-between items-center select-none">
        <h2>Testing User Roles</h2>
        <div className="text-muted-foreground flex flex-row items-center gap-2">
          Role: <Badge className="font-poppins">{userRole}</Badge>
        </div>
      </div>
      <div className="mt-3 rounded-lg dark:bg-slate-950 bg-white flex-c-center w-full p-3 h-[87vh] overflow-y-auto">
        <div className="flex-c-center flex-col">
          <RoleGate
            className="w-[1000px] mx-auto flex-c-center flex-col"
            allowedRoles={UserRole.ADMIN}
          >
            <div className="w-56 mb-3 p-3 rounded-lg border bg-emerald-500/10 border-emerald-500 ">
              <h2 className="text-center w-full font-semibold text-emerald-600">
                Admin is Active
              </h2>
            </div>
            <Separator className="dark:bg-slate-800" />
          </RoleGate>
          <>
            <TestRoutes />
          </>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
