import { Rule, Tree } from "@angular-devkit/schematics";

import { BaseConstructBuilder } from "@janush-schematics/cloud/common/baseConstructBuilder";

export class AppSyncConstructBuilder extends BaseConstructBuilder {
  constructor(projectName: string) {
    super(projectName);
  }

  addToCloudStack = (): Rule => {
    return (tree: Tree) => {
      const context = this.createContext(
        __dirname,
        "./otherFiles/cloudStack/appSyncConstruct.template",
      );
      const { constructChange, importChange } = this.addConstruct(tree, context, {
        destinationPathFile: context.cloudStackPath,
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
