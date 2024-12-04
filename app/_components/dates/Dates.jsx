"use client";
import { useState } from "react";
import Locations from "@/app/_components/dates/Locations";
import DateList from "@/app/_components/dates/Dateslist";
import Notifications from "@/app/_components/dates/Notifications";
import Button from "../Button";

export default function Dates() {
  const [tab, setTab] = useState(0);

  function switchTabs(tab) {
    setTab(tab);
  }
  return (
    <main className="grid grid-cols-[240px_1fr]   ">
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
    </main>
  );
}

//overflow protocol
//use absolute positioning for overflow

// content start to stop items from ste
// react does not do anything when u pass the same prop

// dont use max-h-full isstead use scroll where u know content will overflow

//grid to stop using h-full

//suspense
// activated by the fiber tree- using the acctivity element which is set to hidden when suspending
// does not with useTransition
// the loading js wraps the entire page into a a suapsense component until all the other components are streamed in.
// wrapping a component that does async fetching in Supense and setting a fallback, esnsures that the loading.js file suspensing of the entire page is not affeted by this component.

//error boundary
// only catches error in the rendering not callback errors -TODO
// does not catch errors in the root of the component.
//the globalerror.js os sued to catch the erors in teh root layout and will replace the all layout withb the global eror page. used in case the root layout is handling data fetching
