import Update from "@/app/_components/update/Update";
import { getUserFromSession } from "@/app/_lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "About profile",
};

export default async function Page() {
  const userData = await getUserFromSession(cookies());
  console.log(userData);
  if (!userData?.id) {
    redirect("/login", "replace");
  }

  return (
    <>
      <Update
        userId={userData.id}
        userImage={userData.image}
        gender={userData.gender}
        birthday={userData.birthday}
      />
    </>
  );
}
