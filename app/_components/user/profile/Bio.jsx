"use client";
import { useState } from "react";
import HeaderEdit from "@/app/_components/user/profile/HeaderEdit";
import Input from "@/app/_components/Input";
import { useParams } from "next/navigation";

function Bio() {
  const [bio, setBio] = useState("");
  const [editBioValue, setEditBiovalue] = useState(true);
  const { id } = useParams();

  function saveBio() {
    setEditBiovalue(false);
    updateProfile({ user: id, item: "bio", data: bio });
  }

  return (
    <div className="grid gap-2">
      {/* <SectionHeader>Persona</SectionHeader> */}
      <HeaderEdit
        onClickEdit={() => setEditBiovalue(true)}
        showEditButton={!editBioValue}
      >
        Bio
      </HeaderEdit>

      {!editBioValue ? (
        <p className="opacity-70 text-wrap w-20">{bio}</p>
      ) : (
        <div className="bg-white pt-2 px-2 rounded-sm">
          <Input
            id={"bio"}
            name={"bio"}
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          >
            {bio ? "" : "describe who you are"}
          </Input>

          <button onClick={(e) => saveBio()}>
            <img src="/svg/check_circle.svg" alt="" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Bio;
