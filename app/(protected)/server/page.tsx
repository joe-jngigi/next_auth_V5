import React from "react";
import { ServerUser } from "@/src/lib/auth";
import { UserInfo } from "@/app/(protected)/_components/user_info";

const ServerPage = async () => {
  const user = await ServerUser();
  const label = "User Information";

  return (
    <section className=" min-h-[92vh] w-full px-4 p-2 mx-auto flex-c-center">
      <UserInfo user={user} label={label} />
    </section>
  );
};

export default ServerPage;
