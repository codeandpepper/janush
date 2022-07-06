import { FileDoesNotExistException, Rule, Tree } from "@angular-devkit/schematics";
import * as ts from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";
import { insertImport } from "@schematics/angular/utility/ast-utils";
import { InsertChange } from "@schematics/angular/utility/change";
import * as fs from "fs";
import * as path from "path";

import { Schematic } from "@enums/Schematic";
import { getEndCloseBraceTokenInConstructor } from "@utility/helpers";

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
    .readFileSync(
      path.join(__dirname, "..", "otherFiles/cloudStack/authenticationConstruct.template"),
    )
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
  const cloudStackText = tree.read(context.cloudStackPath);

  if (!cloudStackText) throw new FileDoesNotExistException(context.projectName);

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
    "CognitoCdkConstruct",
    "./authentication/cognitoCdkConstruct",
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

export const addEnvironmentValidation = (): Rule => {
  return (tree: Tree): Tree => {
    const filePath = `${Schematic.CLOUD}/bin/index.ts`;

    const { pos, toAdd } = new InsertChange(filePath, 0, `import "./environment";`);

    const updatedTree = tree.beginUpdate(filePath).insertLeft(pos, toAdd);
    tree.commitUpdate(updatedTree);
    return tree;
  };
};
