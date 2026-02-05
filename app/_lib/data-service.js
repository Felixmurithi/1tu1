import { supabase, supabaseUrl } from "./supabase";
import { SESSION_EXPIRES_SECONDS } from "./constants/auth";

export async function clearNotification(id) {
  const { data, error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("error clearing notification");
  }
}
export async function clearNotifications(notifications) {
  const { data, error } = await supabase
    .from("notifications")
    .upsert(notifications);

  if (error) {
    console.error(error);
    throw new Error("error updating notifications status");
  }
}

export async function getNofications(id) {
  const { data, error } = await supabase
    .from("notifications")
    .select("name, type, id")
    .eq("to", id)
    .eq("read", false);

  if (data) return data;

  if (error) {
    console.error(error);
    throw new Error("Error fetching notifactions");
  }
}

export async function insertDate(date) {
  const { data, error } = await supabase.from("dates").insert([date]);

  if (error) {
    console.error(error);
    throw new Error("Date could not be created");
  }
}
export async function insertNotification(notification) {
  const { data, error } = await supabase
    .from("notifications")
    .insert([notification]);

  if (error) {
    console.error(error);
    throw new Error("Date could not be created");
  }
}

export async function updateInsertDate(date) {
  const { data, error } = await supabase
    .from("dates")
    .select("userid")
    .eq("userid", date.userid);

  if (error) {
    console.error(error);
    throw new Error("Error updating date");
  }

  if (data[0]) {
    const { data, error } = await supabase
      .from("dates")
      .update(location)
      .eq("userid", location.userid);

    if (error) {
      console.error(error);
      throw new Error("Date could not be updated");
    }
  } else {
    const { data, error } = await supabase.from("dates").insert([location]);

    if (error) {
      console.error(error);
      throw new Error("Date could not be created");
    }
  }
}

export async function getMyDateLocation(userid) {
  const { data, error } = await supabase
    .from("locations")
    .select("*")
    .eq("userid", userid);

  if (data) return data;

  if (error) {
    console.error(error);
    throw new Error("Error fetching location");
  }
}

export async function getAllDatesData(long, lat, currentuserid) {
  const { data, error } = await supabase.rpc("all_dates", {
    long,
    lat,
    currentuserid,
  });

  if (data) return data;

  if (error) {
    console.error(error);
    throw new Error("Error fetching dates");
  }
}

export async function getNearbyDatesData(long, lat, meters, currentuserid) {
  const { data, error } = await supabase.rpc("nearby_dates", {
    long,
    lat,
    meters,
    currentuserid,
  });

  if (data) return data;

  if (error) {
    console.error(error);
    throw new Error("Error fetching nearby dates");
  }
}

export async function updateInsertLocation(location) {
  const { data, error } = await supabase
    .from("locations")
    .select("userid")
    .eq("userid", location.userid);

  if (error) {
    console.error(error);
    throw new Error("Error updating location");
  }

  if (data[0]) {
    const { data, error } = await supabase
      .from("locations")
      .update(location)
      .eq("userid", location.userid);

    if (error) {
      console.error(error);
      throw new Error("Location could not be updated");
    }
  } else {
    const { data, error } = await supabase.from("locations").insert([location]);

    if (error) {
      console.error(error);
      throw new Error("Location could not be created");
    }
  }
}

export async function updateUserData(table, updatedField, userId) {
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

export async function getUserLocationData(fields, userId) {
  let { data, error } = await supabase
    .from("locations")
    .select(typeof fields == "string" ? fields : fields.join(","))
    .eq("userid", userId);

  if (error) {
    console.error(error);
    throw new Error("could not fetch data");
  }

  return data;
}
export async function getUserData(fields, userId) {
  let { data, error } = await supabase
    .from("users")
    .select(typeof fields == "string" ? fields : fields.join(","))
    .eq("id", userId);

  if (error) {
    console.error(error);
    throw new Error("could not fetch data");
  }

  return data;
}

export async function uploadImage(image, userId) {
  const [{ image: imageExistingPath }] = await getUserData(
    "users",
    "image",
    userId,
  );

  if (imageExistingPath) {
    const deleteImageName = imageExistingPath.substr(
      imageExistingPath.lastIndexOf("/") + 1,
      imageExistingPath.length,
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

export async function createNewUser(newUser) {
  const { data, error } = await supabase
    .from("users")
    .insert([newUser])
    .select("id")
    .single();
  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

// Guests are uniquely identified by their email address
export async function getUserByEmail(email) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  //   // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function createUpdateSession(sessionId, userId) {
  const sessionData = {
    session_id: sessionId,
    session_created_at: new Date().toISOString(),
    session_expires_at: new Date(
      Date.now() + SESSION_EXPIRES_SECONDS * 1000,
    ).toISOString(), // 7 days
  };

  const { error } = await supabase
    .from("users")
    .update(sessionData)
    .eq("id", userId);
  if (error) {
    console.error(error);
    throw new Error("Session could not be created");
  }
}

export async function getSession(sessionId) {
  const { data, error } = await supabase
    .from("users")
    .select("session_id, session_created_at, session_expires_at, id")
    .eq("session_id", sessionId)
    .gt("session_expires_at", new Date().toISOString())
    .single();
  if (error) {
    console.error(error);
    return null;
  }
  return data;
}

export async function deleteSession(sessionId) {
  const { error } = await supabase
    .from("users")
    .update({
      session_id: null,
      session_created_at: null,
      session_expires_at: null,
    })
    .eq("session_id", sessionId);
  if (error) {
    console.error(error);
    throw new Error("Session could not be deleted");
  }
}

export async function getUserBySessionId(sessionId) {
  const { data, error } = await supabase
    .from("users")
    .select("id, email, name, image, birthday, gender, dateid")
    .eq("session_id", sessionId)
    .gt("session_expires_at", new Date().toISOString())
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}
