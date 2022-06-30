import { strings } from "@angular-devkit/core";
import {
  apply,
  applyTemplates,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  schematic,
  SchematicContext,
  Tree,
  url,
} from "@angular-devkit/schematics";

import { Schematic } from "@enums/Schematic";
import { AppSyncConstructBuilder } from "@janush-schematics/cloud/api/appsync/appSyncConstructBuilder";
import { readJanushJSON } from "@utility/janushJson";

import { Schema } from "./schema";

export const cloudCognitoGroupsGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const janushFile = readJanushJSON(tree);
    const name = strings.dasherize(janushFile.name);
    const constructBuilder = new AppSyncConstructBuilder(name);

    options.name = name;

    return chain([
      mergeWith(
        apply(url("./files"), [
          applyTemplates({
            ...options,
            ...strings,
          }),
          move(`${Schematic.CLOUD}/lib/authentication/createUserGroup`),
        ]),
        MergeStrategy.Overwrite,
      ),
      schematic("applyPrettier", {}),
      constructBuilder.addToCloudStack(),
    ]);
  };
};
