import path from "path";
import { FileDoesNotExistException } from "@angular-devkit/schematics";
import { readFileSync } from "fs";

import { JANUSH_ROOT_PATH } from "@consts/index";

export const readJson = <T>(jsonRelativePath: string): T => {
  const jsonAbsolutePath = path.join(JANUSH_ROOT_PATH, jsonRelativePath);
  const fileBuffer = readFileSync(jsonAbsolutePath);

  if (!fileBuffer) throw new FileDoesNotExistException(jsonAbsolutePath);

  const jsonData: T = JSON.parse(fileBuffer.toString());

  return jsonData;
};
