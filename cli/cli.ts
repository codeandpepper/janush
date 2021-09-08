import * as path from "path"
import { spawn } from "child_process"

export function cli() {
  console.log(path.join(__dirname, "../"));
  spawn(`schematics ${path.join(__dirname, "..")}/packages/collection.json:app`, { stdio: "inherit", shell: true});
}
