import { LoginButton, Separator } from "@/src";

export default function Home() {

  return (
    <main className="dark:bg-black bg-white flex-c-center h-full">
      
      <div className="space-y-6 text-center">
        <h1 className="head_text">Next Auth</h1>
        <Separator className="bg-slate-800" />
        <LoginButton >
          <button className="variant_btn mt-5">Welcome to Next-Auth</button>
        </LoginButton>
      </div>
    </main>
  );
}
