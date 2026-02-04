"use client"; // REQUIRED at the top

import useGoogleAuth from "@/app/hooks/useGoogleAuth";

const LoginComponent = () => {
  const { signIn, signOut, user, isInitialized } = useGoogleAuth(
    process.env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_ID,
  );

  console.log(user);

  if (!isInitialized) return <div>Loading...</div>;

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
          <img
            src={user.imageUrl}
            alt="User avatar"
            height="24"
            width="24"
            className="rounded-full"
          />
          <span>Welcome, {user.name}!</span>
          <button onClick={signOut} className="ml-auto text-sm underline">
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={signIn}
          className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium"
        >
          <img
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
            height="24"
            width="24"
          />
          <span>Continue with Google</span>
        </button>
      )}
    </div>
  );
};

export default LoginComponent;
