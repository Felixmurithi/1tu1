import { OauthClient } from "@/app/_lib/oauth/oauthClient";
import { z } from "zod";

export function createGoogleOauthClient() {
  return new OauthClient({
    provider: "google",
    clientId: process.env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_ID!,
    clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET!,
    scopes: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    urls: {
      auth: "https://accounts.google.com/o/oauth2/v2/auth",
      token: "https://oauth2.googleapis.com/token",
      user: "https://www.googleapis.com/oauth2/v2/userinfo",
    },
    userInfo: {
      schema: z.object({
        name: z.string(),
        email: z.string(),
        picture: z.string(),
        email_verified: z.boolean().optional(),
        given_name: z.string().optional(),
        family_name: z.string().optional(),
        sub: z.string().optional(),
      }),
      parser: (user) => ({
        email: user.email,
        name: user.name,
        image: user.picture,
        email_verified: user.email_verified,
        first_name: user.given_name,
        last_name: user.family_name,
        oauth_provider: "google",
        oauth_id: user.sub, // Using email as ID if no specific OAuth ID is provided
      }),
    },
  });
}
