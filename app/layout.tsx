import type { Metadata } from "next";

import "@/src/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Toaster } from "sonner";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
export const metadata: Metadata = {
  title: "VIRGO | Next Auth",
  description: "Work on next-Auth v5; and working with admins",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className="font-poppins !scroll-smooth xl:max-w-[2000px] mx-auto dark:bg-black bg-slate-200">
          <Toaster position="top-right" richColors />
          <ToastContainer
            draggable
            position="bottom-right"
            className="text-xs font-display"
          />

          <div className="flex-c-center bg  h-full">{children}</div>
        </body>
      </html>
    </SessionProvider>
  );
}
