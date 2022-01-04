"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const path_1 = __importDefault(require("path"));
const arg_1 = __importDefault(require("arg"));
const child_process_1 = require("child_process");
const PATH_ARGS = 2;
const COMMAND = "command";
const SKIP_INSTALL = "skipInstall";
function parseArgumentsIntoOptions(rawArgs) {
    const args = arg_1.default({
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
        e2e: args["--e2e"],
        e2eModule: args["--e2eModule"],
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
        if (key === "e2e") {
            return prev + ` --e2e`;
        }
        if (Array.isArray(value)) {
            return (prev + value.reduce((prev, curr) => prev + ` --${key}=${curr}`, " "));
        }
        return prev + ` --${key}=${value}`;
    }, command);
}
function cli(args) {
    const options = parseArgumentsIntoOptions(args);
    const projectRoot = path_1.default.join(__dirname, "..");
    child_process_1.spawn(encodeCommand(`npm --prefix ${projectRoot} run schematics ${projectRoot}/schematics/collection.json:${options.command}`, options), {
        stdio: "inherit",
        shell: true,
    });
}
exports.cli = cli;
//# sourceMappingURL=cli.js.map