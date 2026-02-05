import { z } from "zod";
import crypto from "crypto";
import { createGoogleOauthClient } from "@/app/_lib/oauth/createGoogleOauthClient";
import type { Cookies } from "@/app/_lib/session";
import { OauthProvider } from "../zod/oauth";
import { decodeJWT } from "../utils/jwt";

const STATE_COOKIE_KEY = "oauthState";
const CODE_VERIFIER_COOKIE_KEY = "oauthCodeVerifier";
// Ten minutes in seconds
const COOKIE_EXPIRATION_SECONDS = 60 * 10;

export class OauthClient<T> {
  private readonly provider: string;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly scopes: string[];
  private readonly urls: {
    auth: string;
    token: string;
    user: string;
  };
  private readonly userInfo: {
    schema: z.ZodSchema<T>;
    parser: (data: T) => {
      
      email: string;
      name: string;
      picture?: string | null;
      verifiedEmail?: boolean;
      givenName?: string;
      familyName?: string;
      locale?: string;
      firstName?: string;
      secondName?: string;
      oauth_provider?: string;
      oauth_id?: string;
    };
    //T is  a placeholder for any type
  };
  private readonly tokenSchema = z.object({
    access_token: z.string(),
    token_type: z.string(),
    id_token: z.string().optional(),
  });

  constructor({
    provider,
    clientId,
    clientSecret,
    scopes,
    urls,
    userInfo,
  }: {
    provider: string;
    clientId: string;
    clientSecret: string;
    scopes: string[];
    urls: {
      auth: string;
      token: string;
      user: string;
    };
    userInfo: {
      schema: z.ZodSchema<T>;
      parser: (data: T) => {
        email: string;
        name: string;
        image?: string | null;
        email_verified?: boolean;
        first_name?: string;
        last_name?: string;
        oauth_provider?: string;
        oauth_id?: string;
      }; // this type is not linked to any specific provider but provides
    };
  }) {
    this.provider = provider;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.scopes = scopes;
    this.urls = urls;
    this.userInfo = userInfo;
  }

  private get redirectUrl() {
    return new URL(
      `/api/oauth/${this.provider}`,
      process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URL_BASE ||
        "http://localhost:3000",
    );
  }

  createAuthUrl(cookies: Pick<Cookies, "set">) {
    // state is stored in a cookie before sending the request to the provider - received back as param in the redirect uri
    const state = createState(cookies);
    // the codeVerifier is hashed and sent to the server and then used to access the token this is after the code is retrieved
    const codeVerifier = createCodeVerifier(cookies);
    const url = new URL(this.urls.auth);
    url.searchParams.set("client_id", this.clientId);
    url.searchParams.set("redirect_uri", this.redirectUrl.toString());
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", this.scopes.join(" "));
    url.searchParams.set("state", state);
    url.searchParams.set("code_challenge_method", "S256");
    url.searchParams.set(
      "code_challenge",
      crypto.createHash("sha256").update(codeVerifier).digest("base64url"),
    );
    return url.toString();
  }

  async fetchUser(code: string, state: string, cookies: Pick<Cookies, "get">) {
    const isValidState = validateState(state, cookies);
    if (!isValidState) throw new InvalidStateError();

    const { accessToken, tokenType, idToken } = await this.fetchToken(
      code,
      getCodeVerifier(cookies),
    );

    // Try to get user info from JWT token first (faster, no network call)
    if (idToken) {
      try {
        //zod schema validation
        const userInfoFromToken = decodeJWT(idToken);

        const parseResult = this.userInfo.schema.safeParse(userInfoFromToken);

        if (parseResult.success) {
          //object parsing
          return this.userInfo.parser(parseResult.data);
        }
      } catch (error) {
        console.warn("JWT failed, using API:", error);
      }
    }

    // Fallback to API call
    const rawData = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      },
    ).then((res) => res.json());

    const parseResult = this.userInfo.schema.safeParse(rawData);
    if (!parseResult.success) throw new InvalidUserError(parseResult.error);

    return this.userInfo.parser(parseResult.data);
  }

  private fetchToken(code: string, codeVerifier: string) {
    return fetch(this.urls.token, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        code,
        redirect_uri: this.redirectUrl.toString(),
        grant_type: "authorization_code",
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code_verifier: codeVerifier,
      }),
    })
      .then((res) => res.json())
      .then((rawData) => {
        const { data, success, error } = this.tokenSchema.safeParse(rawData);

        if (!success) throw new InvalidTokenError(error);

        return {
          accessToken: data.access_token,
          tokenType: data.token_type,
          idToken: data.id_token,
        };
      });
  }
}

export function getOauthClient(provider: OauthProvider) {
  switch (provider) {
    case "google":
      return createGoogleOauthClient();
    default:
      throw new Error(`Unsupported OAuth provider: ${provider}`);
  }
}

class InvalidTokenError extends Error {
  constructor(zodError: z.ZodError) {
    super("Invalid Token");
    this.cause = zodError;
  }
}

class InvalidUserError extends Error {
  constructor(zodError: z.ZodError) {
    super("Invalid User");
    this.cause = zodError;
  }
}

class InvalidStateError extends Error {
  constructor() {
    super("Invalid State");
  }
}

class InvalidCodeVerifierError extends Error {
  constructor() {
    super("Invalid Code Verifier");
  }
}

function createState(cookies: Pick<Cookies, "set">) {
  const state = crypto.randomBytes(64).toString("hex").normalize();
  cookies.set(STATE_COOKIE_KEY, state, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + COOKIE_EXPIRATION_SECONDS * 1000,
  });
  return state;
}

function createCodeVerifier(cookies: Pick<Cookies, "set">) {
  const codeVerifier = crypto.randomBytes(64).toString("hex").normalize();
  cookies.set(CODE_VERIFIER_COOKIE_KEY, codeVerifier, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + COOKIE_EXPIRATION_SECONDS * 1000,
  });
  return codeVerifier;
}

function validateState(state: string, cookies: Pick<Cookies, "get">) {
  const cookieState = cookies.get(STATE_COOKIE_KEY)?.value;
  return cookieState === state;
}

function getCodeVerifier(cookies: Pick<Cookies, "get">) {
  const codeVerifier = cookies.get(CODE_VERIFIER_COOKIE_KEY)?.value;
  if (codeVerifier == null) throw new InvalidCodeVerifierError();
  return codeVerifier;
}
