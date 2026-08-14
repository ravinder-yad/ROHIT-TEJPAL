export const getOtpEmailTemplate = (name, otp, context) => {
  let title = '';
  let message = '';
  let instructions = '';

  switch (context) {
    case 'register':
      title = 'Welcome to ROHIT TEJPAL';
      message = 'Thank you for joining our exclusive community. To complete your registration and verify your account, please use the One-Time Password (OTP) below.';
      instructions = 'This code is valid for the next 5 minutes. Do not share this code with anyone.';
      break;
    case 'login':
      title = 'Secure Login Verification';
      message = 'We detected a login attempt to your ROHIT TEJPAL account. Please use the following One-Time Password (OTP) to securely access your account.';
      instructions = 'This code is valid for the next 5 minutes. If you did not request this login, please ignore this email.';
      break;
    case 'forgotPassword':
      title = 'Password Reset Request';
      message = 'We received a request to reset the password for your ROHIT TEJPAL account. Please use the One-Time Password (OTP) below to create a new password.';
      instructions = 'This code is valid for the next 5 minutes. If you did not request a password reset, you can safely ignore this email.';
      break;
    case 'adminRegister':
      title = 'Admin Setup Verification';
      message = 'Your administrative account for the ROHIT TEJPAL platform has been created. Please use the One-Time Password (OTP) below to verify your access.';
      instructions = 'This code is valid for the next 5 minutes. Keep this code secure.';
      break;
    case 'adminLogin':
      title = 'Admin Secure Login';
      message = 'An administrative login attempt was made. Please use the One-Time Password (OTP) below to securely access the admin panel.';
      instructions = 'This code is valid for the next 5 minutes. If you did not initiate this login, please secure your account immediately.';
      break;
    default:
      title = 'Account Verification';
      message = 'Please use the One-Time Password (OTP) below to verify your action.';
      instructions = 'This code is valid for the next 5 minutes.';
  }

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f8f9fa;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }
      .email-wrapper {
        width: 100%;
        background-color: #f8f9fa;
        padding: 40px 0;
      }
      .email-content {
        max-width: 600px;
        margin: 0 auto;
        background-color: #1a1a1a;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      }
      .header {
        background-color: #000000;
        padding: 30px;
        text-align: center;
        border-bottom: 2px solid #b8860b;
      }
      .logo {
        color: #ffffff;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 4px;
        margin: 0;
        text-transform: uppercase;
      }
      .gold-text {
        color: #b8860b;
      }
      .body {
        padding: 40px 30px;
        color: #ffffff;
        text-align: center;
      }
      .greeting {
        font-size: 20px;
        margin-bottom: 20px;
        color: #ffffff;
        font-weight: 500;
      }
      .message {
        font-size: 15px;
        line-height: 1.6;
        color: #cccccc;
        margin-bottom: 35px;
      }
      .otp-box {
        background-color: #2a2a2a;
        border: 1px solid #b8860b;
        border-radius: 8px;
        padding: 20px;
        margin: 0 auto 30px auto;
        max-width: 300px;
      }
      .otp-code {
        font-size: 32px;
        font-weight: bold;
        letter-spacing: 8px;
        color: #b8860b;
        margin: 0;
      }
      .instructions {
        font-size: 13px;
        color: #999999;
        line-height: 1.5;
        margin-bottom: 0;
      }
      .footer {
        background-color: #111111;
        padding: 20px;
        text-align: center;
        border-top: 1px solid #333333;
      }
      .footer-text {
        color: #666666;
        font-size: 12px;
        margin: 0;
        line-height: 1.5;
      }
    </style>
  </head>
  <body>
    <div class="email-wrapper">
      <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td class="header">
            <h1 class="logo">ROHIT <span class="gold-text">TEJPAL</span></h1>
          </td>
        </tr>
        <tr>
          <td class="body">
            <h2 class="greeting">${title}</h2>
            <p class="message">Hello ${name},<br><br>${message}</p>
            
            <div class="otp-box">
              <p class="otp-code">${otp}</p>
            </div>
            
            <p class="instructions">${instructions}</p>
          </td>
        </tr>
        <tr>
          <td class="footer">
            <p class="footer-text">
              &copy; ${new Date().getFullYear()} ROHIT TEJPAL. All rights reserved.<br>
              This is an automated email, please do not reply.
            </p>
          </td>
        </tr>
      </table>
    </div>
  </body>
  </html>
  `;
};
