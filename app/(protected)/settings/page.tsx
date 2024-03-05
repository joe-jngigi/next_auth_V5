"use client";
import React from "react";

import { Button } from "@/src";
import { logOut } from "@/src/server-actions/logout";
import { useCurrentUser } from "@/src/hooks/user_current_user";

const SettingsPage = () => {
  const session = useCurrentUser()

  const onClick = () => {
    logOut();
  };

  return (
    <div className="w-full p-2 ">
      <Button onClick={onClick} className="">
        Sign Out
      </Button>
    </div>
  );
};

export default SettingsPage;
