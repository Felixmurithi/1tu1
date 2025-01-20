import Image from "next/image";
import LikeUnlike from "@/app/_components/LikeUnlike";
import Button from "@/app/_components/Button";

import DateRequest from "@/app/_components/dates/DateRequest";

function UserDetails({
  userDetails,
  setDateLocation,
  setUserDetails,
  userId,
  name,
  toast,
  radius,
  refetchAllDates,
  changeTab,
  refetchAllNearbyDates,
}) {
  function closeCard() {
    setUserDetails(null);
  }

  return (
    <div className="absolute top-1 rounded-lg left-0 right-0  w-fit mx-auto z-10 bg-white sm:flex p-4 gap-6 border">
      <Button
        type="icon"
        classes={"absolute top-0 right-0"}
        onClick={() => closeCard()}
      >
        ✖
      </Button>
      <div className="relative aspect-square w-24 h-24 sm:h-32 sm:w-32 overflow-x-auto ">
        <Image
          src={userDetails.image}
          fill
          className=" rounded-3xl"
          alt={`${userDetails.name} profile image`}
        />
      </div>
      <div className="grid content-startb gap-2">
        <div className="flex items-center">
          <h4 className="font-bold">{userDetails.name}</h4>
          {userDetails.user ? "" : <LikeUnlike />}
        </div>

        <div>
          <a
            href={userDetails.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-orange-500"
          >
            <p className="text-xs font-thin">{userDetails.location}</p>
          </a>
          <p className="text-xs font-thin">⭐ {userDetails.rating}/5</p>
        </div>
        {userDetails.user ? (
          <Button
            type="icon"
            onClick={() => {
              setDateLocation({});
              setUserDetails(null);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#434343"
            >
              <path d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z" />
            </svg>
          </Button>
        ) : (
          <DateRequest
            mobile={false}
            date={userDetails}
            userId={userId}
            toast={toast}
            closeCard={closeCard}
            refetchAllDates={refetchAllDates}
            refetchAllNearbyDates={refetchAllNearbyDates}
            radius={radius}
            name={name}
            changeTab={changeTab}
          />
        )}
      </div>
    </div>
  );
}

export default UserDetails;

// date is this card
