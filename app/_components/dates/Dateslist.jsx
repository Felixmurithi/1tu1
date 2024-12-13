import Select from "@/app/_components/Select";
import Button from "@/app/_components/Button";
import ProfileCard from "@/app/_components/dates/ProfileCard";

function DatesList() {
  return (
    <div className="">
      <div className="p-2 grid grid-rows-[auto_1fr] gap-4 h-full   ">
        <h4 className="font-sm font-extralight border-b">near you</h4>
        <div className="relative ">
          <div className=" overflow-y-auto absolute top-0 bottom-0 right-0 left-0 grid  gap-4  z-40">
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatesList;
// grid items streatche if cols or rows height heights or fractions defined
//
// content-start - makes relative positioned element lose height if children elements  are absolute,
