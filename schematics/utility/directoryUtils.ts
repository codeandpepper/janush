import path from "path";
import { existsSync } from "fs";
import { spawnSync } from "child_process";

import { NoSuchDirectoryInPathException } from "@exception/exception";

export const trimPathToDirectoryName = (path: string, directory: string): string => {
  if (!path.includes(directory)) throw new NoSuchDirectoryInPathException(path, directory);

  const pathComponents = path.split("/");
  const directoryIndexInPath = pathComponents.findIndex((pathComponent) =>
    pathComponent.includes(directory),
  );

  if (pathComponents.length === directoryIndexInPath + 1) return path;

  return pathComponents.slice(0, directoryIndexInPath - pathComponents.length + 1).join("/");
};

export const getCurrentWorkingDirectory = (): string => {
  return spawnSync("pwd")
    .stdout.toString()
    .replace(/^\n+|\n+$/g, "");
};

export const getDirectoryOfFileFromPath = (filePath: string, fileName: string): string => {
  const pathComponents = filePath.split("/");

  do {
    const searchedPath = path.join(pathComponents.join("/"), fileName);
    if (existsSync(searchedPath)) return path.dirname(searchedPath);
  } while (!!pathComponents.pop());

  return "";
};
