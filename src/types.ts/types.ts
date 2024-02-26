/**
 * @joe-jngigi: Add @types {export types}  
*/

// Layout Props
export type T_LAYOUTPROPS = {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
    className?: string;
}

export type TLAYOUT_CARDWRAPPER_EXTENDS = T_LAYOUTPROPS & {
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

export type T_LINKTEXTPROPS = {
  label?: string;
  href?: string;
};

export type T_VALIDATE_DATA_TYPES = {
  success?: string;
  error?: string;
  info?: string;
};
