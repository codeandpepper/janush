import arg from "arg";
import path from "path";

import { spawn } from "child_process";

import getCommandsHelpFromSchema from "@janush-schematics/utility/generateHelpFromSchema";

import { JANUSH_JSON_PATH, PACKAGE_JSON_PATH } from "@consts/index";
import {
	getCurrentWorkingDirectory,
	getDirectoryOfFileFromPath,
} from "@janush-schematics/utility/directoryUtils";
import { readJson } from "@janush-schematics/utility/jsonFilesUtils";

import { PackageJson } from "@interfaces/PackageJson";

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
interface Options {
	//INFO: Change 'command' to more suitable name for schematics' type
	command?: string;
	debug?: string;
	name?: string;
	isAutoGenerated?: boolean;
	skipInstall?: boolean;
	types?: string[];
	modules?: string[];
	e2e?: boolean;
	e2eModule?: string;
	version?: boolean;
	help?: boolean;
}

function parseArgumentsIntoOptions(rawArgs: string[]): Options {
	const args = arg(
		{
			"--command": String,
			"--debug": String,
			"--name": String,
			"--isAutoGenerated": Boolean,
			"--skipInstall": Boolean,
			"--types": [String],
			"--modules": [String],
			"--e2e": Boolean,
			"--e2eModule": String,
			"--version": Boolean,
			"--help": Boolean,
			"--c": "--command",
			"--d": "--debug",
			"--n": "--name",
			"--s": "--skipInstall",
			"--t": "--types",
			"--v": "--version",
			"--h": "--help",
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
		isAutoGenerated: args["--isAutoGenerated"],
		skipInstall: args["--skipInstall"],
		types: args["--types"],
		modules: args["--modules"],
		e2e: args["--e2e"],
		e2eModule: args["--e2eModule"],
		version: args["--version"],
		help: args["--help"],
	};
}

function encodeCommand(command: string, options: Options) {
	return Object.entries(options).reduce((prev, [key, value]) => {
		if (!value || key === COMMAND) {
			return prev;
		}

		const flags = ["e2e", "isAutoGenerated", "skipInstall"];

		if (flags.includes(key)) {
			return `${prev} --${key}`;
		}

		if (Array.isArray(value)) {
			return prev + value.reduce((prev, curr) => prev + ` --${key}=${curr}`, " ");
		}
		return prev + ` --${key}=${value}`;
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
