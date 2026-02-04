"use client";
import OauthButtons from "@/app/_components/OauthButtons";

export default function LoginPage() {
  return (
    <main className="">
      <div className="flex flex-col gap-10 items-center pt-6">
        <OauthButtons />
      </div>
    </main>
  );
}
