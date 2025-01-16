"use server";
import { signIn, signOut } from "./auth";
import {
  getUserData,
  updateUserData,
  updateInsertLocation,
  getNearbyDatesData,
  getAllDatesData,
  insertDate,
  insertNotification,
  getNofications,
} from "@/app/_lib/data-service";

export async function getNoficationsAction(ids) {
  console.log(ids);
  // const data = getNofications(ids);
  // return data;
}

export async function updateDateAction(formData) {
  const userid = formData.get("userid");
  const date = formData.get("date");
  const dateid = formData.get("dateid");
  const notification = true;
  const active = true;

  await updateUserData("users", { dateid, date, active }, userid);

  await updateUserData("users", { active, notification }, dateid);

  const notificationUpdate = {
    from: userid,
    to: dateid,

    type: "request",
  };

  await insertNotification(notificationUpdate);
}

// 'request',
// 'accepted',
// 'rejected',
// 'cancelled',
// 'rescheduled

export async function updateDateLocationAction(location) {
  const data = await updateInsertLocation(location);

  // return data;
}

export async function insertDateAction(formData) {
  // {userdateid, :date.userid, userid:userId, date, }
  const userid = formData.get("userid");
  const userdateid = formData.get("userdateid");
  const date = formData.get("date");

  await insertDate({ userid, userdateid, date });
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
  await signOut({ redirectTo: "/", redirect: true });
  // signOut({ callbackUrl: "/", redirect: true });
  // await signOut("goog", { redirectTo: "/" });
  // redirect("/");

  // signOut({ redirectTo: "/", replace: true });
}
