import * as path from "path";
import * as arg from "arg";
import { spawn } from "child_process";

const PATH_ARGUMENT = 1;
const PATH_ARGS = 2;
const COMMAND = "command";
const SKIP_INSTALL = "skipInstall";

interface Options {
  //INFO: Change 'command' to more suitable name for schematics' type
  command?: string;
  debug?: string;
  name?: string;
  skipInstall?: boolean;
  types?: string[];
}

function parseArgumentsIntoOptions(rawArgs: string[]): Options {
  const args = arg(
    {
      "--command": String,
      "--debug": String,
      "--name": String,
      "--skipInstall": Boolean,
      "--types": [String],
      "--c": "--command",
      "--d": "--debug",
      "--n": "--name",
      "--s": "--skipInstall",
      "--t": "--types",
    },
    {
      // @ts-ignore
      argv: rawArgs.slice[PATH_ARGS],
      permissive: true,
    },
  );
  return {
    command: args["--command"] || "app",
    debug: args["--debug"] || "false",
    name: args["--name"],
    skipInstall: args["--skipInstall"],
    types: args["--types"],
  };
}

function encodeCommand(command: string, options: Options) {
  return Object.entries(options).reduce((prev, [key, value]) => {
    if (!value || key === COMMAND) {
      return prev;
    }
    if (key === SKIP_INSTALL) {
      return prev + ` --skipInstall`;
    }
    if (Array.isArray(value)) {
      return prev + value.reduce((prev, curr) => prev + ` --${key}=${curr}`, " ");
    }
    return prev + ` --${key}=${value}`;
  }, command);
}

export function cli(args: string[]) {
  let directory;

  if (__dirname.includes("@")) {
    //INFO: npx via github
    directory = `@${path.join(__dirname, "..").split("@")[PATH_ARGUMENT]}`;
  } else {
    //INFO: installed project
    directory = path.join(__dirname, "..");
  }

  const options = parseArgumentsIntoOptions(args);

  spawn(
    encodeCommand(`schematics ${directory}/packages/collection.json:${options.command}`, options),
    {
      stdio: "inherit",
      shell: true,
    },
  );
}
