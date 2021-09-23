import { FileDoesNotExistException, Rule, Tree } from "@angular-devkit/schematics";
import { insertImport } from "@schematics/angular/utility/ast-utils";

import * as ts from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";
import * as fs from "fs";
import * as path from "path";

import { InsertChange } from "@schematics/angular/utility/change";
import { Schematic } from "@enums/Schematic";

import { getEndCloseBraceTokenInCloudStack } from "@utility/functions";

interface CognitoConstructChangeRules {
  importChange: InsertChange;
  constructChange: InsertChange;
}

interface CognitoConstructContext {
  cloudStackPath: string;
  serviceProviderPath: string;
  construct: string;
  projectName: string;
}

const createCognitoConstructContext = (projectName: string): CognitoConstructContext => {
  const cloudStackPath = `${Schematic.CLOUD}/lib/${projectName}-stack.ts`;
  const serviceProviderPath = `${Schematic.CLOUD}/enums/EnvName.ts`;

  const construct = fs
    .readFileSync(path.join(__dirname, "..", "other-files/cloud-stack/authorization-construct.txt"))
    .toString("utf-8");

  return {
    cloudStackPath,
    serviceProviderPath,
    construct,
    projectName,
  };
};

const addCognitoConstructToCloudStackRules = (
  tree: Tree,
  context: CognitoConstructContext,
): CognitoConstructChangeRules => {
  let cloudStackText = tree.read(context.cloudStackPath);

  if (!cloudStackText) throw new FileDoesNotExistException(context.projectName);

  const sourceCloudStackText = cloudStackText.toString("utf-8");

  const sourceFile = ts.createSourceFile(
    context.cloudStackPath,
    sourceCloudStackText,
    ts.ScriptTarget.Latest,
    true,
  );

  const stackEndCloseBraceToken = getEndCloseBraceTokenInCloudStack(sourceFile);

  const constructChange = new InsertChange(
    context.cloudStackPath,
    stackEndCloseBraceToken.getStart(),
    context.construct,
  );

  const importChange = insertImport(
    sourceFile,
    context.cloudStackPath,
    "CognitoCdkConstruct",
    "./authorization/cognitoCdkConstruct",
  ) as InsertChange;

  return { constructChange, importChange };
};

export const addCognitoConstructToCloudStack = (projectName: string): Rule => {
  return (tree: Tree) => {
    const context = createCognitoConstructContext(projectName);
    const { constructChange, importChange } = addCognitoConstructToCloudStackRules(tree, context);

    const declarationRecorder = tree.beginUpdate(context.cloudStackPath);

    declarationRecorder.insertLeft(constructChange.pos, constructChange.toAdd);
    declarationRecorder.insertLeft(importChange.pos, importChange.toAdd);

    tree.commitUpdate(declarationRecorder);

    return tree;
  };
};
