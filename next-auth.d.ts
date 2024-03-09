import { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

export type extendedUser = DefaultSession["user"] & {
  role: UserRole;
  twoFactorAuth: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user?: extendedUser;
  }
}
