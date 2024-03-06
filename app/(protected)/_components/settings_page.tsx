import { cn } from "@/src/lib/utils";
import { T_LAYOUTPROPS } from "@/src/types.ts/types";
import React from "react";

export const SettingsPanel: React.FC<T_LAYOUTPROPS> = ({
  children,
  className,
}) => {
  return <section className={cn(className)}>{children}</section>;
};
