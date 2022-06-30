import { Rule, Tree } from "@angular-devkit/schematics";

import { BaseConstructBuilder } from "@janush-schematics/cloud/common/baseConstructBuilder";

export class CreateUserGroupBuilder extends BaseConstructBuilder {
  constructor(projectName: string) {
    super(projectName);
  }

  addToStack = (): Rule => {
    return (tree: Tree) => {
      const context = this.createContext(
        __dirname,
        "./otherFiles/createUserGroupConstruct.template",
      );
      const { constructChange, importChange } = this.addConstruct(tree, context, {
        symbolName: "CreateUserGroupCdkConstruct",
        fileName: "./createUserGroup/createUserGroupCdkConstruct",
      });
      const declarationRecorder = tree.beginUpdate(context.cloudStackPath);
      declarationRecorder.insertLeft(constructChange.pos, constructChange.toAdd);
      declarationRecorder.insertLeft(importChange.pos, importChange.toAdd);

      tree.commitUpdate(declarationRecorder);

      return tree;
    };
  };
}
