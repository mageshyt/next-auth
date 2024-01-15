"use server";

import { axiosInstance } from "@/lib/axios";
import { LoginSchema } from "@/schemas";
import axios from "axios";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  try {
    const validateFields = LoginSchema.safeParse(values);
    if (!validateFields.success) {
      return {
        status: false,
        error: "Invalid Fields",
      };
    }
    const { data } = await axiosInstance.post("/auth/login", {
      email: values.email,
      password: values.password,
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
