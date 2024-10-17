import readFileData from "@/app/_lib/readFileData";

import Me from "@/app/_components/Me/Me";

export default async function Page({ params }) {
  const data = await readFileData("./app/_lib/users.json");

  return (
    <>
      <Me user={data[params.me]} userName={params.me} />
    </>
  );
}
