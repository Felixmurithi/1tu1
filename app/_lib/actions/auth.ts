"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getOauthClient } from "@/app/_lib/oauth/oauthClient";
import type { OauthProvider } from "@/app/_lib/zod/oauth";
import { removeUserSession } from "@/app/_lib/session";
import type { Cookies } from "@/app/_lib/session";

export async function oauthSignin(provider: OauthProvider) {
  const client = getOauthClient(provider);
  const cookieStore = await cookies();
  const authUrl = client?.createAuthUrl(
    cookieStore as unknown as Pick<Cookies, "set">,
  );
  redirect(authUrl);
}
export async function signOutAction() {
  // Remove the session from the database and clear the cookie
  await removeUserSession(await cookies());
  // Redirect to home page after successful signout
  redirect("/");
}
