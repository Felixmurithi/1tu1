"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getOauthClient } from "@/app/_lib/oauth/oauthClient";
import type { OauthProvider } from "@/app/_lib/zod/oauth";
import { removeUserSession } from "@/app/_lib/session";

export async function oauthSignin(provider: OauthProvider) {
  const client = getOauthClient(provider);
  const authUrl = client?.createAuthUrl(cookies());
  redirect(authUrl);
}
export async function signOutAction() {
  try {
    // Remove the session from the database and clear the cookie
    await removeUserSession(cookies());
    // Redirect to home page after successful signout
    redirect("/");
  } catch (error) {
    console.error("Signout error:", error);
    // Still redirect even if there was an error
    redirect("/");
  }
}
