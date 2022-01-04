import path from "path";
import arg from "arg";
import { spawn } from "child_process";

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
  modules?: string[];
  e2e?: boolean;
  e2eModule?: string;
}

function parseArgumentsIntoOptions(rawArgs: string[]): Options {
  const args = arg(
    {
      "--command": String,
      "--debug": String,
      "--name": String,
      "--skipInstall": Boolean,
      "--types": [String],
      "--modules": [String],
      "--e2e": Boolean,
      "--e2eModule": String,
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
    }
  );
  return {
    command: args["--command"] || "app",
    debug: args["--debug"] || "false",
    name: args["--name"],
    skipInstall: args["--skipInstall"],
    types: args["--types"],
    modules: args["--modules"],
    e2e: args["--e2e"],
    e2eModule: args["--e2eModule"],
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
    if (key === "e2e") {
      return prev + ` --e2e`;
    }
    if (Array.isArray(value)) {
      return (
        prev + value.reduce((prev, curr) => prev + ` --${key}=${curr}`, " ")
      );
    }
    return prev + ` --${key}=${value}`;
  }, command);
}

export function cli(args: string[]) {
  const options = parseArgumentsIntoOptions(args);

  const projectRoot = path.join(__dirname, "..");

  spawn(
    encodeCommand(
      `npm --prefix ${projectRoot} run schematics ${projectRoot}/schematics/collection.json:${options.command}`,
      options
    ),
    {
      stdio: "inherit",
      shell: true,
      cwd: ".",
    }
  );
}
