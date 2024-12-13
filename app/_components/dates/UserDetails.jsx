import Image from "next/image";
import Button from "../Button";

function UserDetails({ image, name, gender, location }) {
  return (
    <div className="absolute top-1 rounded-lg left-0 right-0  w-fit mx-auto z-20 bg-white sm:flex p-4 gap-6">
      <div className="relative aspect-square w-24 h-24 sm:h-32 sm:w-32 ">
        <Image
          src={image}
          fill
          className="rounded-full"
          alt={`${name} profile image`}
        />
      </div>
      <div className="grid content-start gap-2">
        <h3>{name}</h3>
        <p className="text-sm">gender : {gender}</p>

        <p>Kilimajaro Restuarant</p>

        <Button>send request</Button>
      </div>
    </div>
  );
}

export default UserDetails;
