"use client";
import Locations from "@/app/_components/dates/Locations";
import DateList from "@/app/_components/dates/Dateslist";
import Notifications from "@/app/_components/dates/Notifications";
import Button from "../Button";
import { useState } from "react";

export default function Dates() {
  const [tab, setTab] = useState(0);

  function switchTabs(tab) {
    setTab(tab);
  }
  return (
    <div className="grid grid-cols-[240px_1fr]   ">
      <div className="grid grid-rows-[auto_1fr] content-start gap-6 h-full p-4 ">
        <div className="flex gap-2 justify-around px-6 ">
          <Button type="icon" onClick={() => switchTabs(0)}>
            🏠
          </Button>
          <Button type="icon" onClick={() => switchTabs(1)}>
            📗
          </Button>
          <Button type="icon" onClick={() => switchTabs(2)}>
            🔔
          </Button>
          <Button type="icon" onClick={() => switchTabs(3)}>
            📑
          </Button>
        </div>
        <div className="grid">
          {[<DateList key={0} />, <Notifications key={1} />][tab]}
        </div>
      </div>
      <div className="bg-grey ">
        <Locations />
      </div>
    </div>
  );
}

//overflow protocol
//use absolute positioning for overflow

// content start to stop items from ste
// react does not do anything when u pass the same prop

// dont use max-h-full isstead use scroll where u know content will overflow

//grid to stop using h-full
