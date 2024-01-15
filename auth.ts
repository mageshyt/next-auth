import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "@auth/core/providers/credentials";
import { axiosInstance } from "./lib/axios";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        const res = await axiosInstance.post("/auth/login", credentials);
        const user = res.data;

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});
