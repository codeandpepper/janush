import { Rule, Tree } from "@angular-devkit/schematics";

import { Schematic } from "@enums/Schematic";
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
        destinationPathFile: `${Schematic.CLOUD}/lib/api/appSyncCdkConstruct.ts`,
        symbolName: "CreateUserGroupCdkConstruct",
        fileName: "./usersManagement/createUserGroup/createUserGroupCdkConstruct",
      });
      const declarationRecorder = tree.beginUpdate(context.cloudStackPath);
      declarationRecorder.insertLeft(constructChange.pos, constructChange.toAdd);
      declarationRecorder.insertLeft(importChange.pos, importChange.toAdd);

      tree.commitUpdate(declarationRecorder);

      return tree;
    };
  };
}
