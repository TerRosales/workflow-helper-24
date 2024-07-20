// Will be using this component together with nodemailer(emailHandler.js) to send emails, this will be the email template.

import { Button, Html } from "@react-email/components";
import React from "react";

function Email() {
  return (
    <Html>
      <Button
        href="google.com"
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Click me to google
      </Button>
    </Html>
  );
}

export default Email;
