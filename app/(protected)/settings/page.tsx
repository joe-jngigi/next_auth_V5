"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { IoSettingsOutline } from "react-icons/io5";

import { SettingsPanel } from "@/app/(protected)/_components/settings_page";
import { SettingsSidePanel } from "@/app/(protected)/_components/settings_side_panel";
import { SettingsMainpanel } from "@/app/(protected)/_components/settings_mainpanel";
import { HeaderSet } from "@/app/(protected)/_components/header_set";
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
      <HeaderSet
        name="Settings & Preferences"
        icon={<IoSettingsOutline size={22} />}
      />
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
