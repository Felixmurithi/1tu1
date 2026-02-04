"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getOauthClient } from "@/app/_lib/oauth/oauthClient";
import type { OauthProvider } from "@/app/_lib/zod/oauth";

export async function oauthSignin(provider: OauthProvider) {
  const client = getOauthClient(provider);
  const authUrl = client?.createAuthUrl(cookies());
  redirect(authUrl);
}
