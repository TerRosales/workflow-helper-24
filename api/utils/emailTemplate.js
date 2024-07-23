export const verificationCode = null; // Replace this with your actual code
export const emailTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f7f7f7;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding: 20px 0;
        border-bottom: 1px solid #eeeeee;
      }
      .header h1 {
        margin: 0;
        color: #333333;
      }
      .content {
        padding: 20px 0;
      }
      .content p {
        margin: 0 0 20px;
        color: #555555;
        line-height: 1.6;
      }
      .code {
        display: block;
        width: fit-content;
        margin: 0 auto;
        padding: 10px 20px;
        background-color: #007bff;
        color: #ffffff;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        border-radius: 4px;
        letter-spacing: 4px;
      }
      .footer {
        text-align: center;
        padding: 20px 0;
        border-top: 1px solid #eeeeee;
        color: #aaaaaa;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div
        class="header"
        style="
          align-items: center;
          justify-content: center;
          background-color: #222;
        "
      >
        <h1 style="font-weight: bold; color: white">
          Workflow<span style="color: #1955df">Helper</span>
        </h1>
      </div>

      <div class="content">
        <p>Hello,</p>
        <p>
          Thank you for registering with us. Please use the following
          verification code to complete your registration process:
        </p>
        <div>
          <h1
            style="
              font-size: 16px;
              margin-bottom: 20px;
              justify-content: center;
              text-align: center;
            "
          >
            Verification Code
          </h1>
          <span class="code" style="margin-bottom: 20px"
            >${verificationCode}</span
          >
          <p>If you did not request this code, please ignore this email.</p>
        </div>
      </div>
      <div class="footer">
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;
