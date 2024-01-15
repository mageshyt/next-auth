import { NextAuthConfig } from "./node_modules/next-auth/lib/index.d";
import { axiosInstance } from "./lib/axios";
import { LoginSchema } from "./schemas";
import credentials from "next-auth/providers/credentials";

export default {
  providers: [
    credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);
        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const { data, status } = await axiosInstance.post("/auth/login", {
            email,
            password,
            credentials: true,
          });

          if (status === 200) {
            return {
              success: true,
              ...data,
            };
          }

          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
