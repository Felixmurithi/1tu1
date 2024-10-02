import ProfileList from "@/app/_components/Me/ProfileList";

export default function ProfileCard() {
  return (
    <div className="flex border  gap-8 pl-4 py-2  w-full bg-white h-fit">
      <img
        src="profiles/church-lady.jpg"
        alt=""
        className="border border-2 border-pink-300 rounded-lg h-[200px] self-center"
      />

      <div className="grid h-fit gap-4">
        <p className="font-bold">Jane Kimatu</p>
        <div>
          <ProfileList text={"age"}>34</ProfileList>
          <ProfileList text={"location"}>meru/central</ProfileList>
          <ProfileList text={"region"}>central</ProfileList>
          <ProfileList text={"rating"}>6-7</ProfileList>
          <ProfileList text={"✔"}>long term patner</ProfileList>
          <ProfileList text={"🦾"}>BMI</ProfileList>
        </div>

        <p className="opacity-50">I am mum of of 4 seeking a patner </p>
      </div>
    </div>
  );
}
