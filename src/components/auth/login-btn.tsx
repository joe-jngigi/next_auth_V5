"use client";
import React from "react";

import { T_LAYOUTPROPS } from "@/src/types.ts/types";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { LoginForm } from "./login-form";

const LoginButton: React.FC<T_LAYOUTPROPS> = ({
  children,
  asChild,
  mode = "redirect",
}) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none text-black">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LoginButton;
