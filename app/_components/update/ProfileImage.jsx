import Image from "next/image";

export default function ProfileImage({
  image,
  googleImage,
  imgURL,
  handleImageChange,
}) {
  if (image) googleImage = undefined;

  return (
    <div>
      <div onClick={() => document.getElementById("selectImage").click()}>
        <div className=" aspect-square relative w-[150px]">
          {imgURL || image ? (
            <Image
              src={imgURL || image || "/svg/account.svg"}
              alt="profile Image"
              fill
              // style={{ objectFit: "cover" }}
              className={`border-2 ${
                imgURL ? "opacity-50" : ""
              } object-cover rounded-full`}
              // width={150}
              // height={150}
            />
          ) : (
            <img
              src={googleImage}
              alt="profile image"
              // style={{ objectFit: "cover" }}
              className={`border-2 ${
                imgURL ? "opacity-50" : ""
              } object-cover rounded-full bg-orange-200 `}
              width={150}
              height={150}
            />
          )}
        </div>
        <input
          type="file"
          hidden
          value={""}
          accept=".jpg,.jpeg,.png"
          id={"selectImage"}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleImageChange(e.target.files[0]);
              // e.target.reset;
            }
          }}
        />
      </div>
    </div>
  );
}
