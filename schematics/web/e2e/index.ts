import { strings } from "@angular-devkit/core";
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

import { WEB_PACKAGE_JSON_PATH } from "@consts/index";
import { Schematic } from "@enums/Schematic";
import { addPackageJsonDependency } from "@schematics/angular/utility/dependencies";
import { readJanushJSON } from "@utility/janush-json";
import { webJanushAuthenticationNodeDependencies } from "@utils/dependencies";
import { authenticationChanges } from "../../web/authentication/utils";
import { Schema } from "../authentication/schema";

export const webAuthenticationGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const janushFile = readJanushJSON(tree);

    const name = strings.dasherize(janushFile.name);

    options.name = name;

    for (let nodeDependency of webJanushAuthenticationNodeDependencies) {
      addPackageJsonDependency(tree, nodeDependency, WEB_PACKAGE_JSON_PATH);
    }

    return chain([
      mergeWith(
        apply(url("./files"), [
          applyTemplates({
            ...options,
            ...strings,
          }),
          move(Schematic.WEB),
        ]),
        MergeStrategy.Overwrite
      ),
      ...authenticationChanges(name),
    ]);
  };
};
