"use server";
import bcrypt from "bcryptjs";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { ForgotPasswordSchema } from "@/schemas";
import { z } from "zod";
import { db } from "@/lib/db";

export const newPassword = async (
  values: z.infer<typeof ForgotPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return {
      error: "Missing Token",
    };
  }

  const validatedFields = ForgotPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedFields.data;

  try {
    // get user by token
    const existingToken = await getPasswordResetTokenByToken(token);

    // if no user, return error
    if (!existingToken) {
      return { error: "Invalid Token" };
    }
    // check if token is expired
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
      return { error: "Token has Expired" };
    }
    // if user, update password
    const existingUser = await getUserByEmail(existingToken.email);

    // if no user, return error
    if (!existingUser) {
      return { error: "Email does not exist!" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    // delete token
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
    // return success
    return { success: "Password updated!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
