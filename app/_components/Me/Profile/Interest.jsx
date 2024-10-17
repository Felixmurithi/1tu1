"use client";

import { useEffect, useState } from "react";

import { interests as interestsArray } from "@/app/_lib/data";

import { SectionHeaderII } from "@/app/_components/Me/Profile/SectionHeader";
import Button from "@/app/_components/Button";
import Select from "@/app/_components/Select";
import { updateProfile } from "@/app/_lib/action";
import { useParams } from "next/navigation";

export default function Interest({ user }) {
  const { me } = useParams();
  const [interests, setInterests] = useState(
    user.interests[0] ? user.interests : []
  );
  //1. edit boolean statestate to determine if to the list can be editable- with no items the list will be editable by default and this action initiated by the edit button. without the select
  const [edit, setEdit] = useState(user.interests[0] ? false : true);

  function save() {
    if (interests[0]) {
      setEdit(false);
      updateProfile({ user: me, item: "interests", data: interests });
    }
  }

  function onClickEdit() {
    if (!interests[0]) return;
    setEdit(true);
  }

  function addInterest(interest) {
    console.log(interest);
    if (!interests[0]) return setInterests([interest]);
    if (interests.find((element) => element === interest)) return;
    else
      setInterests((int) => {
        let array = [...int];
        array.push(interest);
        return array;
      });
  }
  function removeInterest(interest) {
    setInterests(interests.filter((int) => int !== interest));
  }

  return (
    <div className="grid gap-2 pt-4">
      <SectionHeaderII onClickEdit={onClickEdit} showEditButton={!edit}>
        Interests
      </SectionHeaderII>

      {!edit ? (
        <div className="flex flex-wrap gap-2 bg-white p-4 ">
          {interests[0] &&
            interests.map((interest, i) => (
              <Interests key={i} icon={"🔘"}>
                {interest}
              </Interests>
            ))}
        </div>
      ) : (
        <div className="grid gap-2 bg-white p-4 justify-start ">
          {edit && (
            <div className="flex flex-wrap gap-2 ">
              {interests[0] &&
                interests.map((interest, i) => (
                  <Interests
                    key={i}
                    edit={edit}
                    removeInterest={removeInterest}
                  >
                    {interest}
                  </Interests>
                ))}
            </div>
          )}

          <Select
            text={"select"}
            options={interestsArray}
            onClickOption={addInterest}
          />

          <Button type="icon" onClick={save}>
            📥
          </Button>
        </div>
      )}
    </div>
  );
}

function Interests({ icon, text, children, edit, removeInterest }) {
  return (
    <p className="flex gap-2 w-max px-4 py-1 rounded-md bg-stone-200 ">
      {icon && <img src="" alt="" />}
      {text && <span className="w-max">{text}</span>}
      <span className="">{children}</span>
      {edit && (
        <Button type="icon" onClick={() => removeInterest(children)}>
          ✖
        </Button>
      )}
    </p>
  );
}
