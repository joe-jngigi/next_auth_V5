import { auth, signOut } from "@/auth";
import { Button } from "@/src";
import React from "react";

const SettingsPage = async () => {
  const session = await auth();

  /**
   * @function signOut is exclusively for server components
   */

  return (
    <div className="h-full flex-c-center flex-col ">
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button className="">Sign Out</Button>
      </form>

      <div>User ID: {JSON.stringify(session?.user?.id)}</div>
      <div>Session: {JSON.stringify(session)}</div>
    </div>
  );
};

export default SettingsPage;
