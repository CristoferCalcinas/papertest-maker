import NextAuth, { DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
// import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";

import { signInSchema } from "./schemas/auth-schemas";

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
      console.log({ token });
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
    // Facebook,
    Credentials({
      authorize: async (credentials) => {
        let user = null;

        const { email, password } = await signInSchema.parseAsync(credentials);

        if (!email || !password) return null;

        console.log({ email, password });

        // logic to salt and hash password
        //   const pwHash = saltAndHashPassword(password);

        // logic to verify if the user exists
        //   user = await getUserFromDb(email, pwHash);

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        // return JSON object with the user data
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-user",
  },
});
