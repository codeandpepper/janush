import * as path from "path";
import { spawn } from "child_process";

export function cli() {
  let directory;

  if (__dirname.includes("@")) {
    // npx via github
    directory = `@${path.join(__dirname, "..").split("@")[1]}`;
  } else {
    // installed project
    directory = path.join(__dirname, "..");
  }

  spawn(`schematics ${directory}/packages/collection.json:app`, {
    stdio: "inherit",
    shell: true,
  });
}
