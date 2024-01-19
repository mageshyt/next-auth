"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";


import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return {
      status: false,
      error: "Invalid Fields",
    };
  }
  const { email, password } = validateFields.data;

  try {
    const existingUser = await getUserByEmail(email);
    // if not verified, return error
    if (!existingUser || !existingUser.password || !existingUser.email) {
      return {
        success: false,
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
        success: true,
        message: "Confirmation email sent",
      };
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return {
      success: true,
      data: res,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            error: "Invalid Credentials",
          };

        default:
          return {
            success: false,
            error: "Something went wrong!",
          };
      }
    }

    throw error;
  }
};
