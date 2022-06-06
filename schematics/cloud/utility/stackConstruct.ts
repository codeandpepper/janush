import { ConstructContextBase } from "@janush-schematics/cloud/interfaces/constructContextBase.interface";
import { FileDoesNotExistException, Tree } from "@angular-devkit/schematics";
import * as ts from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";
import { getEndCloseBraceTokenInConstructor } from "@utility/helpers";
import { InsertChange } from "@schematics/angular/utility/change";

// TODO use it in adding construct in Cognito and AppSync
export const getStackConstruct = <T extends ConstructContextBase>(tree: Tree, context: T) => {
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

  return new InsertChange(
    context.cloudStackPath,
    stackEndCloseBraceToken.getStart(),
    context.construct,
  );
};
