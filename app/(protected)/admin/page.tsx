import React from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

import { ServerUser } from "@/src/lib/auth";
import { RoleGate, Separator } from "@/src";
import { UserRole } from "@prisma/client";
import { TestRoutes } from "@/app/(protected)/_components/test_routes";

import { HeaderSet } from "../_components/header_set";
import { data_base } from "@/src/lib/prisma-db";

const AdminPage = async () => {
  const userRole = await ServerUser();

  const user = await data_base.user.findFirst({
    where: { email: userRole?.email },
  });
  
  return (
    <div className="min-h-[92vh] w-full px-3 p-2 mx-auto">
      {/* Header */}
      <HeaderSet
        name="Testing Admin routes"
        icon={<MdOutlineAdminPanelSettings size={22} />}
      />
      <div className="mt-3 rounded-lg dark:bg-slate-950 bg-white flex-c-center w-full p-3 h-[87vh] overflow-y-auto">
        <div className="flex-c-center flex-col">
          <RoleGate role= {user?.role}
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
