/**
 * @joe-jngigi: Add @types {export types}
 */

import { extendedUser } from "@/next-auth";
import { UserRole } from "@prisma/client";

// Layout Props
export type T_LAYOUTPROPS = {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
  className?: string;
  allowedRoles?: UserRole;
  role?: string;
};

export type TLAYOUT_CARDWRAPPER_EXTENDS = T_LAYOUTPROPS & {
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  headerTitle: string;
  showSocial?: boolean;
  showForgotPassword?: boolean;
  forgotPasswordHref?: string;
};

export type T_LINKTEXTPROPS = {
  title?: string;
  label?: string;
  href?: string;
};

export type T_VALIDATE_DATA_TYPES = {
  twoFactor?: boolean;
  success?: string;
  error?: string;
  info?: string;
};

export type T_USERTYPES = {
  user?: extendedUser;
  label?: string;
};
