import { redirect } from "next/navigation";
import getAge from "@/app/_utils/getAge";
import { getMyDateLocation, getUserData } from "@/app/_lib/data-service";
import Dates from "@/app/_components/dates/Dates";
import { requireAuth } from "@/app/_lib/auth";

export const metadata = {
  title: "Find dates",
};

export default async function page() {
  const userData = await requireAuth();
  // const session = await auth();
  // makes the entire roiutedynamic because it uses  cookies
  if (!userData.id) redirect("/login");
  Object.assign(userData, {
    ...userData,
    age: getAge(userData.birthday),
  });

  let myDate;
  const [date] = await getMyDateLocation(userData.id);
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

  if (!userData.gender || !userData.age) {
    redirect("/update", "replace");
  }

  return (
    <>
      <Dates
        userId={userData.userId}
        image={userData.image || userData.id}
        gender={userData.gender}
        name={userData.id}
        myDate={myDate}
        dateid={userData.dateid}
        userNotification={userData.notification}
      />
    </>
  );
}

// h-full too make it same size because porent is not a grid
