import React from "react";
import { useServerUser } from "@/src/lib/auth";
import { UserInfo } from "@/app/(protected)/_components/user_info";

const ServerPage = async () => {
  const user = await useServerUser();
  const label = "User Information";

  return (
    <section className=" min-h-[93vh] w-full px-4 p-2 mx-auto flex-c-center">
      <UserInfo user={user} label={label} />
    </section>
  );
};

export default ServerPage;
