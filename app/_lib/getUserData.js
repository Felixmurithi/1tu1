import fsp from "fs/promises";
import path from "path";

export default async function getuserData(id) {
  const dataFilePath = path.join(process.cwd(), "app/_lib/users.json");

  // json reading logic
  // const fileData = await fsp.readFile("./app/_lib/data.json");
  const data = await fsp.readFile(dataFilePath);
  const userData = await JSON.parse(data);

  return userData[id - 1];
}
