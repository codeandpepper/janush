import {
  FileDoesNotExistException,
  Rule,
  Tree,
} from "@angular-devkit/schematics";
import { insertImport } from "@schematics/angular/utility/ast-utils";

import * as ts from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";
import * as fs from "fs";
import * as path from "path";

import { InsertChange } from "@schematics/angular/utility/change";
import { Schematic } from "@enums/Schematic";

import { getEndCloseBraceTokenInConstruct } from "@utility/functions";

interface CognitoConstructChangeRules {
  importChange: InsertChange;
  constructChange: InsertChange;
}

interface EmailConstructContext {
  cognitoUserPoolConstructPath: string;
  construct: string;
}

const COGNITO_USER_POOL_CONSTRUCT = "cognitoUserPoolCdkConstruct.ts";

const createEmailsConstructContext = (): EmailConstructContext => {
  const cognitoUserPoolConstructPath = `${Schematic.CLOUD}/lib/authentication/${COGNITO_USER_POOL_CONSTRUCT}`;

  const construct = fs
    .readFileSync(
      path.join(
        __dirname,
        "../other-files/cognito-user-pool/emails-construct.template"
      )
    )
    .toString("utf-8");

  return {
    cognitoUserPoolConstructPath,
    construct,
  };
};

const addEmailsConstructToCognitoConstructRules = (
  tree: Tree,
  context: EmailConstructContext
): CognitoConstructChangeRules => {
  let userPoolConstructText = tree.read(context.cognitoUserPoolConstructPath);

  if (!userPoolConstructText)
    throw new FileDoesNotExistException(COGNITO_USER_POOL_CONSTRUCT);

  const sourceUserPoolConstructText = userPoolConstructText.toString("utf-8");

  const sourceFile = ts.createSourceFile(
    context.cognitoUserPoolConstructPath,
    sourceUserPoolConstructText,
    ts.ScriptTarget.Latest,
    true
  );

  const stackEndCloseBraceToken = getEndCloseBraceTokenInConstruct(sourceFile);

  const constructChange = new InsertChange(
    context.cognitoUserPoolConstructPath,
    stackEndCloseBraceToken.getStart(),
    context.construct
  );

  const importChange = insertImport(
    sourceFile,
    context.cognitoUserPoolConstructPath,
    "EmailsCdkConstruct",
    "./emails/emailsCdkConstruct"
  ) as InsertChange;

  return { constructChange, importChange };
};

export const addEmailsConstructToCognitoConstruct = (): Rule => {
  return (tree: Tree) => {
    const context = createEmailsConstructContext();
    const { constructChange, importChange } =
      addEmailsConstructToCognitoConstructRules(tree, context);

    const declarationRecorder = tree.beginUpdate(
      context.cognitoUserPoolConstructPath
    );

    declarationRecorder.insertLeft(constructChange.pos, constructChange.toAdd);
    declarationRecorder.insertLeft(importChange.pos, importChange.toAdd);

    tree.commitUpdate(declarationRecorder);

    return tree;
  };
};
