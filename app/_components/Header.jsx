import Button from "@/app/_components/Button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex w-full justify-between py-5 gap-3 text-sm mobile:text-base px-10 border-b-blue-background border-b ">
      <Link
        className="text-orange-accent tracking-wide italic font-extrabold"
        href={"/"}
      >
        <h2>Ideally</h2>
      </Link>
      {/* <img src="" alt="" /> */}

      <div className="flex gap-1 mobile:gap-4 items-center">
        <p>join us today</p>
        <Button type="transparent">sign up</Button>
      </div>
      {/* <ul className="flex">
        <li>icon</li>
        <li>notifications</li>
      </ul> */}
    </header>
  );
}
