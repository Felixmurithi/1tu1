import Button from "@/app/_components/Button";
import Logo from "@/app/_components/Logo";

export default function Home() {
  return (
    <main className="h-full grid">
      <div
        className="  m-4  text-white grid place-items-center rounded-2xl "
        style={{
          backgroundImage: `linear-gradient(rgba(106, 62, 77, 0.6) 90%,rgba(106, 62, 77, 0.6)
),url(/cover.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: `top center`,
        }}
      >
        <div className="w-[80%] mx-auto flex  justify-around h-fit gap-16 rounded-full">
          <div className="grid gap-6 items-start">
            <div className="grid gap-16">
              <div className="flex gap-6">
                <Logo />
                <p className="font-bold text-lg self-center">
                  Go out and meet new people.
                </p>
              </div>

              <div className="flex gap-4">
                <Button>signup</Button>
                <Button type="transparent" link="/api/auth/signin">
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// grid declartion to stop need for h-full
