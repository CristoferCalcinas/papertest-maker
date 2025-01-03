import NextAuth, { DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";

import { signInSchema } from "./schemas/auth-schemas";
import bcryptjs from "bcryptjs";

// ref: https://authjs.dev/getting-started/typescript
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      roleId: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      // console.log({ user });
      return true;
    },
    jwt: async ({ token, user, account, profile }) => {
      // console.log({ token, user, account, profile, isNewUser });
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email ?? "no-email" },
      });
      token.id = dbUser?.id ?? "no-uuid";
      token.roleId = dbUser?.roleId ?? "no-role-id";

      return token;
    },
    session: async ({ session, token, user }) => {
      // console.log({ session, token, user });
      if (session && session.user) {
        session.user.id = token.id as string;
        session.user.roleId = token.roleId as string;
      }

      return session;
    },
  },
  providers: [
    GitHub,
    Google,
    Facebook,
    Credentials({
      authorize: async (credentials) => {
        let user = null;

        const { email, password } = await signInSchema.parseAsync(credentials);

        if (!email || !password) return null;

        user = await prisma.user.findUnique({ where: { email } });

        if (!user) return null;

        if (!bcryptjs.compareSync(password, user.password as string))
          return null;

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-user",
  },
});
