import { Tree } from "@angular-devkit/schematics";

import { Schematic } from "@enums/Schematic";
import { mergeJsonFile } from "@janush-schematics/utility/mergeJsonFile/mergeJsonFile";

export const tsConfigExtender = (tree: Tree) => {
  mergeJsonFile(tree, `${Schematic.WEB}/tsconfig.json`, {
    include: ["playwright"],
  });

  return tree;
};
