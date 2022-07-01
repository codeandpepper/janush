import { Tree } from "@angular-devkit/schematics";

import { Schematic } from "@enums/Schematic";
import { mergeJsonFile } from "@janush-schematics/utility/mergeJsonFile/mergeJsonFile";

export const packageJsonExtender = (tree: Tree) => {
  mergeJsonFile(tree, `${Schematic.WEB}/package.json`, {
    jest: {
      moduleNameMapper: {
        "@components/(.*)": "<rootDir>/src/components/$1",
        "@consts/(.*)": "<rootDir>/src/consts/$1",
        "@interfaces/(.*)": "<rootDir>/src/interfaces/$1",
        "@janush-types/(.*)": "<rootDir>/src/types/$1",
        "@utils/(.*)": "<rootDir>/src/utils/$1",
        "@features/(.*)": "<rootDir>/src/features/$1",
        "@layouts/(.*)": "<rootDir>/src/layouts/$1",
        "@routing/(.*)": "<rootDir>/src/routing/$1",
        "@themes/(.*)": "<rootDir>/src/themes/$1",
        "@validations/(.*)": "<rootDir>/src/validations/$1",
      },
    },
  });

  return tree;
};
