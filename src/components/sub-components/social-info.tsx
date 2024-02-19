import React from 'react'

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const SocialInfo = () => {
  return (
    <div className="w-full gap-x-2 flex items-center">
      <button className="outline_btn w-full">
        <FcGoogle />
      </button>

      <button className="outline_btn  w-full">
        <FaGithub />
      </button>
    </div>
  );
};

