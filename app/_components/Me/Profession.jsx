"use client";
import { useState } from "react";
import Input from "../Input";

const professions = [
  "IT professional",
  "Barber",
  "car sales",
  "construction worker",
];

export default function Profession() {
  const [profession, setprofession] = useState([false, ""]);
  return (
    <div>
      <h3>Profession</h3>
      {!profession[0] && (
        <Input
          type="checkbox"
          checked={false}
          onChange={(e) =>
            setprofession((prev) => (prev[0] = e.target.checked))
          }
        >
          Set Profession?
        </Input>
      )}
      {profession[0] && (
        <select
          name=""
          id=""
          onChange={(e) => setprofession((prev) => (prev[1] = e.target.value))}
        >
          <option value="" hidden>
            select profession
          </option>
          {professions.map((job, i) => (
            <option value={job} key={i}>
              {job}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
