import { Rule, Tree } from "@angular-devkit/schematics";

import { BaseConstructBuilder } from "@janush-schematics/cloud/common/baseConstructBuilder";

export class GetUserGroupsBuilder extends BaseConstructBuilder {
  constructor(projectName: string) {
    super(projectName);
  }

  addToStack = (): Rule => {
    return (tree: Tree) => {
      const context = this.createContext(__dirname, "./otherFiles/getUserGroupsConstruct.template");

      const { constructChange, importChange } = this.addConstruct(tree, context, {
        destinationPathFile: context.cloudStackPath,
        symbolName: "GetUserGroupsCdkConstruct",
        fileName: "./usersManagement/getUserGroups/getUserGroupsCdkConstruct",
      });

      const declarationRecorder = tree.beginUpdate(context.cloudStackPath);
      declarationRecorder.insertLeft(constructChange.pos, constructChange.toAdd);
      declarationRecorder.insertLeft(importChange.pos, importChange.toAdd);

      tree.commitUpdate(declarationRecorder);

      return tree;
    };
  };
}
