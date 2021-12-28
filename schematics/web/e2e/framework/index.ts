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

import { WEB_PACKAGE_JSON_PATH } from "@consts/index";
import { E2ERunner } from "@enums/Module";
import { Schematic } from "@enums/Schematic";
import { addPackageJsonDependency } from "@schematics/angular/utility/dependencies";
import { e2eCypressDependencies, e2ePlaywrightDependencies } from "@utils/dependencies";
import { Schema } from "./schema";
import { updatePackageJson } from "./utils/updatePackageJsonForCypress";

export const e2eFrameworkGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    if (options.e2eModule === E2ERunner.CYPRESS) {
      for (let nodeDependency of e2eCypressDependencies) {
        addPackageJsonDependency(tree, nodeDependency, WEB_PACKAGE_JSON_PATH);
      }

      return chain([
        mergeWith(
          apply(url("./files/cypress"), [
            applyTemplates({
              ...options,
              ...strings,
            }),
            move(Schematic.WEB),
          ]),
          MergeStrategy.Overwrite
        ),
        updatePackageJson(),
        schematic("apply-prettier", {}),
      ]);
    } else if (options.e2eModule === E2ERunner.PLAYWRIGHT) {
      for (let nodeDependency of e2ePlaywrightDependencies) {
        addPackageJsonDependency(tree, nodeDependency, WEB_PACKAGE_JSON_PATH);
      }

      return chain([
        mergeWith(
          apply(url("./files/playwright"), [
            applyTemplates({
              ...options,
              ...strings,
            }),
            move(Schematic.WEB),
          ]),
          MergeStrategy.Overwrite
        ),
        updatePackageJson(),
        schematic("apply-prettier", {}),
      ]);
    }

    return tree;
  };
};