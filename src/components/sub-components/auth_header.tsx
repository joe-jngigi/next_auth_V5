import React from 'react'
import { T_LINKTEXTPROPS } from "@/src/types.ts/types";

export const AuthHeader: React.FC<T_LINKTEXTPROPS> = ({ label, title }) => {
  return (
    <div className="flex-c-center flex-col w-full space-y-">
      <h1 className="text-2xl  drop-shadow-md font-semibold  !font-poppins">
        {title}
      </h1>
      <p className="text-muted-foreground text-sm dark:text-slate-400">{label}</p>
    </div>
  );
};

