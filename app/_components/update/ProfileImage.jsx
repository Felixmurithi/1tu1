import Image from "next/image";
import { CancelButton, SaveButton } from "@/app/_components/Button";

export default function ProfileImage({ img, imgURL, handleImageChange }) {
  return (
    <div onClick={() => document.getElementById("selectImage").click()}>
      <div className=" aspect-square relative w-[150px]">
        <Image
          src={img || imgURL || "/svg/account.svg"}
          alt=""
          fill
          // style={{ objectFit: "cover" }}
          className={`border-2 ${
            imgURL ? "opacity-50" : ""
          } object-cover rounded-full`}
          // width={150}
          // height={150}
        />
      </div>
      <input
        type="file"
        hidden
        accept=".jpg,.jpeg,.png"
        id={"selectImage"}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleImageChange(e.target.files[0]);
            // e.target.reset;
          }
        }}
      />
      {imgURL && (
        <div className="flex justify-around pt-4 h-3">
          <SaveButton />
          <CancelButton />
        </div>
      )}
    </div>
  );
}
