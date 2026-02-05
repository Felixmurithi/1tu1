import { getUserFromSession } from "./session";
import { cookies } from "next/headers";
import type { Cookies } from "./session";

// Server-side auth helper for protecting routes
export async function requireAuth() {
  const user = await getUserFromSession(cookies());
 
  return user;
}

// Get current user without throwing error
export async function getCurrentUser() {
  try {
    return await getUserFromSession(cookies());
  } catch {
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
