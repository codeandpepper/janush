import { Rule, Tree } from "@angular-devkit/schematics";
import { InsertChange } from "@schematics/angular/utility/change";
import { Schema } from "../../application/schema";
import modifyCommandTs from "./updateCommandsTs/change";

function addAuthenticationRule(_options: Schema): Rule {
  return (tree: Tree) => {
    const changesInCommansTs = modifyCommandTs(tree);
    const updateRecorder = tree.beginUpdate("web/cypress/support/commands.ts");

    if (changesInCommansTs instanceof InsertChange) {
      updateRecorder.insertLeft(
        changesInCommansTs.pos,
        changesInCommansTs.toAdd
      );
    }

    tree.commitUpdate(updateRecorder);

    return tree;
  };
}

export default addAuthenticationRule;
