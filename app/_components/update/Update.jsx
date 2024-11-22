"use client";

import { useEffect, useState } from "react";
import Button from "@/app/_components/Button";
import FormRow from "@/app/_components/FormRow";
import { DatePicker, Provider, defaultTheme } from "@adobe/react-spectrum";
import { getLocalTimeZone, today } from "@internationalized/date";
import ProfileImage from "@/app/_components/update/ProfileImage";

export default function Update() {
  const [date, setDate] = useState(today(getLocalTimeZone()));

  const [imgURL, setImgURL] = useState();
  const [imgError, setIMgError] = useState("");

  function handleImageChange(img, maxSize = 4) {
    if (img.size / 1024 / 1024 <= maxSize) {
      setIMgError("");
      setImgURL(URL.createObjectURL(img));
    } else {
      setIMgError("image should be of type jpeg, jpg or png and less than 4MB");
    }
  }

  useEffect(function () {
    return URL.revokeObjectURL(imgURL);
  }, []);

  return (
    <div className="grid place-items-center gap-6 ">
      <form className=" w-fit   p-4 grid gap-12 justify-start shadow-lg  px-16 pb-8 ">
        <h3 className="font-thin">Update Profile</h3>

        <FormRow label="Profile Picture">
          <ProfileImage handleImageChange={handleImageChange} imgURL={imgURL} />

          {/* <img src={imgURL} alt="" /> */}

          {imgError && <p className="block">{imgError}</p>}
        </FormRow>

        <FormRow label="gender" id="lastName">
          <select id="" className="px-2 py-1 rounded">
            <option value="" hidden>
              select
            </option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </FormRow>
        <FormRow id={"birthday"} label={"Birthday"}>
          <Provider theme={defaultTheme}>
            <DatePicker
              aria-labelledby="birthday"
              value={date}
              onChange={setDate}
              isRequired
            />
          </Provider>
        </FormRow>

        <Button>Submit</Button>
      </form>
    </div>
  );
}
