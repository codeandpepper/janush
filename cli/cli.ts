import { spawn } from "child_process";

export function cli() {
  console.log(__dirname);

  if (__dirname) {
    const path = __dirname.split("@")[1];

    console.log(path);

    spawn(`schematics @${path}packages/collection.json:app`, {
      stdio: "inherit",
      shell: true,
    });
  }
}
