import SpinnerMini from "@/app/_components/SpinnerMini";
import { nearbyDatesAction } from "@/app/_lib/action";
import { useEffect, useState } from "react";
import LikeUnlike from "../LikeUnlike";

export default function DatesList({
  allDates,
  loading,
  setLoading,
  setAllDates,
  dateLocation,
  userId,
  setUserDetails,
}) {
  const [radius, setRadius] = useState();

  useEffect(
    function () {
      if (!radius) return;

      async function getDates() {
        setLoading(true);
        const dates = await nearbyDatesAction(
          dateLocation.location.lng,
          dateLocation.location.lat,
          radius,
          userId
        );
        setLoading(false);
        setAllDates(dates);
      }

      getDates();
    },
    [radius]
  );

  return (
    <div className="">
      <div className="p-2 grid grid-rows-[auto_1fr] gap-4 h-full   ">
        <div className="flex text-sm font-extralight border-b gap-6">
          <h4 className="  ">near you</h4>
          <select
            name=""
            id=""
            className=""
            onChange={(e) => setRadius(+e.target.value * 1000)}
          >
            <option hidden>distance</option>
            <option value="2">2 Km</option>
            <option value="5">5 Km</option>
            <option value="10">10 Km</option>
            <option value="20">20 Km</option>
            <option value="40">40 Km</option>
          </select>
        </div>
        <div className="relative ">
          <div className=" overflow-y-auto absolute top-0 bottom-0 right-0 left-0 grid  gap-4  z-40 content-start">
            {loading ? (
              <SpinnerMini />
            ) : allDates?.[0] ? (
              <AllDates allDates={allDates} setUserDetails={setUserDetails} />
            ) : (
              <p>dates near you</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AllDates({ allDates, setUserDetails }) {
  return allDates.map((date, i) => (
    <UserCard date={date} key={i} setUserDetails={setUserDetails} />
  ));
}
// grid items streatche if cols or rows height heights or fractions defined
//
// content-start - makes relative positioned element lose height if children elements  are absolute,

function UserCard({ date, setUserDetails }) {
  return (
    <div
      className={`border-2 rounded-xl bg-white p-2 grid gap-2 shadow-md h-fit hover:border-stone-400`}
      onClick={() => setUserDetails(date)}
    >
      <div className="grid grid-cols-[1fr_auto]">
        <div className="flex gap-2 items-center ">
          <img
            src={date.image}
            alt="profile picture"
            className="w-[30px] rounded-full"
          />
          <h4 className="w-max font-bold text-sm">{date.name}</h4>

          <LikeUnlike />
        </div>
      </div>

      <p className="text-sm font-thin">{date.location}</p>
    </div>
  );
}

{
  /* <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg> */
}
