import Header from "@/app/_components/Header";
import SignInButton from "@/app/_components/SignInButton";

export const metadata = {
  title: "Login",
};

export default function Page() {
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
