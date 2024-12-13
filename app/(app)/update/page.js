import Update from "@/app/_components/update/Update";
import { auth } from "../../_lib/auth";
import { getuserData } from "@/app/_lib/action";

export const metadata = {
  title: "About profile",
};

export default async function Page() {
  const session = await auth();
  let user = {};

  if (session?.user.userId) {
    const [{ image, gender, birthday }] = await getuserData({
      table: "users",
      fields: ["image", "gender", "birthday"],
      userId: session?.user.userId,
    });

    user.uploadedImage = image;
    user.gender = gender;
    user.birthday = birthday;
  }

  return (
    <>
      <Update
        userId={session?.user.userId}
        googleImage={user.uploadedImage ? "" : session?.user.image}
        uploadedImage={user.uploadedImage}
        gender={user.gender}
        birthday={user.birthday}
      />
    </>
  );
}
