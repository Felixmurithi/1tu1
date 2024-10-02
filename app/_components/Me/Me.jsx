"use client";

import { useState } from "react";
import Aside from "./Aside";
import Profile from "./Profile";

function Me() {
  const [tab, setTab] = useState(0);
  return (
    <main className=" grid gap-16  grid-cols-[1fr_4fr] bg-[#f7f7f7]">
      <Aside tab={tab} setTab={setTab} />

      {[<Profile key={0} />, "hi"].filter((component, i) => tab === i)}
    </main>
  );
}

export default Me;
