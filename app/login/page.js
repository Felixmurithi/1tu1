import Header from "@/app/_components/Header";
import SignInButton from "@/app/_components/SignInButton";
import { auth } from "../_lib/auth";
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
      <Header />

      <div className="flex flex-col gap-10 mt-10 items-center border-t-2 pt-6">
        <h2 className="text-3xl font-semibold">Sign in with Google</h2>
        <SignInButton />
      </div>
    </main>
  );
}
