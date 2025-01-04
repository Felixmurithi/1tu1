"use client";
import { useEffect, useRef, useState } from "react";
import Locations from "@/app/_components/dates/Locations";
import DateList from "@/app/_components/dates/Dateslist";
import Notifications from "@/app/_components/dates/Notifications";
import Button from "../Button";
import Image from "next/image";
import { allDatesAction, nearbyDatesAction } from "@/app/_lib/action";

export default function Dates({ userId, gender, image, name, myDate }) {
  const [tab, setTab] = useState(0);
  const [dateLocation, setDateLocation] = useState(myDate);
  const [allDates, setAllDates] = useState();
  const [openMenu, setOpenMenu] = useState(true);
  const [revealDateDetails, setRevealDateDetails] = useState(true);
  const checkDate = useRef(null);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState();

  function switchTabs(tab) {
    setTab(tab);
  }

  useEffect(
    function () {
      if (!dateLocation?.location?.lat || checkDate.current) return;
      let cancelled = false;

      async function getDates() {
        setLoading(true);
        checkDate.current = true;

        const dates = await allDatesAction(
          dateLocation.location.lng,
          dateLocation.location.lat,
          userId
        );

        setLoading(false);

        setAllDates(dates);
      }

      if (!cancelled) {
        getDates();
      }

      return () => (cancelled = true);
    },
    [dateLocation]
  );

  console.log(userDetails);

  return (
    <main
      className={`grid ${
        dateLocation?.name && openMenu ? "grid-cols-[220px_1fr]" : ""
      }  h-full relative`}
    >
      {dateLocation?.name ? (
        !openMenu ? (
          <Button
            classes={"absolute top-0 left-0  z-30"}
            onClick={() => setOpenMenu(true)}
          >
            hi
          </Button>
        ) : (
          dateLocation?.name && (
            <div
              className={`grid gap-6 p-4 grid-rows-[auto_auto_1fr]${
                openMenu ? "" : "hidden"
              } `}
            >
              <Button
                type="icon"
                onClick={() => setOpenMenu(false)}
                classes={"absolute top-0 left-0"}
              >
                ✖
              </Button>
              <div className="grid place-items-center gap-2">
                <div className="relative aspect-square w-20">
                  <Image
                    src={image}
                    fill
                    className=" rounded-full"
                    alt={`${name} profile image`}
                  />
                </div>

                <div className="grid gap-1">
                  <a
                    href={dateLocation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-orange-500"
                  >
                    <p className="text-sm font-thin">{dateLocation.name}</p>
                  </a>
                  <p className="text-[0.7rem] font-thin">
                    ⭐ {dateLocation.rating}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 justify-between px-4 ">
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
                <Button type="icon" onClick={() => switchTabs(3)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#434343"
                  >
                    <path d="M360-300q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z" />
                  </svg>
                </Button>
              </div>

              <div className="grid ">
                {
                  [
                    <DateList
                      key={0}
                      allDates={allDates}
                      setAllDates={setAllDates}
                      loading={loading}
                      setLoading={setLoading}
                      dateLocation={dateLocation}
                      userId={userId}
                      setUserDetails={setUserDetails}
                      userDetails={userDetails}
                    />,
                    <Notifications key={1} />,
                  ][tab]
                }
              </div>
            </div>
          )
        )
      ) : (
        ""
      )}

      <div className={`bg-grey min-w-full `}>
        <Locations
          userDetails={userDetails}
          openMenu={openMenu}
          image={image}
          setDateLocation={setDateLocation}
          dateLocation={dateLocation}
          name={name}
          userId={userId}
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
