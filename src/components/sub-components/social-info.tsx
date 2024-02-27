import React from 'react'
import { signIn } from 'next-auth/react';

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const SocialInfo = () => {

  const handleClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
      // redirect: DEFAULT_LOGIN_REDIRECT,
    });
  }
  return (
    <div className="w-full gap-x-2 flex items-center">
      <button className="outline_btn w-full"  onClick={() => handleClick("google")}>
        <FcGoogle size={24} />
      </button>

      <button className="outline_btn  w-full" onClick={() => handleClick("github")}>
        <FaGithub size={24} />
      </button>
    </div>
  );
};

