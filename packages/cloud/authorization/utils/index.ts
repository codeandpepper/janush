import {
  FileDoesNotExistException,
  Rule,
  SchematicsException,
  Tree,
} from "@angular-devkit/schematics";
import { getSourceNodes, insertImport } from "@schematics/angular/utility/ast-utils";

import * as ts from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";
import * as fs from "fs";
import * as path from "path";

import { InsertChange } from "@schematics/angular/utility/change";
import { Schematic } from "@enums/Schematic";
import { Buffer } from "buffer";

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
    .readFileSync(path.join(__dirname, "..", "other-files/cloud-stack/authorization-context.txt"))
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

  let sourceFile = ts.createSourceFile(
    context.cloudStackPath,
    sourceCloudStackText,
    ts.ScriptTarget.Latest,
    true,
  );

  let nodes: ts.Node[] = getSourceNodes(sourceFile);

  const stackConstructorNode = nodes.find((n) => n.kind === ts.SyntaxKind.Constructor);

  const stackConstructorNodeBlock = stackConstructorNode
    ?.getChildren()
    ?.find((n) => n.kind === ts.SyntaxKind.Block);

  const stackConstructorNodeBlockCloseBraceToken = stackConstructorNodeBlock
    ?.getChildren()
    .find((n) => n.kind === ts.SyntaxKind.CloseBraceToken);

  if (!stackConstructorNodeBlockCloseBraceToken) {
    throw new SchematicsException("It is impossible to add constructor to your stack.");
  }

  const constructChange = new InsertChange(
    context.cloudStackPath,
    stackConstructorNodeBlockCloseBraceToken.getStart(),
    context.construct,
  );

  const importChange = insertImport(
    sourceFile,
    context.cloudStackPath,
    "CognitoCdkConstruct",
    "./authorization/cognitoCdkConstruct.ts",
  ) as InsertChange;

  return { constructChange, importChange };
};

export const addCognitoConstructToCloudStack = (projectName: string): Rule => {
  return (tree: Tree) => {
    const context = createCognitoConstructContext(projectName);
    const { constructChange, importChange } = addCognitoConstructToCloudStackRules(tree, context);

    const declarationRecorder = tree.beginUpdate(context.cloudStackPath);

    declarationRecorder.insertLeft(
      constructChange.pos,
      Buffer.from(constructChange.toAdd, "utf-8"),
    );
    declarationRecorder.insertLeft(importChange.pos, importChange.toAdd);

    tree.commitUpdate(declarationRecorder);

    return tree;
  };
};
