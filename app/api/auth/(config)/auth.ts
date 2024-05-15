import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const config = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_CLIENT_ID ?? "",
      clientSecret: process.env.NEXTAUTH_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
      checks: ["none"],
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/",
    newUser: "/",
    signIn: "/",
    signOut: "/",
    verifyRequest: "/",
  },
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
