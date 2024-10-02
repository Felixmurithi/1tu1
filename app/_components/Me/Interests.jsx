"use client";
import { useState } from "react";
import Input from "../Input";
import { interests as interestsArray } from "@/app/_lib/data";
import InterestList from "../Me/InterestList";
import Button from "../Button";

export default function Interests() {
  const [interests, setInterests] = useState([]);
  const [interestsComments, setInterestComments] = useState("");

  function changeInterest(e, int) {
    console.log("check");
    if (e.target.checked === true) setInterests((prev) => [...prev, int]);
    else {
      setInterests((prev) => prev.filter((val) => val !== int));

      console.log(interests);
    }
  }
  return (
    <div className="grid gap-2">
      <p className="font-semibold opacity-60">Interests</p>
      <div className="flex flex-wrap gap-2 bg-white p-4 border">
        {interestsArray.map((val, i) => (
          <InterestList key={i} icon={"🔘"}>
            {val}
          </InterestList>
        ))}
      </div>
      {/* <div className="grid grid-cols-2 gap-8  w-[90%] mx-auto">
        {interestsArray.map((int, i) => (
          <div key={i} className="w-full flex h-fit justify-between">
            <label htmlFor={`interests-${1}`} className="w-min">
              {int}
            </label>
            <Input
              type="checkbox"
              id={`interests-${1}`}
              key={i}
              classes={"self-center"}
              checked={false}
              onChange={(e) => changeInterest(e, int)}
            />
          </div>
        ))}
      </div>
      <div>
        {interests.map((int, i) => (
          <span key={i}>{int}</span>
        ))}
      </div> */}
      <Input
        onChange={(e) => setInterestComments(e.target.value)}
        classes={"w-[90%] mx-auto w-full"}
      >
        comments
      </Input>
    </div>
  );
}
