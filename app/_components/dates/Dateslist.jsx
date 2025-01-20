import { useEffect, useState } from "react";
import SpinnerMini from "@/app/_components/SpinnerMini";
import LikeUnlike from "@/app/_components/LikeUnlike";
import Button from "@/app/_components/Button";
import DateRequest from "@/app/_components/dates/DateRequest";
import { nearbyDatesAction } from "@/app/_lib/action";

export default function DatesList({
  allDates,
  loading,
  setLoading,
  setAllDates,
  dateLocation,
  userId,
  setUserDetails,
  mobile,
  userDetails,
  toast,
  refetchAllDates,
  name,
  changeTab,
}) {
  const [radius, setRadius] = useState();
  const [fetchNearby, setFetchNearby] = useState(false);

  // const {
  //   data: dates,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryFn: nearbyDatesAction(
  //     dateLocation.location.lng,
  //     dateLocation.location.lat,
  //     radius,
  //     userId
  //   ),
  //   queryKey: ["dates"],
  // });

  // react query function needs to be an function taht returns a promise.

  function refetchAllNearbyDates() {
    setFetchNearby((val) => !val);
    checkDate.current = false;
  }

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
    [radius, fetchNearby]
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
              <AllDates
                allDates={allDates}
                mobile={mobile}
                setUserDetails={setUserDetails}
                userDetails={userDetails}
                toast={toast}
                userId={userId}
                refetchAllDates={refetchAllDates}
                refetchAllNearbyDates={refetchAllNearbyDates}
                radius={radius}
                name={name}
                changeTab={changeTab}
              />
            ) : (
              <p>dates near you</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AllDates({
  allDates,
  setUserDetails,
  mobile,
  userDetails,
  toast,
  userId,
  refetchAllDates,
  refetchAllNearbyDates,
  radius,
  name,
  changeTab,
}) {
  const [openRequest, setOpenRequest] = useState(null);

  function closeCard() {
    setOpenRequest(false);
  }
  return allDates.map((date, i) => (
    <UserCard
      date={date}
      key={i}
      i={i}
      setUserDetails={setUserDetails}
      mobile={mobile}
      userDetails={userDetails}
      openRequest={openRequest}
      setOpenRequest={setOpenRequest}
      toast={toast}
      userId={userId}
      refetchAllDates={refetchAllDates}
      refetchAllNearbyDates={refetchAllNearbyDates}
      radius={radius}
      closeCard={closeCard}
      name={name}
      changeTab={changeTab}
    />
  ));
}

// grid items streatche if cols or rows height heights or fractions defined
//
// content-start - makes relative positioned element lose height if children elements  are absolute,
// used grid when u need text to wrap

// button always there unbless its card is open
//open request ==i

function UserCard({
  date,
  setUserDetails,
  mobile,
  i,
  openRequest,
  setOpenRequest,
  toast,
  userId,
  refetchAllDates,
  refetchAllNearbyDates,
  radius,
  closeCard,
  name,
  changeTab,
}) {
  return (
    <div
      className="border-2 rounded-xl bg-white p-2 shadow-md h-fit hover:border-stone-400 flex flex-col gap-4 max-w-full "
      onClick={() => {
        if (mobile) return;
        setUserDetails(date);
      }}
    >
      <div className={`grid grid-cols-[1fr_auto]`}>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <img
              src={date.image}
              alt="profile picture"
              className="w-[30px] h-[30px] rounded-full"
            />
            <h4 className=" font-bold text-sm ">{date.name}</h4>
          </div>
          <p className="text-xs font-thin">{date.location}</p>
        </div>

        <div className="flex flex-col justify-self-end ">
          <LikeUnlike />
          {openRequest !== date.userid && mobile && (
            <Button
              type="icon"
              classes={"text-sm text-orange-800 "}
              onClick={() => {
                // close on click button
                if (openRequest == i) {
                  setOpenRequest(null);
                  return setUserDetails(null);
                }
                //open on click button
                if (mobile) setOpenRequest(date.userid);
                // set details on clicking card in mobile or largeer
                setUserDetails(date);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#434343"
              >
                <path d="m480-340 180-180-57-56-123 123-123-123-57 56 180 180Zm0 260q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
            </Button>
          )}
        </div>
      </div>

      {mobile && openRequest == date.userid ? (
        <DateRequest
          date={date}
          userId={userId}
          setOpenRequest={setOpenRequest}
          toast={toast}
          refetchAllDates={refetchAllDates}
          refetchAllNearbyDates={refetchAllNearbyDates}
          radius={radius}
          closeCard={closeCard}
          name={name}
          changeTab={changeTab}
        />
      ) : (
        ""
      )}
    </div>
  );
}

{
  /* <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg> */
}

//min-width-0 to adress wrapping text on flex.
