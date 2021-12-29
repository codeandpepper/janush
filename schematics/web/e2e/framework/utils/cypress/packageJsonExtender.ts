import { Tree } from "@angular-devkit/schematics";

import { Schematic } from "@enums/Schematic";
import { overwriteJsonFile } from "@janush-schematics/utility/overwriteJsonFile/overwriteJsonFile";

export const packageJsonExtender = (tree: Tree) => {
  overwriteJsonFile(tree, `${Schematic.WEB}/package.json`, {
    scripts: {
      "cy:lint": "eslint --ext .ts ./cypress --color",
      "cy:format":
        "prettier --ignore-path ./cypress/.prettierignore --write ./cypress/**/*.ts",
      "cy:open": "cypress open --config-file ./cypress/cypress.json",
      "cy:run": "node ./cypress/scripts/cypress-run.js",
      "cy:coverage:start": "react-app-rewired -r @cypress/instrument-cra start",
    },
    nyc: {
      "report-dir": "./cypress/reports/code-coverage",
      "temp-dir": "./cypress/reports/code-coverage/.nyc_output",
      reporter: ["html"],
    },
  });

  return tree;
};
