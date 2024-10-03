import Button from "@/app/_components/Button";
import Header from "@/app/_components/Header";

export default function Home() {
  return (
    <main
      className="h-dvh relative rounded-3xl m-4 text-white grid place-items-center "
      style={{
        backgroundImage: `linear-gradient(rgba(12, 15, 10, 0.2) 90%,rgba(12, 15, 10, 0.2)
),url(/cover.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: `top center`,
      }}
    >
      <Header />
      <div className="w-[80%] m-auto flex justify-around h-fit gap-16">
        <div className="grid gap-6 items-start">
          <h1 className="">Match your Interest</h1>
          <h3>Find long term relationships that fit you</h3>
          <Button>sign up</Button>
        </div>

        <ul className="grid gap-3">
          <li className="bold-list">✔ Long term relationships only</li>
          <li className="bold-list">✔ Match your interest</li>
          <li className="bold-list">✔ Match your profession</li>
        </ul>
      </div>
    </main>
  );
}
