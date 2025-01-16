"use client";

import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import Locations from "@/app/_components/dates/Locations";
import DateList from "@/app/_components/dates/Dateslist";
import Notifications from "@/app/_components/dates/Notifications";
import Button, { MenuButton } from "../Button";
import Bookmarks from "@/app/_components/dates/Bookmarks";
import { allDatesAction, getNoficationsAction } from "@/app/_lib/action";
import useMediaQuery from "@/app/hooks/useMediaQuery";

export default function Dates({ userId, gender, image, name, myDate }) {
  const [notifications, setNotifications] = useState();
  const [tab, setTab] = useState(0);
  const [dateLocation, setDateLocation] = useState(myDate);
  const [allDates, setAllDates] = useState();
  const [openMenu, setOpenMenu] = useState(true);
  const checkDate = useRef(null);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [revealUserDetails, setRevealUserDetails] = useState();
  const [fetchAll, setFetchAll] = useState(false);

  const mobile = useMediaQuery("(max-width: 440px)", setOpenMenu);

  useEffect(() => {
    //openmenu on desktop
    if (!mobile) {
      setOpenMenu(true);
    }
  }, [mobile]);

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
    [dateLocation, fetchAll]
  );

  // grid only when the date Location is there  and not mobile version

  //openMenu to oepn sidemenu or button

  //DO NOT PASS setter but handler
  // was passing fetch all down the componnets through 4 componets and then changing the value onClick() and it was not doing what I wanted. I believe i made a mistake somewhere but and the correct React pattern is.
  // teh correct way of doing is to declare a function that does what u want and pass it downb

  function refetchAllDates() {
    setFetchAll((val) => !val);
    checkDate.current = false;
  }

  // a pure functiojn first then async
  // no ifs in between because probably will lead to an useffect being cancelled after the render
  async function getNofications() {
    const data = await getNoficationsAction(userId);

    if (data?.[0]) setNotifications(data);
  }

  useEffect(() => {
    getNofications();
  }, []);

  // set notifications to other actions
  return (
    <main
      className={` h-full relative mobile: ${
        dateLocation?.name && !mobile ? "grid" : ""
      } mobile:grid-cols-[1fr_3fr]`}
    >
      {dateLocation?.name ? (
        !openMenu ? (
          <Button
            classes={"absolute top-0 left-0  z-20"}
            onClick={() => {
              setOpenMenu(true);
              setRevealUserDetails(false);
            }}
          >
            hi
          </Button>
        ) : (
          <div
            className={`grid gap-6 p-4 grid-rows-[auto_1fr]${
              openMenu ? "" : "hidden"
            } absolute top-0 left-0  right-0 bottom-0 m-4 z-20 bg-white rounded-md border border-stone-200 mobile:static mobile:border-none mobile:m-0`}
          >
            {mobile && (
              <Button
                type="icon"
                onClick={() => setOpenMenu(false)}
                classes={"absolute top-0 left-0"}
              >
                ✖
              </Button>
            )}

            <div className="flex gap-2 justify-between px-4 ">
              <MenuButton onClick={() => switchTabs(0)} tab={tab} num={0}>
                <path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z" />
              </MenuButton>
              <MenuButton onClick={() => switchTabs(1)} tab={tab} num={1}>
                <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
              </MenuButton>

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
                  className={`${
                    tab == 2 ? "fill-[#434343]" : "fill-stone-300"
                  }`}
                >
                  <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Z" />
                </svg>
                {notifications?.[0] ? (
                  <span className="px-1.5 py-1.5 min-w-2 rounded-full bg-red-600 right-0 top-0 absolute"></span>
                ) : (
                  ""
                )}
              </Button>

              <MenuButton onClick={() => switchTabs(3)} tab={tab} num={3}>
                <path d="M360-300q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z" />
              </MenuButton>
            </div>

            <div className="grid ">
              {
                [
                  <DateList
                    mobile={mobile}
                    key={0}
                    allDates={allDates}
                    setAllDates={setAllDates}
                    loading={loading}
                    setLoading={setLoading}
                    dateLocation={dateLocation}
                    userId={userId}
                    setUserDetails={setUserDetails}
                    userDetails={userDetails}
                    openMenu={openMenu}
                    toast={toast}
                    refetchAllDates={refetchAllDates}
                    name={name}
                  />,
                  <Bookmarks key={1} />,
                  <Notifications
                    key={2}
                    notifications={notifications}
                    setTab={setTab}
                  />,
                ][tab]
              }
            </div>
          </div>
        )
      ) : (
        ""
      )}

      <div className={`bg-grey min-w-full h-full `}>
        {/* <Locations
          setUserDetails={setUserDetails}
          userDetails={userDetails}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          image={image}
          setDateLocation={setDateLocation}
          dateLocation={dateLocation}
          name={name}
          userId={userId}
          gender={gender}
          mobile={mobile}
          allDates={allDates}
          toast={toast}
          revealUserDetails={revealUserDetails}
          setRevealUserDetails={setRevealUserDetails}
        /> */}
      </div>
      <Toaster />
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

// <Button type="icon">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               height="24px"
//               viewBox="0 -960 960 960"
//               width="24px"
//               fill="#434343"
//             >
//               <path d="M480-360q56 0 101-27.5t71-72.5q-35-29-79-44.5T480-520q-49 0-93 15.5T308-460q26 45 71 72.5T480-360Zm0-200q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0 480Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z" />
//             </svg>
//           </Button>
