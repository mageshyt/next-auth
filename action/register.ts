"use server";

import { axiosInstance } from "@/lib/axios";
import { hashPassword } from "@/lib/utils";

import { RegisterSchema } from "@/schemas";
import axios, { Axios } from "axios";
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

    const { data } = await axiosInstance.post("/user/create", {
      email,
      password: hashedPassword,
      username: name,
      phone,
      user_type: "user",
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: error.response?.data.message,
      };
    }

    return {
      success: false,
      error: "Something went wrong",
    };
  }
};
