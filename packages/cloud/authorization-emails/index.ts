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

import { Schematic } from "@enums/Schematic";

import { Schema } from "./schema";

import { authorizationEmailsNodeDependencies } from "@utils/dependencies";
import { CLOUD_PACKAGE_JSON_PATH } from "@consts/index";

export const cloudAuthorizationEmailsGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const janushFile = readJanushJSON(tree);

    const name = strings.dasherize(janushFile.name);

    options.name = name;

    for (let nodeDependency of authorizationEmailsNodeDependencies) {
      addPackageJsonDependency(tree, nodeDependency, CLOUD_PACKAGE_JSON_PATH);
    }

    return chain([
      mergeWith(
        apply(url("./files"), [
          applyTemplates({
            ...options,
            ...strings,
          }),
          move(`${Schematic.CLOUD}/lib/authorization/emails`),
        ]),
        MergeStrategy.Overwrite,
      ),
      mergeWith(
        apply(url("./other-files/enums"), [
          applyTemplates({
            ...options,
            ...strings,
          }),
          move(`${Schematic.CLOUD}/enums`),
        ]),
        MergeStrategy.Overwrite,
      ),
    ]);
  };
};
