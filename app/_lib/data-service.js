import { error } from "console";
import { supabase, supabaseUrl } from "./supabase";

export async function updateDB(table, updatedField, userId) {
  const { data, error } = await supabase
    .from(table)
    .update(updatedField)
    .eq("id", userId)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Row could not be updated");
  }
  return data;
}

export async function getDBData(table, fields, userId) {
  let { data, error } = await supabase
    .from(table)
    .select(typeof fields == "string" ? fields : fields.join(","))
    .eq("id", userId);

  if (error) {
    console.error(error);
    throw new Error("could not fetch data");
  }

  return data;
}

export async function uploadImage(image, userId) {
  const [{ image: imageExistingPath }] = await getDBData(
    "users",
    "image",
    userId
  );

  if (imageExistingPath) {
    const deleteImageName = imageExistingPath.substr(
      imageExistingPath.lastIndexOf("/") + 1,
      imageExistingPath.length
    );
    const { data, error } = await supabase.storage
      .from("user_profile_images")
      .remove([deleteImageName]);
    if (error) throw new Error("New profile image could not be uploaded");
  }

  //  the replace all ("/", "") is a standard way of ensuring that the name passed doesnt create errors because "/" would indicate a filepath
  const imageName = `${userId}-${image.name}`.replaceAll("/", "").toLowerCase();

  // if its not a new newcabin the image path is created by attaching the supabase url and imageName
  const imagePath = `${supabaseUrl}/storage/v1/object/public/user_profile_images/${imageName}`;

  //3. To process the create cabin or edit cabin, a base query variable for referencing the cabins table in supabase is created

  // let query = supabase.from("users");
  // if (!imageExistingPath)
  //   query = query.insert({ image: imagePath }).eq("id", userId);

  const { data, error } = await supabase
    .from("users")
    .update({ image: imagePath })
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("profile image could not be uploaded");
  }

  const { error: storageError } = await supabase.storage
    .from("user_profile_images")
    .upload(imageName, image);

  if (storageError) {
    await supabase.from("users").update({ image: null }).eq("id", userId);

    console.error(storageError);
    throw new Error("New profile image could not be uploaded");
  }

  return data;
}

export async function getBirthdayGender(email) {
  let { data, error } = await supabase
    .from("users")
    .select("gender,age")
    .eq("email", email);
  if (error) {
    console.error(error);
    throw new Error("User details could not be loaded");
  }

  return data;
}

export async function createUser(newUser) {
  const { data, error } = await supabase.from("users").insert([newUser]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }
  console.log(data);

  return data;
}

// Guests are uniquely identified by their email address
export async function getUser(email) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}
