import React from "react";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export const SocialInfo = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");

  const handleClick = (provider: "google" | "github") => {
    if (urlError === "OAuthAccountNotLinked") {
      toast.error("Email Already in use with another provider", {
        theme: "colored",
      });

      return;
    }
    console.log(provider);

    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
      // redirect: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="w-full">
      <div className="w-full flex-c-center flex-row gap-1 mb-3">
        <hr className=" w-full border-t-[0.5px] border-black" />
        <span className="text-xs font-semibold">Or</span>
        <hr className="w-full border-t-[0.5px] border-black" />
      </div>
      <div className="w-full gap-x-2 flex items-center">
        <button
          className="outline_btn w-full"
          onClick={() => handleClick("google")}
        >
          <FcGoogle size={24} />
        </button>
        <button
          className="outline_btn  w-full"
          onClick={() => handleClick("github")}
        >
          <FaGithub size={24} />
        </button>
      </div>
    </div>
  );
};
