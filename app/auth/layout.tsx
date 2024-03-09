import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="h-full flex-c-center">{children}</main>;
};

export default AuthLayout;
