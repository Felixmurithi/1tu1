import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUser } from "./data-service";

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
  },

  async signIn({ user, account, profile }) {
    try {
      const existingGuest = await getUser(user.email);
      if (!existingGuest)
        await createGuest({
          email: user.email,
          fullName: user.name,
        });

      return true;
    } catch {
      return false;
    }
  },

  async session({ session, user }) {
    const guest = await getUser(session.user.email);
    session.user.guestId = guest.id;
    return session;
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
