import React from "react";

import { Badge } from "@/src";
import { useUserRole } from "@/src/lib/auth";
import { MdOutlineAdminPanelSettings, MdSettingsAccessibility } from "react-icons/md";

import { SettingsPanel } from "@/app/(protected)/_components/settings_page";
import { SettingsSidePanel } from "@/app/(protected)/_components/settings_side_panel";
import { SettingsMainpanel } from "@/app/(protected)/_components/settings_mainpanel";

const SettingsPage = async () => {
  // const session = useServerUser();
  const userRole = useUserRole();

  return (
    <div className="min-h-[92vh] w-full px-4 p-2 mx-auto ">
      {/* Header */}
      <div className="logo_text text-xl flex-between items-center select-none">
        <h2 className="flex flex-row gap-2 items-center">
          <span>Settings & Preferences</span>{" "}
          <MdSettingsAccessibility size={22} />
        </h2>
        <div className="text-muted-foreground flex flex-row items-center gap-2">
          Role: <Badge className="font-poppins">{userRole}</Badge>
        </div>
      </div>
      {/* Border */}

      <SettingsPanel
        className="mt-3 rounded-xl dark:bg-slate-950 bg-white grid grid-cols-[300px_1fr] w-full p-3
      h-[87vh] "
      >
        <>
          <SettingsSidePanel />
        </>
        <>
          <SettingsMainpanel />
          
        </>
      </SettingsPanel>
    </div>
  );
};

export default SettingsPage;
