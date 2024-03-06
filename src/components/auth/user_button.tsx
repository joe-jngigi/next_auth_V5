import React from "react";

import { FaUserSecret } from "react-icons/fa6";
import { TbDoorExit } from "react-icons/tb";

import * as dropdown from "@/src/components/ui/dropdown-menu";
import * as avatar from "@/src/components/ui/avatar";

import { useCurrentUser } from "@/src/hooks/user_current_user";
import { Badge, LogOutButton } from "@/src";

export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <dropdown.DropdownMenu >
      {/* Dropdown menu button */}
      <dropdown.DropdownMenuTrigger className="flex-c-center gap-2 px-2 rounded-lg py-0.5 ">
        <h3 className="text-sm font-semibold text-muted-foreground">Hello, <span className="text-emerald-500">{user?.name}</span></h3>
        {/* User Image */}
        <avatar.Avatar>
          <avatar.AvatarImage src={user?.image || ""} />
          <avatar.AvatarFallback className="border border-black dark:text-black">
            <FaUserSecret size={24} />
          </avatar.AvatarFallback>
        </avatar.Avatar>
      </dropdown.DropdownMenuTrigger>

      {/* Dropdown menu content */}
      <dropdown.DropdownMenuContent align="end">
        <dropdown.DropdownMenuLabel>
          Role: <Badge>{user?.role}</Badge>
        </dropdown.DropdownMenuLabel>

        <dropdown.DropdownMenuSeparator />

        <dropdown.DropdownMenuItem className="cursor-pointer">
          <LogOutButton className=" w-full flex-between">
            Logout
            <TbDoorExit size={20} />
          </LogOutButton>
        </dropdown.DropdownMenuItem>
      </dropdown.DropdownMenuContent>
    </dropdown.DropdownMenu>
  );
};
