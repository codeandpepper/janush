import { strings } from "@angular-devkit/core";
import {
  Rule,
  chain,
  mergeWith,
  apply,
  url,
  applyTemplates,
  move,
  MergeStrategy,
  schematic,
  SchematicContext,
  Tree,
} from "@angular-devkit/schematics";

import { Schematic } from "@enums/Schematic";
import { AppSyncConstructBuilder } from "@janush-schematics/cloud/api/appsync/appSyncConstructBuilder";
import { readJanushJSON } from "@utility/janushJson";

import { Schema } from "./schema";

export const appSyncApiGenerator = (options: Schema): Rule => {
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
          move(`${Schematic.CLOUD}/lib/api`),
        ]),
        MergeStrategy.Overwrite,
      ),
      constructBuilder.addToCloudStack(),
      schematic("applyPrettier", {}),
    ]);
  };
};
