import SignInButton from "@/app/_components/SignInButton";
import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login",
};

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect("/dates", "replace");
  }
  return (
    <main className="">
      <div className="flex flex-col gap-10  items-center pt-6">
        <h2 className="text-3xl font-semibold">Sign in with Google</h2>
        <SignInButton />
      </div>
    </main>
  );
}
