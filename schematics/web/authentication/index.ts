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
import { addPackageJsonDependency } from "@schematics/angular/utility/dependencies";

import { WEB_PACKAGE_JSON_PATH } from "@consts/index";
import { Schematic, WebSchematic } from "@enums/Schematic";
import { webJanushAuthenticationNodeDependencies } from "@utils/dependencies";

import { Schema } from "./schema";
import { packageJsonExtender } from "./utils/packageJsonExtender";
import { tsConfigExtender } from "./utils/tsConfigExtender";

export const webAuthenticationGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    for (const nodeDependency of webJanushAuthenticationNodeDependencies) {
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
        MergeStrategy.Default,
      ),
      options.idP.length ? schematic(WebSchematic.IDP, options) : noop(),
      options.userManagement ? schematic(WebSchematic.USER_MANAGEMENT, options) : noop(),
      packageJsonExtender,
      tsConfigExtender,
    ]);
  };
};
