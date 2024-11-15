import User from "@/app/_components/user/User";
import { auth } from "@/app/_lib/auth";

export default async function Page() {
  const session = await auth();
  // makes the entire roiutedynamic because it uses  cookies
  console.log(session);

  return <User />;
}
