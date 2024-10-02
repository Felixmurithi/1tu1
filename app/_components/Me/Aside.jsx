"use client";

const tabs = ["Profile", " Matches", " Preferences +", "Settings"];

function Aside({ tab, setTab }) {
  return (
    <aside className="flex flex-col gap-10   padding-top pl-4 pr-2 w-fit">
      {tabs.map((_, i) => {
        const active = tab === i;
        return (
          <button
            onClick={() => setTab(i)}
            key={i}
            className={`${
              active
                ? " text-stone-800 rounded-l-lg py-4 font-semibold h-fit w-fit"
                : "bg-white text-stone-800  font-semibold  py-4 w-fit opacity-30"
            } h-fit`}
          >
            {tabs[i]}
          </button>
        );
      })}
    </aside>
  );
}

export default Aside;
