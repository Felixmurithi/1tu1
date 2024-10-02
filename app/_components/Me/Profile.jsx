import Interests from "./Interests";
import ProfileCard from "./ProfileCard";
import Preferences from "./Preferences";
import Button from "../Button";

export default function Profile() {
  return (
    <div className="grid gap-8 pt-6 pr-6 h-fit">
      <ProfileCard />
      <Interests />

      <Preferences />
      <Button type="transparent" classes={"self-start"}>
        Edit profile 🖊
      </Button>
    </div>
  );
}
