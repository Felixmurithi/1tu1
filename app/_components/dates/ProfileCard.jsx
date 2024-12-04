export default function ProfileCard() {
  return (
    <div className=" border-2 rounded-xl bg-white p-2 grid gap-2 shadow-md">
      <div className="grid grid-cols-[1fr_auto]">
        <div className="flex gap-2 items-center ">
          <img
            src="/jane_kimatu-profile_image.jpg"
            alt="profile picture"
            className="w-[30px] rounded-full"
          />
          <h4 className="w-max font-bold text-lg">Jane Kimatu </h4>
        </div>
      </div>
      <p className="w-max text-sm font-light ">Kilimanjaro Restuarant</p>
    </div>
  );
}
