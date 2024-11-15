import Header from "@/app/_components/Header";
import Dates from "@/app/_components/dates/Dates";

export default function page() {
  return (
    <main className="grid tracking h-full  grid-rows-[auto_1fr]">
      <Header />
      <Dates />
    </main>
  );
}

// h-full too make it same size because porent is not a grid
