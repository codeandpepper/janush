import {
  Rule,
  Tree,
} from "@angular-devkit/schematics";
import * as ts from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";
import { getSourceNodes } from "@schematics/angular/utility/ast-utils";

import { Schematic } from "@enums/Schematic";
import { InsertChange } from "@schematics/angular/utility/change";

export const changePackageJson = () => {
  return (tree: Tree) => {
    const filePath = `${Schematic.WEB}/package.json`;
    let fileContent = tree.read(filePath);

    const fileContentAsSourceCode =
      fileContent && fileContent.toString("utf-8");

    const modifiedFileToSave = ts.createSourceFile(
      filePath,
      fileContentAsSourceCode + "\n" ?? "error",
      ts.ScriptTarget.Latest,
      true
    );

    const nodes = getSourceNodes(modifiedFileToSave);

    const updatedTree = tree.beginUpdate(filePath);

    const stringLiterals = nodes.filter(
      (n) => n.kind === ts.SyntaxKind.StringLiteral
    );

    const scripts = stringLiterals.find((n) => n.getText() === '"scripts"');

    if (scripts) {
      const addMissingAbsolutePaths = new InsertChange(
        filePath,
        scripts.getEnd() + 4,
          '      "cy:lint": "eslint --ext .ts ./cypress --color",\n' +
          '      "cy:format": "prettier --ignore-path ./cypress/.prettierignore --write ./cypress/**/*.{ts,json}",\n' +
          '      "cy:open": "cypress open --config-file ./cypress/cypress.json",\n' +
          '      "cy:run": "node ./cypress/scripts/cypress-run.js",\n' +
          '      "cy:coverage:start": "react-app-rewired -r @cypress/instrument-cra start",\n'
      );

      updatedTree.insertLeft(
        addMissingAbsolutePaths.pos,
        addMissingAbsolutePaths.toAdd
      );
    }

    tree.commitUpdate(updatedTree);

    return tree;
  };
};

export const e2eChanges = (): Rule[] => {
  return [changePackageJson()];
};
