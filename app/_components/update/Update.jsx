"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { parseDate } from "@internationalized/date";
// import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { DatePicker, Provider, defaultTheme } from "@adobe/react-spectrum";
import toast, { Toaster } from "react-hot-toast";
import Button, { CancelButton, SaveButton } from "@/app/_components/Button";
import SpinnerMini from "@/app/_components/SpinnerMini";
import FormRow from "@/app/_components/FormRow";
import ProfileImage from "@/app/_components/update/ProfileImage";
import { maxImageSize } from "@/app/_lib/dataConfig";
import { updateUser } from "@/app/_lib/action";
import getAge from "@/app/_utils/getAge";

export default function Update({
  userId,
  googleImage,
  uploadedImage,
  gender,
  birthday,
}) {
  // const [birthday, setBirthday] = useState(today(getLocalTimeZone()));
  const [birthdate, setBirthdate] = useState(
    parseDate(birthday || "2020-02-03")
  );
  //image from upload
  const [img, setImg] = useState();
  const [image, setImage] = useState();
  const [loadingI, setLoadingI] = useState(false);
  const [loadingII, setLoadingII] = useState(false);

  const [imgURL, setImgURL] = useState();
  // const [removeImg, setRemoveImg] = useState(false);
  const [imgError, setIMgError] = useState("");
  const [ageError, setAgeError] = useState("");
  const router = useRouter();

  function handleImageChange(img, maxSize = 4) {
    if (img.size / 1024 / 1024 <= maxSize) {
      setIMgError("");
      setImgURL(URL.createObjectURL(img));
      setImg(img);
    } else {
      setIMgError("image should be of type jpeg, jpg or png and less than 4MB");
    }
  }

  function cancelImage() {
    URL.revokeObjectURL(imgURL);
    setImgURL("");
  }

  const notifyImageUpdated = () =>
    toast.success("Your profile image updated successfully");
  const notifyUserDataUpdated = () =>
    toast.success("Your profile image updated successfully");

  useEffect(
    function () {
      if (!img) return;
      const fileSize = img.size / 1024 / 1024; // in MiB
      const idxDot = img.name.lastIndexOf(".") + 1;
      const extFile = img.name.substr(idxDot, img.name.length).toLowerCase();
      if (
        !(extFile == "jpg" || extFile == "jpeg" || extFile == "png") ||
        !fileSize > maxImageSize
      ) {
        setIMgError("image must be of type .jpg,.jpeg,.png and less than 4MB");
      }
    },
    [img]
  );

  useEffect(
    function () {
      if (uploadedImage) {
        setImage(uploadedImage);
      }
    },
    [uploadedImage]
  );
  async function uploadImage(img, userId) {
    setLoadingI(true);
    const formData = new FormData();
    formData.append("img", img);
    formData.append("userId", userId);
    const res = await fetch("/api/uploadImage", {
      method: "POST",
      body: formData,
    });
    const { image } = await res.json();
    URL.revokeObjectURL(imgURL);
    setImgURL("");
    setImg("");
    setImage(image);
    setLoadingI(false);
    notifyImageUpdated();
    router.push("/dates");
  }

  function updateAge(birthday) {
    setBirthdate(birthday);
    const age = getAge(birthday);

    setAgeError("");

    if (age < 18) {
      setAgeError(
        "Birthday is required for age verification, must be 18 yrs or older"
      );
    }
  }

  return (
    <main className="">
      <form
        className=" w-fit    grid gap-12 justify-start shadow-lg px-8   mobile:px-20 pb-8 mx-auto sm:px-44 "
        action={async (formData) => {
          const age = getAge(birthday);
          setLoadingII(true);
          if (!age || age < 17) {
            return setAgeError(
              "Birthday is required for age verification, must be 18 yrs or older"
            );
          }

          formData.append("userId", userId);

          const data = await updateUser(formData);
          console.log(data);
          setLoadingII(false);
          notifyUserDataUpdated();
          router.push("/dates");
        }}
      >
        <h3 className="font-thin">Update Profile</h3>

        <FormRow label="Profile Picture">
          <div>
            <ProfileImage
              handleImageChange={handleImageChange}
              imgURL={imgURL}
              image={image}
              googleImage={googleImage}
            />

            {imgError && <p className="block">{imgError}</p>}
            {loadingI ? (
              <SpinnerMini />
            ) : imgURL ? (
              <div className="flex justify-around pt-4 h-3">
                {imgURL && img && (
                  <SaveButton onClick={() => uploadImage(img, userId)} />
                )}
                <CancelButton onClick={() => cancelImage()} />
              </div>
            ) : (
              ""
            )}
          </div>
        </FormRow>

        <FormRow label="gender" id="lastName">
          <select
            id=""
            className="px-2 py-1 rounded bg-stone-200"
            name="gender"
            required
            defaultValue={gender || ""}
          >
            <option value="" hidden>
              select
            </option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </FormRow>
        <FormRow id={"birthday"} label={"Birthday"} error={ageError}>
          <Provider theme={defaultTheme}>
            <DatePicker
              aria-labelledby="birthday"
              value={birthdate}
              onChange={updateAge}
              name="birthday"
              isRequired
              // validate={(birthday) =>
              //   date && getAge(birthday)
              //     ? "U have to be 18 yrs or older to signup"
              //     : null
              // }
            ></DatePicker>
          </Provider>
        </FormRow>

        {!loadingII ? <Button>Submit</Button> : <SpinnerMini />}
        <Toaster />
      </form>
    </main>
  );
}
