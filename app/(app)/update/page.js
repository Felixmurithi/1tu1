import Update from "@/app/_components/update/Update";
import { auth } from "../../_lib/auth";
import { getUserData } from "@/app/_lib/data-service";

export const metadata = {
  title: "About profile",
};

export default async function Page() {
  const session = await auth();
  let user = {};

  if (session?.user.userId) {
    const [{ image, gender, birthday }] = await getUserData(
      ["image", "gender", "birthday"],
      session?.user.userId,
    );
    user.image = image;
    user.gender = gender;
    user.birthday = birthday;
  }

  return (
    <>
      <Update
        userId={session?.user.userId}
        userImage={user.image}
        gender={user.gender}
        birthday={user.birthday}
      />
    </>
  );
}
