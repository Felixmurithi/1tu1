import { supabase } from "./supabase";

export async function getBirthdayGender(email) {
  let { data, error } = await supabase
    .from("users")
    .select("gender,birthday")
    .eq("email", email);
  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function createUser(newUser) {
  const { data, error } = await supabase.from("users").insert([newUser]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

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
