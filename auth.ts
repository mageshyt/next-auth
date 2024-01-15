import { DefaultSession } from "next-auth";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // remove id from user

      return {
        ...token,
        ...user,
      };
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      const { user }: any = token;
      console.log("USER ", user);
      session.user.email = user?.email as string;
      session.user.id = user?.id as string;
      session.user.name = user?.username as string;
      session.user.role = user?.role as string;
      session.user.phone = user?.phone as string;
      session.user.favoritesIds = user?.favoritesIds as string[];
      session.user.token = token.token as string;

      return session;
    },

  },

  ...authConfig,
});
