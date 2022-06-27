import { dasherize } from "@angular-devkit/core/src/utils/strings";
import arg from "arg";
import { spawn } from "child_process";
import path from "path";

import { JANUSH_JSON_PATH, PACKAGE_JSON_PATH } from "@consts/index";
import { CLIOptions } from "@interfaces/CLIOptions";
import { PackageJson } from "@interfaces/PackageJson";
import {
  getCurrentWorkingDirectory,
  getDirectoryOfFileFromPath,
} from "@janush-schematics/utility/directoryUtils";
import getCommandsHelpFromSchema from "@janush-schematics/utility/generateHelpFromSchema";
import { readJson } from "@janush-schematics/utility/jsonFilesUtils";

const PATH_ARGS = 2;
const COMMAND = "command";
const SCHEMA_JSON_PATH = path.join("schematics", "application", "schema.json");
const SCHEMATICS_CLI_PATH = path.join(
  __dirname,
  "..",
  "node_modules",
  "@angular-devkit",
  "schematics-cli",
  "bin",
  "schematics.js",
);
const SCHEMATICS_COLLECTION_PATH = path.join(__dirname, "..", "schematics", "collection.json");

function parseArgumentsIntoOptions(rawArgs: string[]): CLIOptions {
  const args = arg(
    {
      "--command": String,
      "--debug": String,
      "--name": String,
      "--is-auto-generated": Boolean,
      "--skip-install": Boolean,
      "--types": [String],
      "--modules": [String],
      "--e2e": Boolean,
      "--e2e-module": String,
      "--version": Boolean,
      "--help": Boolean,
      "-c": "--command",
      "-d": "--debug",
      "-n": "--name",
      "-s": "--skip-install",
      "-t": "--types",
      "-v": "--version",
      "-h": "--help",
    },
    {
      argv: rawArgs.slice(PATH_ARGS),
      permissive: true,
    },
  );
  return {
    command: args["--command"] || "app",
    debug: args["--debug"] || "false",
    name: args["--name"],
    isAutoGenerated: args["--is-auto-generated"],
    skipInstall: args["--skip-install"],
    types: args["--types"],
    modules: args["--modules"],
    e2e: args["--e2e"],
    e2eModule: args["--e2e-module"],
    version: args["--version"],
    help: args["--help"],
  };
}

function encodeCommand(command: string, options: CLIOptions) {
  return Object.entries(options).reduce((prev, [key, value]) => {
    const formattedKey = dasherize(key);

    if (!value || formattedKey === COMMAND) {
      return prev;
    }

    const flags = ["e2e", "is-auto-generated", "skip-install"];

    if (flags.includes(formattedKey)) {
      return `${prev} --${formattedKey}`;
    }

    if (Array.isArray(value)) {
      return prev + value.reduce((prev, curr) => prev + ` --${formattedKey}=${curr}`, " ");
    }
    return prev + ` --${formattedKey}=${value}`;
  }, command);
}

export function cli(args: string[]) {
  const options = parseArgumentsIntoOptions(args);

  if (!!options.version) {
    console.log(`v${readJson<PackageJson>(PACKAGE_JSON_PATH).version}`);
  } else if (!!options.help) {
    console.log(getCommandsHelpFromSchema(SCHEMA_JSON_PATH));
  } else {
    const currentWorkingDirectory = getCurrentWorkingDirectory();
    const janushRootDirectory = getDirectoryOfFileFromPath(
      currentWorkingDirectory,
      JANUSH_JSON_PATH,
    );

    spawn(
      encodeCommand(
        `${SCHEMATICS_CLI_PATH} ${SCHEMATICS_COLLECTION_PATH}:${options.command}`,
        options,
      ),
      {
        stdio: "inherit",
        shell: true,
        cwd: janushRootDirectory,
      },
    );
  }
}
