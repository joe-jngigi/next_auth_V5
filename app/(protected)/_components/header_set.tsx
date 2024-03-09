"use client";

import React from "react";
import { Badge } from "@/src";
import { useCurrentUser } from "@/src/hooks/user_current_user";

interface HeaderProps {
  name: string;
  icon: React.ReactNode;
}
export const HeaderSet: React.FC<HeaderProps> = ({ icon, name }) => {
  const userRole = useCurrentUser();

  return (
    <div className="logo_text text-xl flex-between items-center select-none">
      <h2 className="flex flex-row gap-2 items-center">
        <span>{name}</span>
        {icon}
      </h2>
      <div className="text-muted-foreground flex flex-row items-center gap-2">
        Role: <Badge className="font-poppins">{userRole.session?.role}</Badge>
      </div>
    </div>
  );
};
