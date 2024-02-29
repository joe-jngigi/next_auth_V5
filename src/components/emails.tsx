import * as React from "react";

interface EmailTemplateProps {
  confirmationLink: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  confirmationLink,
}) => (
  <div>
    <h1>Welcome, {confirmationLink}!</h1>
  </div>
);
