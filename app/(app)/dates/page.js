import { redirect } from "next/navigation";
import { auth } from "@/app/_lib/auth";
import DatesQueryClient from "@/app/_components/dates/DatesQueryClient";
import getAge from "@/app/_utils/getAge";
import { getMyDateLocation, getUserData } from "@/app/_lib/data-service";
import Dates from "@/app/_components/dates/Dates";

export const metadata = {
  title: "Find dates",
};

export default async function page() {
  const session = await auth();
  // makes the entire roiutedynamic because it uses  cookies

  let user = {};
  let myDate;

  if (session?.user.userId) {
    const [{ gender, birthday, image, notification }] = await getUserData(
      ["gender", "birthday", "image", "notification"],
      session?.user.userId
    );
    user.image = image;
    user.gender = gender;
    user.notification = notification;
    user.age = getAge(birthday);

    const [date] = await getMyDateLocation(session.user.userId);
    if (date?.name) {
      myDate = {
        ...date,
        location: {
          lng: date.latlng.coordinates[0],
          lat: date.latlng.coordinates[1],
        },
      };
      delete myDate.latlng;
    }

    // const [dates] = await getAllDatesData(36.9243896, -1.2023038, 5);

    // const dates = await getNearbyDatesData(36.9243896, -1.2023038, 20000, 5);
    // select nearby_dates(36.9243896, -1.2023038,20000, 5);

    // nearby_dates(36.9243896, -1.2023038,20000, 5);

    // console.log(dates);
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
        myDate={myDate}
        notification={user.notification}
      />
    </>
  );
}

// h-full too make it same size because porent is not a grid
