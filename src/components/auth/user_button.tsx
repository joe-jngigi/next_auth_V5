import React from "react";

import { FaUserSecret } from "react-icons/fa6";
import { TbDoorExit } from "react-icons/tb";

import * as dropdown from "@/src/components/ui/dropdown-menu";
import * as avatar from "@/src/components/ui/avatar";

import { useCurrentUser } from "@/src/hooks/user_current_user";
import { LogOutButton } from "@/src";

export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <dropdown.DropdownMenu>
      {/* Dropdown menu button */}
      <dropdown.DropdownMenuTrigger>
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
          Hello, <span>{user?.name}</span>
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
