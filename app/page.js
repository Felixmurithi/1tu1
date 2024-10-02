import Button from "@/app/_components/Button";

export default function Home() {
  return (
    <main className="grid mobile:grid-cols-[1fr_2fr] p-16 bg-blue-background">
      <div className="grid h-fit gap-14 bg-blue-background text-white">
        <div className="grid h-fit gap-6">
          <h1 className=" mobile:text-5xl text-4xl tracking-tight ">
            Match your interests
          </h1>
          <p className="opacity-50">
            Find a life partner who reflects your life goals. Create a profile
            and find people with similar profile
          </p>
        </div>
        <Button>sign up</Button>
      </div>

      <img
        src="/cover.jpg"
        alt=""
        className="w-[300px] lg:w-[450px] justify-self-end"
      />
    </main>
  );
}
