import path from "path";
import { readFileSync } from "fs";

const readJsonFile = (relativePath: string) => {
  const absolutePath = path.join(__dirname, "..", "..", relativePath);
  const rawData = readFileSync(absolutePath);
  const jsonData = JSON.parse(rawData.toString());

  return jsonData;
};

export default readJsonFile;
