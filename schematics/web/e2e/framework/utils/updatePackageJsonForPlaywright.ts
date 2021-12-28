import { Tree } from "@angular-devkit/schematics";

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
          "pw:lint": "eslint --ext .ts ./playwright --color",
          "pw:format": "prettier --write ./playwright/**/*.ts",
          "pw:open": "playwright test --config ./playwright/config.ts --headed",
          "pw:debug": "playwright test --config ./playwright/config.ts --debug",
          "pw:run": "playwright test --config ./playwright/config.ts",
          "pw:run:firefox":
            "playwright test --config ./playwright/config.ts --browser=firefox",
          "pw:run:webkit":
            "playwright test --config ./playwright/config.ts --browser=webkit",
        },
      },
      null,
      2
    );

    tree.overwrite(filePath, newPackageJson);

    return tree;
  };
};
