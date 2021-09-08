"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const path = require("path");
const child_process_1 = require("child_process");
function cli() {
    let directory;
    if (__dirname.includes("@")) {
        // npx via github
        directory = `@${path.join(__dirname, "..").split("@")[1]}`;
    }
    else {
        // installed project
        directory = `${path.join(__dirname, "..")}/`;
    }
    child_process_1.spawn(`schematics ${directory}packages/collection.json:app`, {
        stdio: "inherit",
        shell: true,
    });
}
exports.cli = cli;
//# sourceMappingURL=cli.js.map