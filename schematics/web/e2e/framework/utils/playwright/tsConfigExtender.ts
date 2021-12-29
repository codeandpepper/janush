import { Tree } from "@angular-devkit/schematics";

import { Schematic } from "@enums/Schematic";
import { overwriteJsonFile } from "@janush-schematics/utility/overwriteJsonFile/overwriteJsonFile";

export const tsConfigExtender = (tree: Tree) => {
  overwriteJsonFile(tree, `${Schematic.WEB}/tsconfig.json`, {
    include: ["playwright"],
  });

  return tree;
};
