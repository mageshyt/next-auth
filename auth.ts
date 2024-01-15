import { DefaultSession } from "next-auth";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

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
      // remove id from user

      // console.log("TOKEN:", token);
      return {
        exp: token.exp,
        ...token,
        ...user,
      };
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      const { user }: any = token;

      session.user.email = user?.email as string;
      session.user.id = user?.id as string;
      session.user.name = user?.username as string;
      session.user.role = user?.role as string;
      session.user.phone = user?.phone as string;
      session.user.favoritesIds = user?.favoritesIds as string[];
      session.user.token = token.token as string;

      return session;
    },
    async signIn({ user }) {
      return true;
    },
  },

  ...authConfig,
});
