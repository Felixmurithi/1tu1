import Select from "@/app/_components/Select";
import Button from "@/app/_components/Button";
import ProfileCard from "@/app/_components/dates/ProfileCard";

function DatesList() {
  return (
    <div className=" grid grid-rows-[auto_1fr] gap-4">
      <div className="flex px-2">
        <Select
          text={"distance"}
          options={["near me", "5 km", "10km", "20km", "50km"]}
        />
        <Button type="icon">🎬 filters</Button>
      </div>

      <div className="p-2 grid grid-rows-[auto_1fr] gap-4   content-start  ">
        <h4 className="font-sm font-extralight border-b">near you</h4>
        <div className="relative">
          <div className=" overflow-y-auto absolute top-0 bottom-0 right-0 left-0 grid content-start gap-4">
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            {/* <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatesList;
// grid item streatches to fit height
