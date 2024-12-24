import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
// import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./schemas/auth-schemas";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    // Google,
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
