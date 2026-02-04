import crypto from "crypto";
import {
  getSession,
  deleteSession,
  createUpdateSession,
  getUserBySessionId,
} from "@/app/_lib/data-service";
import {
  COOKIE_SESSION_KEY,
  SESSION_EXPIRES_SECONDS,
} from "@/app/_lib/constants/auth";

export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax";
      expires: number;
    },
  ) => void;
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
};

//TODO- when do u get session, what routes
//get session
export async function getUserFromSession(cookies: Pick<Cookies, "get">) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;
  return getUserBySessionId(sessionId);
}

export async function createUserSession(
  userId: string,
  cookies: Pick<Cookies, "set" | "get">,
) {
  // Check for existing session
  const existingSessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (existingSessionId) await deleteSession(existingSessionId);

  const sessionId = crypto.randomBytes(512).toString("hex").normalize();
  await createUpdateSession(sessionId, userId);
  //createSession will propagate error to the server action
  setCookie(sessionId, cookies);
}

function setCookie(sessionId: string, cookies: Pick<Cookies, "set">) {
  //expiration in cookies must b a timestamp not date string
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRES_SECONDS * 1000, //expires the cookie
  });
}

export async function removeUserSession(
  cookies: Pick<Cookies, "get" | "delete">,
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;

  if (sessionId == null) return null;

  await deleteSession(sessionId);
  cookies.delete(COOKIE_SESSION_KEY);
}

////TODO- when do u get session, what routes
// Updatates a session that is still valid expiration in database and cookie
//used when user signin from the same client
export async function updateUserSessionExpiration(
  cookies: Pick<Cookies, "get" | "set">,
) {
  //confirm the sesion exists
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;
  //get the session that is still valid
  const session = await getSession(sessionId);
  if (!session) return;

  // Update session expiration in database and cookie
  await createUpdateSession(sessionId, session.id);
  setCookie(sessionId, cookies);
}
