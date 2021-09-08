import * as path from "path";
import { spawn, exec } from "child_process";

export function cli() {
  console.log(path.join(__dirname, "../"));

  console.log(__dirname);
  exec("npm link");

  spawn(`schematics ${path.join(__dirname, "..")}/packages/collection.json:app`, {
    stdio: "inherit",
    shell: true,
  });
}
