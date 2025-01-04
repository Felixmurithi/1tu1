import Image from "next/image";
import Button from "../Button";
import LikeUnlike from "../LikeUnlike";
import DateTimeEntry from "@/app/_components/dates/DateTimeEntry";

function UserDetails({ userDetails }) {
  return (
    <div className="absolute top-1 rounded-lg left-0 right-0  w-fit mx-auto z-20 bg-white sm:flex p-4 gap-6 ">
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
          <LikeUnlike />
        </div>

        <div>
          <a
            href={userDetails.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-orange-500"
          >
            <p className="text-sm font-thin">{userDetails.location}</p>
          </a>
          <p className="text-[0.7rem] font-thin">⭐ {userDetails.rating}/5</p>
        </div>

        <Button classes={""}>send request</Button>
        <div>hi</div>
        <DateTimeEntry />
        {/* <div>
        </div> */}
      </div>
    </div>
  );
}

export default UserDetails;
