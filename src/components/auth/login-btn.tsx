"use client";
import React from 'react'

import { T_LAYOUTPROPS } from "@/src/types.ts/types";
import { useRouter } from 'next/navigation';


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
    return <span>TODO: implement a modal</span>;
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LoginButton
