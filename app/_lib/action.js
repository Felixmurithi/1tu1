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
  clearNotification,
} from "@/app/_lib/data-service";

export async function cancelAction(userId, dateId, name) {
  const date = null;
  const dateid = null;
  const notification = true;
  const active = false;
  const accept = false;
  const note = null;

  await updateUserData("users", { accept, date, dateid, active, note }, userId);
  await updateUserData(
    "users",
    { accept, date, dateid, notification, active, note },
    dateId
  );

  //notification
  const notificationUpdate = {
    from: userId,
    to: dateId,
    name,
    type: "cancelled",
  };
  await insertNotification(notificationUpdate);
}
export async function acceptAction(userId, dateId, name) {
  await updateUserData("users", { accept: true }, userId);

  const notificationUpdate = {
    from: userId,
    to: dateId,
    name,
    type: "accepted",
  };
  await insertNotification(notificationUpdate);
}

export async function rescheduleAction(formData) {
  const userid = formData.get("userid");
  const date = formData.get("date");
  const dateid = formData.get("dateid");
  const name = formData.get("name");
  const notification = true;
  const accept = true;

  await updateUserData("users", { date, accept }, userid);

  await updateUserData("users", { notification, date, accept: false }, dateid);

  const notificationUpdate = {
    from: userid,
    to: dateid,
    name,
    type: "rescheduled",
  };
  await insertNotification(notificationUpdate);
}

export async function getNotificationsStatusAction(id) {
  const [{ notification }] = await getUserData("notification", id);

  return notification;
}

export async function clearNotificationsNotificationAction(id) {
  await updateUserData("users", { notification: false }, id);
}

export async function clearNoficationAction(id) {
  await clearNotification(id);
}
export async function getNoficationsAction(id) {
  const data = getNofications(id);
  return data;
}

export async function updateDateAction(formData) {
  const userid = formData.get("userid");
  const date = formData.get("date");
  const dateid = formData.get("dateid");
  const name = formData.get("name");
  const notification = true;
  const active = true;
  const accept = true;

  await updateUserData("users", { dateid, date, active, accept }, userid);

  await updateUserData(
    "users",
    { active, notification, date, dateid: userid },
    dateid
  );

  const notificationUpdate = {
    from: userid,
    to: dateid,
    name,
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
