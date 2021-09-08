"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const child_process_1 = require("child_process");
function cli() {
    console.log(__dirname);
    if (__dirname) {
        const path = __dirname.split("@")[1];
        console.log(path);
        child_process_1.spawn(`schematics @${path}packages/collection.json:app`, {
            stdio: "inherit",
            shell: true,
        });
    }
}
exports.cli = cli;
//# sourceMappingURL=cli.js.map