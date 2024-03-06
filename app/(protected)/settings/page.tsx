import React from "react";

import { Badge } from "@/src";
import { useServerUser, useUserRole } from "@/src/lib/auth";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const SettingsPage = async () => {
  // const session = useServerUser();
  const userRole = useUserRole();

  return (
    <div className="min-h-[92vh] w-full px-4 p-2 mx-auto ">
      {/* Header */}
      <div className="logo_text text-xl flex-between items-center select-none">
        <h2 className="flex flex-row gap-2 items-center">
          <span>Settings & Preferences</span> <MdOutlineAdminPanelSettings size={22} />
        </h2>
        <div className="text-muted-foreground flex flex-row items-center gap-2">
          Role: <Badge className="font-poppins">{userRole}</Badge>
        </div>
      </div>

      {/* Border */}
      <div className="mt-3 rounded-lg dark:bg-slate-950 bg-white flex-c-center w-full p-3 min-h-[87vh] overflow-y-auto">
        User
      </div>
    </div>
  );
};

export default SettingsPage;
