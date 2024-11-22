"use client";

import { useState } from "react";

import HeaderEdit from "@/app/_components/user/profile/HeaderEdit";
import Button, { SaveButton } from "@/app/_components/Button";
import Select from "@/app/_components/Select";

export default function Interest() {
  // const { id } = useParams();
  const [interests, setInterests] = useState([]);
  //1. edit boolean statestate to determine if to the list can be editable- with no items the list will be editable by default and this action initiated by the edit button. without the select
  const [edit, setEdit] = useState(true);

  // function save() {
  //   if (interests[0]) {
  //     setEdit(false);
  //     updateProfile({ user: id, item: "interests", data: interests });
  //   }
  // }

  function onClickEdit() {
    if (!interests[0]) return;
    setEdit(true);
  }

  function addInterest(interest) {
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
      <HeaderEdit onClickEdit={onClickEdit} showEditButton={!edit}>
        Interests
      </HeaderEdit>

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
        <div className="grid gap-6 bg-white p-4 justify-start ">
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

          <SaveButton
            type="icon"
            //  onClick={save}
          />
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
