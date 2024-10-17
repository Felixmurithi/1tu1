import fsp from "fs/promises";
import path from "path";

export default async function readFileData(relativeFilePath) {
  const dataFilePath = path.join(process.cwd(), relativeFilePath);
  // json reading logic
  // const fileData = await fsp.readFile("./app/_lib/data.json");
  const fileData = await fsp.readFile(dataFilePath);

  const data = await JSON.parse(fileData);

  return data;
}
