import { Rule, Tree } from "@angular-devkit/schematics";

import { BaseConstructBuilder } from "@janush-schematics/cloud/common/baseConstructBuilder";

export class AppSyncConstructBuilder extends BaseConstructBuilder {
  constructor(projectName: string) {
    super(projectName);
  }

  // private addConstructToStackRules = (
  //   tree: Tree,
  //   context: ConstructContextBase,
  // ): AppSyncConstructChangeRules => {
  //   const cloudStackText = tree.read(context.cloudStackPath);
  //
  //   if (!cloudStackText) {
  //     throw new FileDoesNotExistException(context.projectName);
  //   }
  //
  //   const sourceCloudStackText = cloudStackText.toString("utf-8");
  //
  //   const sourceFile = ts.createSourceFile(
  //     context.cloudStackPath,
  //     sourceCloudStackText,
  //     ts.ScriptTarget.Latest,
  //     true,
  //   );
  //
  //   const stackEndCloseBraceToken = getEndCloseBraceTokenInConstructor(sourceFile);
  //
  //   const constructChange = new InsertChange(
  //     context.cloudStackPath,
  //     stackEndCloseBraceToken.getStart(),
  //     context.construct,
  //   );
  //
  //   const importChange = insertImport(
  //     sourceFile,
  //     context.cloudStackPath,
  //     "AppSyncCdkConstruct",
  //     "./api/appSyncCdkConstruct",
  //   ) as InsertChange;
  //
  //   return { constructChange, importChange };
  // };

  addToCloudStack = (): Rule => {
    return (tree: Tree) => {
      const context = this.createContext(
        __dirname,
        "./otherFiles/cloudStack/appSyncConstruct.template",
      );
      const { constructChange, importChange } = this.addConstruct(tree, context, {
        symbolName: "AppSyncCdkConstruct",
        fileName: "./api/appSyncCdkConstruct",
      });

      const declarationRecorder = tree.beginUpdate(context.cloudStackPath);

      declarationRecorder.insertLeft(constructChange.pos, constructChange.toAdd);
      declarationRecorder.insertLeft(importChange.pos, importChange.toAdd);

      tree.commitUpdate(declarationRecorder);

      return tree;
    };
  };
}
