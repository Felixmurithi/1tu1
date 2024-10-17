"use server";

import fsp from "fs/promises";
import path from "path";

import readFileData from "@/app/_lib/readFileData";

export async function signup(signupData) {
  const dataFilePath = path.join(process.cwd(), "/app/_lib/users.json");

  const jsonData = await readFileData("/app/_lib/users.json");

  const writeData = {
    ...jsonData,
    [`${signupData.firstName}_${signupData.lastName}`.toLowerCase()]: {
      signupData,
    },
  };

  await fsp.writeFile(dataFilePath, JSON.stringify(writeData));

  // return "user sign up success";
}
export async function uploadProfileImage(image) {
  const file = image.get("image");
  const user = image.get("user");
  const ext = file.name.split(".")[1];
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const dataFilePath = path.join(process.cwd(), "/app/_lib/users.json");

  await fsp.writeFile(`./public/${user}-profile_image.${ext}`, buffer);
  const jsonData = await readFileData("/app/_lib/users.json");

  const writeData = {
    ...jsonData,
    [user]: {
      ...jsonData[user],
      profileImage: `${user}-profile_image.${ext}`,
    },
  };

  console.log(writeData);

  await fsp.writeFile(dataFilePath, JSON.stringify(writeData));
}

export async function deleteprofileImage({ profileImage, user }) {
  // console.log(profileImage);
  await fsp.rm(`./public/${profileImage}`, { recursive: true, force: true });

  //fix json data
  const dataFilePath = path.join(process.cwd(), "/app/_lib/users.json");
  const jsonData = await readFileData("/app/_lib/users.json");

  const writeData = {
    ...jsonData,
    [user]: {
      ...jsonData[user],
      profileImage: "",
    },
  };

  await fsp.writeFile(dataFilePath, JSON.stringify(writeData));
}

export async function updateProfile(updateData) {
  const dataFilePath = path.join(process.cwd(), "/app/_lib/users.json");
  const jsonData = await readFileData("/app/_lib/users.json");

  const writeData = {
    ...jsonData,
    [updateData.user]: {
      ...jsonData[updateData.user],
      [updateData.item]: updateData.data,
    },
  };

  console.log(updateData);
  await fsp.writeFile(dataFilePath, JSON.stringify(writeData));
}
// in the node process

// TO DO
// u cant use num,bers as object keys
