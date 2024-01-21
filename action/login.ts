"use server";

import { signIn } from "@/auth";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendTwoFactorEmail, sendVerificationEmail } from "@/lib/mail";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";

import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return {
      error: "Invalid Fields",
    };
  }
  const { email, password, code } = validateFields.data;

  try {
    const existingUser = await getUserByEmail(email);
    console.log(existingUser);
    // if not verified, return error
    if (!existingUser || !existingUser.password || !existingUser.email) {
      return {
        error: "Email does not exist",
      };
    }
    if (!existingUser.emailVerified) {
      // generate new token
      const verificationToken = await generateVerificationToken(email);
      // send email
      const response = await sendVerificationEmail(
        email,
        verificationToken.email,
        verificationToken.token
      );
      console.log(response);
      return {
        success: "Confirmation email sent",
      };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
      // if code is there, check if it is valid
      if (code) {
        const twoFactorToken = await getTwoFactorTokenByEmail(
          existingUser.email
        );
        if (!twoFactorToken) {
          return {
            error: "Invalid Code",
          };
        }
        // check if code is valid
        if (twoFactorToken.token !== code) {
          return {
            error: "Invalid Code",
          };
        }
        // check if code is expired
        const isExpired = new Date() > twoFactorToken.expires;

        if (isExpired) {
          return {
            error: "Code has expired",
          };
        }

        // Delete the two factor token
        await db.twoFactorToken.delete({
          where: {
            id: twoFactorToken.id,
          },
        });

        const existingConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (existingConfirmation) {
          await db.twoFactorConfirmation.delete({
            where: {
              id: existingConfirmation.id,
            },
          });
        }

        await db.twoFactorConfirmation.create({
          data: {
            userId: existingUser.id,
          },
        });
      } else {
        // generate new token
        const verificationToken = await generateTwoFactorToken(email);
        if (!verificationToken) {
          return {
            error: "Email does not exist",
          };
        }

        // send email
        const response = await sendTwoFactorEmail({
          email,
          name: verificationToken.email,
          token: verificationToken.token,
        });
        console.log(response);
        return {
          twoFactor: true,
          success: "Two Factor email sent",
        };
      }
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirectTo: "/settings",
    });

    return res;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid Credentials",
          };

        default:
          return {
            error: "Something went wrong!",
          };
      }
    }

    throw error;
  }
};
