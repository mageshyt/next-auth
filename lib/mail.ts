import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  name: string,
  verificationToken: string
) => {
  const confirmLink = `${process.env.NEXTAUTH_URL}/auth/new-verification?token=${verificationToken}`;
  const html = `
  <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: auto;">
    <h1 style="color: #007BFF;">Hi ${name},</h1>
    <p style="color: #555;">Welcome to ${process.env.NEXTAUTH_URL}! Thank you for signing up.</p>
    <p style="color: #555;">To get started, please verify your email address by clicking the button below:</p>
    <a href="${confirmLink}" style="display: inline-block; padding: 12px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 15px;">Verify Email</a>
    <p style="color: #555;">Or copy and paste this link into your browser:</p>
    <p style="color: #777; margin-bottom: 20px;">${confirmLink}</p>
    <p style="color: #555;">Thanks,</p>
    <p style="color: #007BFF;">The ${process.env.NEXTAUTH_URL} Team</p>
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