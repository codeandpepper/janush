import {
  apply,
  applyTemplates,
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

import { readJanushJSON } from "../../utility/janush-json";

import { JanushTemplateNodeDependencies } from "../../../utils/dependencies";

import { CLOUD_PACKAGE_JSON_PATH } from "../../../const/index";

import { Schematic } from "../../../types/enums/Schematic";
import { Schema } from "./schema";

export const cloudJanushGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const janushFile = readJanushJSON(tree);

    options.name = strings.dasherize(janushFile.name);

    for (let nodeDependency of JanushTemplateNodeDependencies) {
      addPackageJsonDependency(tree, nodeDependency, CLOUD_PACKAGE_JSON_PATH);
    }

    return mergeWith(
      apply(url("./files"), [
        applyTemplates({
          ...options,
          ...strings,
        }),
        move(Schematic.CLOUD),
      ]),
      MergeStrategy.Overwrite,
    );
  };
};
