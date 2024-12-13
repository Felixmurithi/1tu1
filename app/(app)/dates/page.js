import { redirect } from "next/navigation";
import { auth } from "@/app/_lib/auth";
import Dates from "@/app/_components/dates/Dates";
import getAge from "@/app/_utils/getAge";
import { getuserData } from "@/app/_lib/action";

export const metadata = {
  title: "Find dates",
};

export default async function page() {
  const session = await auth();
  // makes the entire roiutedynamic because it uses  cookies

  let user = {};

  if (session?.user.userId) {
    const [{ gender, birthday, image }] = await getuserData({
      table: "users",
      fields: ["gender", "birthday", "image"],
      userId: session?.user.userId,
    });
    user.image = image;
    user.gender = gender;
    user.age = getAge(birthday);
  }

  if (!user.gender || !user.age) {
    redirect("/update", "replace");
  }

  return (
    <>
      <Dates
        userId={session?.user.userId}
        image={user.image || session?.user.image}
        gender={user.gender}
        name={session?.user.name}
      />
    </>
  );
}

// h-full too make it same size because porent is not a grid
