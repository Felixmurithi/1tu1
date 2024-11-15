import Profile from "@/app/_components/user/profile/Profile";
import Dating from "@/app/_components/user/profile/Dating";
import Interest from "@/app/_components/user/profile/Interest";
import Header from "@/app/_components/Header";

function User() {
  return (
    <main>
      <Header />
      <div className="grid gap-10">
        <Profile />
        <div className="grid gap-6 bg-grey p-4 mx-10">
          {/* <Dating /> */}
          <Interest />

          {/* <Preferences /> */}
        </div>
      </div>
    </main>
  );
}

export default User;
