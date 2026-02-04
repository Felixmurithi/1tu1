import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/app/_lib/oauth/handleOauthCallback";
import { OauthProviderSchema } from "@/app/_lib/zod/oauth";

export async function GET(
  request: NextRequest,
  { params }: { params: { provider: string } },
) {
  const providerResult = OauthProviderSchema.safeParse(params.provider);
  if (!providerResult.success) {
    return NextResponse.redirect(
      new URL("/login?error=invalid_provider", request.url),
    );
  }

  const provider = providerResult.data;
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(new URL(`/login?error=${error}`, request.url));
  }

  if (!code || !state) {
    return NextResponse.redirect(
      new URL("/login?error=missing_params", request.url),
    );
  }

  const authenticated = await authenticate(provider, code, state);

  if (authenticated) return NextResponse.redirect("/dates");

  //if error mean authenticated is faalse
  return NextResponse.redirect(
    new URL("/login?error=oauth_failed", request.url),
  );
}
