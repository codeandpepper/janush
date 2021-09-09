import * as path from "path";
import * as arg from 'arg';
import { spawn } from "child_process";

const PATH_ARGUMENT = 1;
const PATH_ARGS = 2;
const COMMAND = 'command';

interface Options {
  //INFO: Change 'command' to more suitable name for schematics' type
  command?: string;
  name?: string;
  types?: string[];
  debug?: boolean;
}

function parseArgumentsIntoOptions(rawArgs: string[]): Options {
  const args = arg(
    {
      '--command': String,
      '--name': String,
      '--types': [String],
      '--debug': Boolean,
      '--c': '--command',
      '--n': '--name',
      '--t': '--types',
      '--d': '--debug',
    },
    {
      // @ts-ignore
      argv: rawArgs.slice[PATH_ARGS],
    }
  );
  return {
    command: args['--command'] || "app",
    name: args['--name'],
    types: args['--types']
  }
}

function encodeCommand(command: string, options: Options) {
  return Object.entries(options).reduce((prev, [key, value]) => {
    if (!value || key === COMMAND) {
      return prev;
    }
    if (Array.isArray(value)) {
      return prev + ` --${key}={${value}}`;
    }
    return prev + ` --${key}=${value}`;
  }, command)
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

  spawn(encodeCommand(`schematics ${directory}/packages/collection.json:${options.command}`, options), {
    stdio: "inherit",
    shell: true,
  });
}
