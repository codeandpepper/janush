import { FileDoesNotExistException, Rule, Tree } from "@angular-devkit/schematics";
import { insertImport } from "@schematics/angular/utility/ast-utils";

import * as ts from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";

import { Change, InsertChange } from "@schematics/angular/utility/change";
import { Schematic } from "@enums/Schematic";

interface CognitoConstructContext {
  constructPath: string;
  construct: string;
  projectName: string;
}

export const createCognitoConstructContext = (projectName: string): CognitoConstructContext => {
  const constructPath = `${Schematic.CLOUD}/lib/${projectName}-stack.ts`;

  const construct = "";

  return {
    constructPath,
    construct,
    projectName,
  };
};

export const addCognitoConstructToCloudStackRule = (
  tree: Tree,
  context: CognitoConstructContext,
): Change => {
  let cloudStackText = tree.read(context.constructPath);

  if (!cloudStackText) throw new FileDoesNotExistException(context.projectName);

  const sourceCloudStackText = cloudStackText.toString("utf-8");

  let sourceFile = ts.createSourceFile(
    context.constructPath,
    sourceCloudStackText,
    ts.ScriptTarget.Latest,
    true,
  );

  return insertImport(
    sourceFile,
    context.constructPath,
    "CognitoCdkConstruct",
    `@authorization/cognitoCdkConstruct.ts`,
  ) as InsertChange;
};

export const addCognitoConstructToCloudStack = (projectName: string): Rule => {
  return (tree: Tree) => {
    const context = createCognitoConstructContext(projectName);
    const change = addCognitoConstructToCloudStackRule(tree, context);

    const declarationRecorder = tree.beginUpdate(context.constructPath);

    if (change instanceof InsertChange) {
      declarationRecorder.insertLeft(change.pos, change.toAdd);
    }

    tree.commitUpdate(declarationRecorder);

    return tree;
  };
};
