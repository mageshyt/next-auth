import { DefaultSession } from "next-auth";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  events: {},
  pages: {
    signIn: "/auth/api",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    // max age should be 15 days
    // maxAge: 15 * 24 * 60 * 60,
    maxAge: 2 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      // const existingAccount = await getAccountByUserId(existingUser.id);

      // token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      // if (session.user) {
      //   session.user.isTwoFactorEnabled =
      // }
      //     token.isTwoFactorEnabled as boolean;

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role as UserRole;
        session.user.phone = token.phone as string;

        // session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async signIn({ user }) {
      return true;
    },
  },

  adapter:PrismaAdapter(db),
  ...authConfig,
});
