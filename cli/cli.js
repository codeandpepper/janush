"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const path = require("path");
const child_process_1 = require("child_process");
function cli() {
    console.log(path.join(__dirname, "../"));
    console.log(__dirname);
    child_process_1.spawn(`schematics ${path.join(__dirname, "..")}/packages/collection.json:app`, {
        stdio: "inherit",
        shell: true,
    });
}
exports.cli = cli;
//# sourceMappingURL=cli.js.map