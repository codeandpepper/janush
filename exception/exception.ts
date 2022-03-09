const core_1 = require("@angular-devkit/core");

export class NoSuchDirectoryInPathException extends core_1.BaseException {
  constructor(path: string, directory: string) {
    super(`Such a directory ${directory} does not exist in path ${path}.`);
  }
}
