import Button from "@/app/_components/Button";

export default function ProfileDetails() {
  return (
    <div className=" border-2 rounded-md bg-white p-2 grid gap-2">
      <p className="text-sm opacity-50">
        <span>⛩</span>
        <span>location</span>
        <span> splitting ☑</span>
      </p>
      <div className="grid grid-cols-[1fr_auto]">
        <div className="flex gap-2 items-center ">
          <img
            src="/jane_kimatu-profile_image.jpg"
            alt="profile picture"
            className="w-[50px] rounded-full"
          />
          <h3>Name </h3>
        </div>
        <Button />
      </div>
    </div>
  );
}
