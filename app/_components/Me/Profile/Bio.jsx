import { useState } from "react";

import { SectionHeaderII } from "@/app/_components/Me/Profile/SectionHeader";
import Input from "@/app/_components/Input";
import { updateProfile } from "@/app/_lib/action";
import { useParams } from "next/navigation";

function Bio() {
  const [bio, setBio] = useState("");
  const [editBioValue, setEditBiovalue] = useState(true);
  const { me } = useParams();

  function saveBio() {
    setEditBiovalue(false);
    updateProfile({ user: me, item: "bio", data: bio });
  }

  return (
    <section className="grid gap-2">
      {/* <SectionHeader>Persona</SectionHeader> */}
      <SectionHeaderII
        onClickEdit={() => setEditBiovalue(true)}
        showEditButton={!editBioValue}
      >
        Bio
      </SectionHeaderII>

      {!editBioValue && (
        <div className="bg-white  p-4 ">
          <p className="opacity-70">{bio}</p>
        </div>
      )}

      {editBioValue && (
        <div className="bg-white  p-4 ">
          <Input
            id={"bio"}
            name={"bio"}
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          >
            {bio ? "" : "describe who you are"}
          </Input>

          <button onClick={(e) => saveBio()}>📥</button>
        </div>
      )}
    </section>
  );
}

export default Bio;
