import { Tree } from "@angular-devkit/schematics";

import { Schematic } from "@enums/Schematic";
import { mergeJsonFile } from "@janush-schematics/utility/mergeJsonFile/mergeJsonFile";

export const tsConfigExtender = (tree: Tree) => {
  mergeJsonFile(tree, `${Schematic.WEB}/tsconfig.paths.json`, {
    compilerOptions: {
      paths: {
        "@components/*": ["./src/components/*"],
        "@consts/*": ["./src/consts/*"],
        "@interfaces/*": ["./src/interfaces/*"],
        "@janush-types/*": ["./src/types/*"],
        "@utils/*": ["./src/utils/*"],
      },
    },
  });

  return tree;
};
