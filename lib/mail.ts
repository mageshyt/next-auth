import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  name: string,
  verificationToken: string
) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${verificationToken}`;
  const html = `
  <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: auto;">
    <h1 style="color: #007BFF;">Hi ${name},</h1>
    <p style="color: #555;">Welcome to Next Auth ToolKit! Thank you for signing up.</p>
    <p style="color: #555;">To get started, please verify your email address by clicking the button below:</p>
    <a href="${confirmLink}" style="display: inline-block; padding: 12px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 15px;">Verify Email</a>
    <p style="color: #555;">Or copy and paste this link into your browser:</p>
    <p style="color: #777; margin-bottom: 20px;">${confirmLink}</p>
    <p style="color: #555;">Thanks,</p>
    <p style="color: #007BFF;">The Next Auth ToolKit</p>
  </div>
`;

  const subject = "Please verify your email address";

  const from = `onboarding@resend.dev`;
  const to = email;
  const response = await resend.emails.send({
    from,
    to,
    subject,
    html,
  });

  return response;
};

export const sendPasswordResetEmail = async (
  email: string,
  name: string,
  passwordResetToken: string
) => {
  const resetLink = `http://localhost:3000/auth/reset-password?token=${passwordResetToken}`;
  const html = `
  <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: auto;">
    <h1 style="color: #007BFF;">Hi ${name},</h1>
    <p style="color: #555;">You recently requested to reset your password for your Next Auth ToolKit account. Click the button below to reset it.</p>
    <a href="${resetLink}" style="display: inline-block; padding: 12px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 15px;">Reset Password</a>
    <p style="color: #555;">Or copy and paste this link into your browser:</p>
    <p style="color: #777; margin-bottom: 20px;">${resetLink}</p>
    <p style="color: #555;">Thanks,</p>
    <p style="color: #007BFF;">The Next Auth ToolKit</p>
  </div>
`;

  const subject = "Reset your password";

  await resend.emails.send({
    from: ``,
    to: email,
    subject,
    html,
  });
};
