"use server";
import { signIn, signOut } from "./auth";
import { getDBData, updateDB } from "@/app/_lib/data-service";

export async function updateDatelocation({ location, userId }) {
  const data = await updateDB("locations", data, userId);

  return data;
}

export async function getuserData({ table, fields, userId }) {
  const data = await getDBData(table, fields, userId);

  return data;
}

export async function updateUser(formData) {
  const gender = formData.get("gender");
  const birthday = formData.get("birthday");

  const userId = formData.get("userId");
  const data = await updateDB("users", [{ gender, birthday }], userId);
  return data;
}
// update start ed workking with either array or object.

export async function signInAction() {
  await signIn("google", { redirectTo: "/dates" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/", redirect: true });

  // signOut({ redirectTo: "/", replace: true });
}
