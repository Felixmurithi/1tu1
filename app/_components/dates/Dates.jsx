"use client";
import { use, useEffect, useState } from "react";
import Locations from "@/app/_components/dates/Locations";
import DateList from "@/app/_components/dates/Dateslist";
import Notifications from "@/app/_components/dates/Notifications";
import Button from "../Button";
import Image from "next/image";

export default function Dates({ userId, gender, image, name }) {
  const [tab, setTab] = useState(0);

  const [addLocation, setAddLocation] = useState(true);

  const [dateLocation, setDateLocation] = useState();

  const [revealDateDetails, setRevealDateDetails] = useState(true);

  function switchTabs(tab) {
    setTab(tab);
  }

  useEffect(() => {
    if (dateLocation) setAddLocation(false);
  }, [dateLocation]);

  console.log(addLocation, dateLocation);
  return (
    <main className="grid mobile:grid-cols-[240px_1fr]  h-full relative">
      {addLocation && (
        <Button classes={"absolute top-0 left-0 mobile:hidden z-30"}>hi</Button>
      )}
      <div className="mobile:grid gap-6 p-4 grid-rows-[auto_auto_1fr] hidden  ">
        <div className="grid place-items-center">
          <div className="relative aspect-square w-20">
            <Image
              src={image}
              fill
              className=" rounded-full"
              alt={`${name} profile image`}
            />
          </div>

          <span>Kilimanjaro Restuarant</span>
        </div>
        <div className="flex gap-2 justify-around px-6 ">
          <Button type="icon" onClick={() => switchTabs(0)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#434343"
            >
              <path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z" />
            </svg>
          </Button>
          <Button type="icon" onClick={() => switchTabs(1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#434343"
            >
              <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
            </svg>
          </Button>
          <Button
            type="icon"
            onClick={() => switchTabs(2)}
            classes={"relative"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#434343"
            >
              <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Z" />
            </svg>
            <span className="px-1.5 py-1.5 min-w-2 rounded-full bg-red-600 right-0 top-0 absolute"></span>
          </Button>
        </div>

        <div className="grid ">
          {[<DateList key={0} />, <Notifications key={1} />][tab]}
        </div>
      </div>
      <div className="bg-grey min-w-full">
        <Locations
          setRevealDateDetails={setRevealDateDetails}
          revealDateDetails={revealDateDetails}
          image={image}
          setDateLocation={setDateLocation}
          dateLocation={dateLocation}
          name={name}
          gender={gender}
        />
      </div>
    </main>
  );
}
// contrent start css grid
// with

//overflow protocol
//use absolute positioning for overflow

// content start to stop items from ste
// react does not do anything when u pass the same prop

// dont use max-h-full isstead use scroll where u know content will overflow

//grid to stop using h-full

//suspense
// activated by the fiber tree- using the acctivity element which is set to hidden when suspending
// does not with useTransition
// the loading js wraps the entire page into a a suapsense component until all the other components are streamed in.
// wrapping a component that does async fetching in Supense and setting a fallback, esnsures that the loading.js file suspensing of the entire page is not affeted by this component.

//error boundary
// only catches error in the rendering not callback errors -TODO
// does not catch errors in the root of the component.
//the globalerror.js os sued to catch the erors in teh root layout and will replace the all layout withb the global eror page. used in case the root layout is handling data fetching
