"use server";
import { signIn, signOut } from "./auth";
import {
  getUserData,
  updateUserData,
  updateInsertLocation,
  getNearbyDatesData,
  getAllDatesData,
} from "@/app/_lib/data-service";
export async function updateDateLocation(location) {
  const data = await updateInsertLocation(location);

  // return data;
}

export async function nearbyDatesAction(long, lat, meters, userId) {
  const dates = await getNearbyDatesData(long, lat, meters, userId);

  return dates;
}
export async function allDatesAction(long, lat, userId) {
  const dates = await getAllDatesData(long, lat, userId);
  return dates;
}

export async function getUserAction({ fields, userId }) {
  const data = await getUserData(fields, userId);

  return data;
}

export async function updateUser(formData) {
  const gender = formData.get("gender");
  const birthday = formData.get("birthday");

  const userId = formData.get("userId");
  const data = await updateUserData("users", [{ gender, birthday }], userId);
  return data;
}
// update start ed workking with either array or object.

export async function signInAction() {
  await signIn("google", { redirectTo: "/dates" });
}

export async function signOutAction() {
  // signOut({ redirect: false });
  signOut({ redirectTo: "/", redirect: true });
  // signOut({ callbackUrl: "/", redirect: true });
  // await signOut("goog", { redirectTo: "/" });
  // redirect("/");

  // signOut({ redirectTo: "/", replace: true });
}
