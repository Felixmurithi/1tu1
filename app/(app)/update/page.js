import Update from "@/app/_components/update/Update";
import { requireAuth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "About profile",
};

export default async function Page() {
  const userData = await requireAuth();
  console.log(userData);
  // const session = await auth();
  // makes the entire roiutedynamic because it uses  cookies
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
