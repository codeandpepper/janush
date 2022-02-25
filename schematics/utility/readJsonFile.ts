import { FileDoesNotExistException } from "@angular-devkit/schematics";
import path from "path";
import { readFileSync } from "fs";

const readJsonFile = (relativePath: string) => {
  const absolutePath = path.join(__dirname, "..", "..", relativePath);
  const rawData = readFileSync(absolutePath);
  if (!rawData) throw new FileDoesNotExistException(absolutePath);
  const jsonData = JSON.parse(rawData.toString());

  return jsonData;
};

export default readJsonFile;
