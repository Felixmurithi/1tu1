"use client";

import { useState } from "react";

import Button from "@/app/_components/Button";
import Select from "@/app/_components/Select";

export default function Dates() {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div className="grid grid-cols-[1fr_4fr]">
      <aside className="shadow-lg border p-4 bg-grey">
        <div className="flex p-2 bg-white">
          <input type="text" />
          <Select text={"Places"} options={["here", "now"]} />
          <Button
            type="transparnt"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            🎬 filters
          </Button>
        </div>
        {showFilters && <div className="p-2">filters</div>}
        <div className="p-2">
          <div>
            <h3>Likes</h3>
            <p className="text-sm opacity-50">
              bookmark users uy like here. Users are not notified when u like
              their content
            </p>
          </div>
          <div>
            <ProfileCard />
          </div>
        </div>
      </aside>
      <div className="border">map</div>
    </div>
  );
}

function ProfileCard() {
  return (
    <div className=" border-2 rounded-md bg-white p-2 grid gap-2">
      <p className="text-sm opacity-50">
        <span>⛩</span>
        <span>location</span>
        <span> splitting ☑</span>
      </p>
      <div className="grid grid-cols-[1fr_auto]">
        <div className="flex gap-2 items-center ">
          <img
            src="/jane_kimatu-profile_image.jpg"
            alt="profile picture"
            className="w-[50px] rounded-full"
          />
          <h3>Name </h3>
        </div>
        <Button />
      </div>
    </div>
  );
}
