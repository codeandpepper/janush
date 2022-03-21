import { Tree } from "@angular-devkit/schematics";

import { Schematic } from "@enums/Schematic";
import { mergeJsonFile } from "@janush-schematics/utility/mergeJsonFile/mergeJsonFile";

export const packageJsonExtender = (tree: Tree) => {
  mergeJsonFile(tree, `${Schematic.WEB}/package.json`, {
    scripts: {
      "pw:lint": "eslint --ext .ts ./playwright --color",
      "pw:format": "prettier --write ./playwright/**/*.ts",
      "pw:open": "playwright test --config ./playwright/config.ts --headed",
      "pw:debug": "playwright test --config ./playwright/config.ts --debug",
      "pw:run": "playwright test --config ./playwright/config.ts",
      "pw:run:firefox": "playwright test --config ./playwright/config.ts --browser=firefox",
      "pw:run:webkit": "playwright test --config ./playwright/config.ts --browser=webkit",
    },
  });

  return tree;
};
