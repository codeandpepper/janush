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
import { addPackageJsonDependency } from "@schematics/angular/utility/dependencies";

import { CLOUD_PACKAGE_JSON_PATH } from "@consts/index";
import { Schematic } from "@enums/Schematic";
import { readJanushJSON } from "@utility/janushJson";
import { janushTemplateNodeDependencies } from "@utils/dependencies";

import { Schema } from "./schema";

export const cloudJanushGenerator = (options: Schema): Rule => {
  return async (tree: Tree, _context: SchematicContext) => {
    const janushFile = readJanushJSON(tree);

    options.name = strings.dasherize(janushFile.name);

    for (const nodeDependency of janushTemplateNodeDependencies) {
      addPackageJsonDependency(tree, nodeDependency, CLOUD_PACKAGE_JSON_PATH);
    }

    return chain([
      mergeWith(
        apply(url("./files"), [
          applyTemplates({
            ...options,
            ...strings,
          }),
          move(Schematic.CLOUD),
        ]),
        MergeStrategy.Overwrite,
      ),
      /*
       * TODO add conditionals inside servicePurpose.ts.template based
       *  on chosen elements in schema
       * */
      mergeWith(
        apply(url("./otherFiles/servicePurpose"), [
          applyTemplates({
            ...options,
            ...strings,
          }),
          move(`${Schematic.CLOUD}/enums`),
        ]),
        MergeStrategy.Overwrite,
      ),
      schematic("applyPrettier", {}),
    ]);
  };
};
