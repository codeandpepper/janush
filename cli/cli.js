"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const path = require("path");
const arg = require("arg");
const child_process_1 = require("child_process");
const PATH_ARGUMENT = 1;
const PATH_ARGS = 2;
const COMMAND = 'command';
function parseArgumentsIntoOptions(rawArgs) {
    const args = arg({
        '--command': String,
        '--name': String,
        '--types': [String],
        '--debug': Boolean,
        '--c': '--command',
        '--n': '--name',
        '--t': '--types',
        '--d': '--debug',
    }, {
        // @ts-ignore
        argv: rawArgs.slice[PATH_ARGS],
    });
    return {
        command: args['--command'] || "app",
        name: args['--name'],
        types: args['--types']
    };
}
function encodeCommand(command, options) {
    return Object.entries(options).reduce((prev, [key, value]) => {
        if (!value || key === COMMAND) {
            return prev;
        }
        if (Array.isArray(value)) {
            return prev + ` --${key}={${value}}`;
        }
        return prev + ` --${key}=${value}`;
    }, command);
}
function cli(args) {
    let directory;
    if (__dirname.includes("@")) {
        //INFO: npx via github
        directory = `@${path.join(__dirname, "..").split("@")[PATH_ARGUMENT]}`;
    }
    else {
        //INFO: installed project
        directory = path.join(__dirname, "..");
    }
    const options = parseArgumentsIntoOptions(args);
    child_process_1.spawn(encodeCommand(`schematics ${directory}/packages/collection.json:${options.command}`, options), {
        stdio: "inherit",
        shell: true,
    });
}
exports.cli = cli;
//# sourceMappingURL=cli.js.map