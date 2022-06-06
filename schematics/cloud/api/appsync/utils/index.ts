import { FileDoesNotExistException, Rule, Tree } from "@angular-devkit/schematics";
import * as ts from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";
import { insertImport } from "@schematics/angular/utility/ast-utils";
import { InsertChange } from "@schematics/angular/utility/change";
import * as fs from "fs";
import * as path from "path";

import { Schematic } from "@enums/Schematic";
import { ConstructContextBase } from "@janush-schematics/cloud/interfaces/constructContextBase.interface";
import { getEndCloseBraceTokenInConstructor } from "@utility/helpers";

interface AppSyncConstructChangeRules {
  importChange: InsertChange;
  constructChange: InsertChange;
}

const createAppSyncConstructContext = (projectName: string): ConstructContextBase => {
  const cloudStackPath = `${Schematic.CLOUD}/lib/${projectName}-stack.ts`;

  const construct = fs
    .readFileSync(path.join(__dirname, "..", "otherFiles/cloudStack/appSyncConstruct.template"))
    .toString("utf-8");

  return {
    cloudStackPath,
    construct,
    projectName,
  };
};

const addAppSyncConstructToStackRules = (
  tree: Tree,
  context: ConstructContextBase,
): AppSyncConstructChangeRules => {
  const cloudStackText = tree.read(context.cloudStackPath);

  if (!cloudStackText) {
    throw new FileDoesNotExistException(context.projectName);
  }

  const sourceCloudStackText = cloudStackText.toString("utf-8");

  const sourceFile = ts.createSourceFile(
    context.cloudStackPath,
    sourceCloudStackText,
    ts.ScriptTarget.Latest,
    true,
  );

  const stackEndCloseBraceToken = getEndCloseBraceTokenInConstructor(sourceFile);

  const constructChange = new InsertChange(
    context.cloudStackPath,
    stackEndCloseBraceToken.getStart(),
    context.construct,
  );

  const importChange = insertImport(
    sourceFile,
    context.cloudStackPath,
    "AppSyncCdkConstruct",
    "./api/appSyncCdkConstruct",
  ) as InsertChange;

  return { constructChange, importChange };
};

export const addAppSyncConstructToCloudStack = (projectName: string): Rule => {
  return (tree: Tree) => {
    const context = createAppSyncConstructContext(projectName);
    const { constructChange, importChange } = addAppSyncConstructToStackRules(tree, context);

    const declarationRecorder = tree.beginUpdate(context.cloudStackPath);

    declarationRecorder.insertLeft(constructChange.pos, constructChange.toAdd);
    declarationRecorder.insertLeft(importChange.pos, importChange.toAdd);

    tree.commitUpdate(declarationRecorder);

    return tree;
  };
};
