import { useEffect, useState } from "react";

import { uploadProfileImage, deleteprofileImage } from "@/app/_lib/action";

import Button from "../Button";
import { useParams } from "next/navigation";

export default function Profile({ user }) {
  const { me } = useParams();
  const [img, setImg] = useState("");
  const [imgBlob, setImgBlob] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(function () {
    setImg(user.profileImage);
    return URL.revokeObjectURL(imgBlob);
  });

  function changeprofile(e) {
    if (imgBlob) URL.revokeObjectURL(imgBlob);
    if (e.target.files && e.target.files[0]) {
      const profileImage = new FormData();
      profileImage.append("image", e.target.files[0]);
      profileImage.append("user", userName);
      uploadProfileImage(profileImage);

      const imgURL = URL.createObjectURL(e.target.files[0]);
      setImgBlob(imgURL);
      setEdit(false);
      // URL.revokeObjectURL(imgURL);
    }
  }

  async function removeImage() {
    if (img) URL.revokeObjectURL(img);
    if (user.profileImage)
      await deleteprofileImage({
        profileImage: user.profileImage,
        user: me,
      });
    setImg("");
    setImgBlob("");
  }

  return (
    <div className="bg-grey">
      <div className="flex justify-between px-10   h-fit w-full flex-wrap gap-8 relative top-3 pb-6">
        <div className="flex gap-4">
          {img ? (
            <div className="grid justify-end">
              {edit && (
                <Button type="icon" onClick={removeImage}>
                  ❌
                </Button>
              )}
              <img
                src={`/${img}` || imgBlob}
                alt=""
                className="border border-2 w-[150px]"
                onClick={() => setEdit((prev) => true)}
              />
            </div>
          ) : (
            <input
              type="file"
              className="bg-[url(/placeholder.jpg)] h-[150px] w-[150px]"
              onChange={(e) => changeprofile(e)}
            />
          )}
          <div className="grid h-fit gap-3">
            <p className="font-bold">{`${user.signupData.firstName} ${user.signupData.lastName}`}</p>

            <p className="text-sm opacity-50">MERU</p>
          </div>
        </div>
        <div className="flex h-fit gap-6">
          <div className="grid h-fit gap-2">
            <p className="font-semibold">age</p>
            <p className="opacity-50 p-1 bg-white shadow-md">34</p>
          </div>
          <div className="grid h-fit gap-2">
            <p className="font-semibold">😎</p>
            <p className="opacity-50 bg-white shadow-md p-1">female</p>
          </div>
          <div className="grid gap-2 justify-end">
            <span>🗾🗺</span>
            <img
              src="/maps.svg"
              alt=""
              className="w-150px h-[100px] bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
