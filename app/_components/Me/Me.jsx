"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Aside from "./Aside";
import Matches from "./Matches";
import Settings from "@/app/_components/Me/Settings/Settings";
import Profile from "./Profile";
import Link from "next/link";
import Bio from "@/app/_components/Me/Profile/Bio";
import Dating from "@/app/_components/Me/Profile/Dating";
import Interest from "@/app/_components/Me/Profile/Interest";
import Header from "@/app/_components/Header";

function Me({ user }) {
  const [tab, setTab] = useState(0);
  return (
    <main className="grid gap-6 h-">
      <Header />
      <div className="grid gap-10 px-10">
        <Profile user={user} />
        <div className="grid gap-6 bg-grey p-4">
          <Bio user={user} />

          <Interest user={user} />

          <Dating user={user} />

          {/* <Preferences /> */}
        </div>
      </div>
    </main>
  );
}

export default Me;
