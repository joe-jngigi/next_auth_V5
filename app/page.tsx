import { LoginButton, ProjectText, Separator } from "@/src";

export default function Home() {
  return (
    <main className="dark:bg-black  flex-c-center h-full max-w-[600px] mx-auto">
      <div className="space-y-6 text-center h-[400px] flex-between flex-col">
        <div>
          <h1 className="head_text">Next Auth</h1>
          <Separator className="bg-slate-800 w-[600px]" />
          <LoginButton asChild mode="modal">
            <button className="variant_btn mt-5">Welcome to Next-Auth</button>
          </LoginButton>
        </div>

        <div className="text-start">
          <p className="text-sm text-start">
            I currently don't have a domain, so that does not allow a new user
            to register. In the future I will update to use a domain. This
            project is a full authentication process in next js, implementing{" "}
            <a
              className="text-emerald-500 hover:underline duration-300 transition-all"
              href="https://authjs.dev/guides/upgrade-to-v5"
              target="_blank"
            >
              next.js Version 5 (Beta)
            </a>{" "}
            at the time of implementation
          </p>
          <div className="mt-5 w-full">
            <div>
              <h2 className="text-start text-sm font-semibold">
                Features Impemented
              </h2>
              <div className="flex items-center flex-wrap flex-row gap-3 mt-3">
                <span className="text-xs p-2 dark:bg-slate-900 bg-white rounded-full cursor-pointer">
                  Auth.js v5
                </span>
                <span className="text-xs p-2 dark:bg-slate-900 bg-white rounded-full cursor-pointer">
                  Sign In OTP
                </span>
                <span className="text-xs p-2 dark:bg-slate-900 bg-white rounded-full cursor-pointer">
                  Reset Password by email
                </span>
                <span className="text-xs p-2 dark:bg-slate-900 bg-white rounded-full cursor-pointer">
                  Two-Factor-Authentication
                </span>
                <span className="text-xs p-2 dark:bg-slate-900 bg-white rounded-full cursor-pointer">
                  Credentials, Google and Github
                </span>
                <span className="text-xs p-2 dark:bg-slate-900 bg-white rounded-full cursor-pointer">
                  User Role gate: Admin | User
                </span>
                <span className="text-xs p-2 dark:bg-slate-900 bg-white rounded-full cursor-pointer">
                  User Settings Control
                </span>
              </div>

              <ProjectText />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
