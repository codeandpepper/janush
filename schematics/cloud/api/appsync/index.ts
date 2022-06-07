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

import { CloudSchematic, Schematic } from "@enums/Schematic";
import { addAppSyncConstructToCloudStack } from "@janush-schematics/cloud/api/appsync/utils";
import { readJanushJSON } from "@utility/janushJson";

import { Schema } from "./schema";

export const appSyncApiGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const janushFile = readJanushJSON(tree);
    const name = strings.dasherize(janushFile.name);

    options.name = name;

    return chain([
      mergeWith(
        apply(url("./files"), [
          applyTemplates({
            ...strings,
          }),
          move(`${Schematic.CLOUD}/lib/api`),
        ]),
        MergeStrategy.Overwrite,
      ),
      addAppSyncConstructToCloudStack(name),
      schematic(CloudSchematic.API, { name }),
      schematic("applyPrettier", {}),
    ]);
  };
};
