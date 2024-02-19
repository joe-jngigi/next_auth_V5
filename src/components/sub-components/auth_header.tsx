import React from 'react'
import { T_LINKTEXTPROPS } from "@/src/types.ts/types";
import { cn } from '../../lib/utils';

export const AuthHeader: React.FC<T_LINKTEXTPROPS> = ({ label }) => {
  return (
    <div className="flex-c-center flex-col w-full space-y-">
      <h1 className="text-2xl  drop-shadow-md font-semibold  !font-poppins">
        Next Auth
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

