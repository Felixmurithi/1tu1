"use server";
import { auth, signIn, signOut } from "./auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/dates" });
}

export async function signOutAction() {
  await signOut("google", { redirectTo: "/" });
}
