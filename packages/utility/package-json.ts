import * as fs from "fs";

export const readPackageJson = async () => {
  console.log(process.cwd());
  const file = fs.readFileSync("package.json");

  if (!file) {
    return;
  }

  return JSON.parse(file.toString("utf-8"));
};
