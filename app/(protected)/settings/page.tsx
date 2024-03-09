"use client";

import React, { useEffect } from "react";

import { Badge } from "@/src";
import { MdSettingsAccessibility } from "react-icons/md";

import { SettingsPanel } from "@/app/(protected)/_components/settings_page";
import { SettingsSidePanel } from "@/app/(protected)/_components/settings_side_panel";
import { SettingsMainpanel } from "@/app/(protected)/_components/settings_mainpanel";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/src/hooks/user_current_user";

const SettingsPage = () => {
  // const session = ServerUser();
  const userRole = useCurrentUser();

  const session = useSession();

  useEffect(() => {
    if (session.data === null) {
      session.status;
      window.location.reload();
      return;
    }
  }, [session]);

  if (!userRole) {
    return null;
  }

  return (
    <div className="min-h-[92vh] w-full px-4 p-2 mx-auto ">
      {/* Header */}
      <div className="logo_text text-xl flex-between items-center select-none">
        <h2 className="flex flex-row gap-2 items-center">
          <span>Settings & Preferences</span>{" "}
          <MdSettingsAccessibility size={22} />
        </h2>
        <div className="text-muted-foreground flex flex-row items-center gap-2">
          Role: <Badge className="font-poppins">{userRole.session?.role}</Badge>
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
