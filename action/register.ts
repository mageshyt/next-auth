"use server";

import { getUserByEmail } from "@/data/user";
import { axiosInstance } from "@/lib/axios";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { hashPassword } from "@/lib/utils";

import { RegisterSchema } from "@/schemas";
import axios from "axios";
import { z } from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const validateFields = RegisterSchema.safeParse(values);
    if (!validateFields.success) {
      return {
        status: false,
        error: "Invalid Fields",
      };
    }

    const { email, password, name, phone } = validateFields.data;
    const hashedPassword = await hashPassword(password);
    const existingUser = await getUserByEmail(email);
    console.log("EXISTING USER ", existingUser, phone);

    if (existingUser) {
      return {
        error: "Email already in use!",
      };
    }
    await db.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(email);
    sendVerificationEmail(email, name, verificationToken.token);
    return {
      success: true,
      message: "Confirmation email sent",
    };
  } catch (error) {
    console.log("REGISTER ", error);
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data.message,
      };
    }

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
