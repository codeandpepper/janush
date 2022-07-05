import { strings } from "@angular-devkit/core";
import {
  apply,
  applyTemplates,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  noop,
  Rule,
  schematic,
  SchematicContext,
  Tree,
  url,
} from "@angular-devkit/schematics";

import { UserGroups } from "@enums/Module";
import { Schematic } from "@enums/Schematic";
import { CreateUserGroupBuilder } from "@janush-schematics/cloud/usersManagement/createUserGroup/createUserGroupBuilder";
import { readJanushJSON } from "@utility/janushJson";

import { Schema } from "./schema";

export const cloudCognitoGroupsGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const janushFile = readJanushJSON(tree);
    const name = strings.dasherize(janushFile.name);
    const constructBuilder = new CreateUserGroupBuilder(name);

    options.name = name;
    options.defaultGroups = options.userGroups.includes(UserGroups.DEFAULT_GROUPS);

    return chain([
      mergeWith(
        apply(url("./files"), [
          applyTemplates({
            ...options,
            ...strings,
          }),
          move(`${Schematic.CLOUD}/lib/usersManagement/createUserGroup`),
        ]),
        MergeStrategy.Overwrite,
      ),
      schematic("applyPrettier", {}),
      options.defaultGroups ? constructBuilder.addToStack() : noop(),
    ]);
  };
};
