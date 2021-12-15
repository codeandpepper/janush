import {
  apply,
  applyTemplates,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  Tree,
  url,
} from "@angular-devkit/schematics";
import { strings } from "@angular-devkit/core";

import { addPackageJsonDependency } from "@schematics/angular/utility/dependencies";
import { readJanushJSON } from "@utility/janush-json";

import { janushTemplateNodeDependencies } from "@utils/dependencies";

import { CLOUD_PACKAGE_JSON_PATH } from "@consts/index";

import { Schematic } from "@enums/Schematic";
import { Schema } from "./schema";

export const cloudJanushGenerator = (options: Schema): Rule => {
  return async (tree: Tree, _context: SchematicContext) => {
    const janushFile = readJanushJSON(tree);

    options.name = strings.dasherize(janushFile.name);

    for (let nodeDependency of janushTemplateNodeDependencies) {
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
        MergeStrategy.Overwrite
      ),
    ]);
  };
};
