import Header from "@/app/_components/Header";
import Dates from "@/app/_components/dates/Dates";
import { auth } from "../_lib/auth";
import { getBirthdayGender } from "../_lib/data-service";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  // makes the entire roiutedynamic because it uses  cookies

  const data = await getBirthdayGender(session.user.email);
  console.log(data[0]);
  if (!data[0].gender || !data[0].birthday) {
    redirect("/update", "replace");
  }

  return (
    <main className="grid tracking h-full  grid-rows-[auto_1fr]">
      <Header />
      <Dates />
    </main>
  );
}

// h-full too make it same size because porent is not a grid
