#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arg = require("arg");
const child_process_1 = require("child_process");
const PATH_ARGS = 2;
const COMMAND = "command";
const SKIP_INSTALL = "skipInstall";
function parseArgumentsIntoOptions(rawArgs) {
    const args = arg({
        "--command": String,
        "--debug": String,
        "--name": String,
        "--skipInstall": Boolean,
        "--types": [String],
        "--modules": [String],
        "--c": "--command",
        "--d": "--debug",
        "--n": "--name",
        "--s": "--skipInstall",
        "--t": "--types",
    }, {
        // @ts-ignore
        argv: rawArgs.slice[PATH_ARGS],
        permissive: true,
    });
    return {
        command: args["--command"] || "app",
        debug: args["--debug"] || "false",
        name: args["--name"],
        skipInstall: args["--skipInstall"],
        types: args["--types"],
        modules: args["--modules"],
    };
}
function encodeCommand(command, options) {
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
const options = parseArgumentsIntoOptions(process.argv);
child_process_1.spawn(encodeCommand(`schematics ./packages/collection.json:${options.command}`, options), {
    stdio: "inherit",
    shell: true,
});
//# sourceMappingURL=index.js.map