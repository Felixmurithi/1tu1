import { useParams } from "next/navigation";
import { useState } from "react";

import { SectionHeaderII } from "@/app/_components/Me/Profile/SectionHeader";
import Input from "@/app/_components/Input";
import Select from "@/app/_components/Select";
import Button from "../../Button";
import { updateProfile } from "@/app/_lib/action";

function Dating({ user }) {
  const { me } = useParams();
  const [edit, setEdit] = useState(true);
  const [dateDetails, setDateDetails] = useState({
    locationDetails: [""],
    pin: [],
    split: true,
    number: 0,
  });

  console.log(me);

  function save() {
    updateProfile({
      user: me,
      item: "dateDetails",
      data: {
        locationDetails: dateDetails.locationDetails,
        pin: dateDetails.pin,
        split: dateDetails.split,
        number: dateDetails.number,
      },
    });
  }

  console.log(dateDetails);
  return (
    <section className="grid gap-2">
      {/* <SectionHeader>Dating</SectionHeader> */}
      <SectionHeaderII
        onClickEdit={() => setEdit((prev) => !prev)}
        showEditButton={!edit}
      >
        Date Details
      </SectionHeaderII>

      <div className="grid gap-4 bg-white p-4 justify-start">
        <div className="min-w-full">
          {edit ? (
            <Input
              id={"date-location"}
              name={"date-location"}
              value={"" || dateDetails.locationDetails}
              onChange={(e) =>
                setDateDetails((prev) => {
                  return { ...prev, locationDetails: e.target.value };
                })
              }
            >
              Where would u prefer to go for a date
            </Input>
          ) : (
            <p>{user.dateDetails.locationDetails}</p>
          )}
        </div>
        <Button
          type="transparent"
          onChange={(e) =>
            setDateDetails((prev) => {
              return { ...prev, pin: e.target.value };
            })
          }
        >
          🏚 choose location
        </Button>
        <div className="flex gap-4">
          <label htmlFor="split-cost">Do you want to split date cost</label>
          <Input
            type="checkbox"
            id={"split-cost"}
            checked={dateDetails.split}
            onChange={(e) =>
              setDateDetails((prev) => {
                return { ...prev, split: e.target.checked };
              })
            }
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="dates">Number of dates you prefer</label>
          {edit ? (
            <Select
              text={"select"}
              options={[1, 2, 3, 4, 5]}
              onClickOption={(number) =>
                setDateDetails((prev) => {
                  return { ...prev, number };
                })
              }
            >
              How many dates would you want
            </Select>
          ) : dateDetails.number ? (
            `:  ${dateDetails.number}`
          ) : (
            ""
          )}
        </div>
        {edit && (
          <Button
            type="icon"
            onClick={() => {
              save();
              setEdit((prev) => !prev);
            }}
          >
            📥
          </Button>
        )}
      </div>
    </section>
  );
}

export default Dating;
