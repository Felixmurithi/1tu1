import { getOauthClient } from "./oauthClient";
import { createUserSession } from "../session";
import { getUserByEmail, createNewUser } from "../data-service";
import { OauthProvider } from "../zod/oauth";
import { cookies } from "next/headers";

// return true if user auntheicated ahnd false if there any errors
export async function handleOauthCallback(
  provider: OauthProvider,
  code: string,
  state: string,
) {
  const client = getOauthClient(provider);

  if (!client) {
    return false;
  }

  const user = await client.fetchUser(code, state, cookies());

  // 1. Check if user exists in database
  const existingUser = await getUserByEmail(user.email);
  // 2. update session if user exists- create new not exteding time

  //3. set id
  let userId: string;
  if (existingUser) {

     userId = existingUser.id;
   
  } else {

     // Create new user if doesn't exist
    const newUser = await createNewUser(user);
    console.log("New user created:", newUser);

    userId = newUser.id;
   
  }

  // 4. Create user session and set authentication cookies
  await createUserSession(userId, cookies());

  // 5. Return success response with user data
  return true;
}
