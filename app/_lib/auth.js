import NextAuth from "next-auth";

import Google from "next-auth/providers/google";
import { createNewUser, getUserByEmail } from "./data-service";

// starts of api/auth/signin- the signIn page option used to replace the defualt
//

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // this callback will run when the auth function used as middleware  runs
    authorized({ auth, request }) {
      return !!auth?.user;
    },

    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getUserByEmail(user.email);
        if (!existingGuest) {
          await createNewUser({
            email: user.email,
            name: user.name,
            image: user.image,
          });
        }

        return true;
      } catch {
        return false;
      }
    },

    async session({ session, user }) {
      const userData = await getUserByEmail(session.user.email);
      session.user.userId = userData.id;
      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   console.log(baseUrl, url);
    //   return baseUrl + "/";
    // },
  },

  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
// next auth function called with the config to automate those things

// the callbacks
