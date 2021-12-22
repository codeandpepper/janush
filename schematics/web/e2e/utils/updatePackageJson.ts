import { Rule, Tree } from "@angular-devkit/schematics";

import { Schematic } from "@enums/Schematic";

export const updatePackageJson = () => {
  return (tree: Tree) => {
    const filePath = `${Schematic.WEB}/package.json`;
    let fileContent = tree.read(filePath);

    if (!fileContent) {
      throw new Error(`${filePath} not found.`);
    }

    const packageJsonObj = JSON.parse(fileContent.toString());

    const newPackageJson = JSON.stringify(
      {
        ...packageJsonObj,
        scripts: {
          ...packageJsonObj.scripts,
          "cy:lint": "eslint --ext .ts ./cypress --color",
          "cy:format":
            "prettier --ignore-path ./cypress/.prettierignore --write ./cypress/**/*.{ts,json}",
          "cy:open": "cypress open --config-file ./cypress/cypress.json",
          "cy:run": "node ./cypress/scripts/cypress-run.js",
          "cy:coverage:start":
            "react-app-rewired -r @cypress/instrument-cra start",
        },
        nyc: {
          "report-dir": "./cypress/reports/code-coverage",
          "temp-dir": "./cypress/reports/code-coverage/.nyc_output",
          reporter: ["html"],
        },
      },
      null,
      2
    );

    tree.overwrite(filePath, newPackageJson);

    return tree;
  };
};

export const e2eChanges = (): Rule[] => {
  return [updatePackageJson()];
};
