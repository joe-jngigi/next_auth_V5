
import React from "react";
import { Navbar } from "@/app/(protected)/_components/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full w-full bg-[rgb(238,245,247)] dark:bg-black">
      <Navbar />
      {children}
    </main>
  );
};

export default MainLayout;
