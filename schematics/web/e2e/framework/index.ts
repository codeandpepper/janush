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

import { WEB_PACKAGE_JSON_PATH } from "@consts/index";
import { E2ERunner, Module } from "@enums/Module";
import { Schematic } from "@enums/Schematic";
import { stubArg } from "@janush-schematics/utility/stubArg/stubArg";
import { e2eCypressDependencies, e2ePlaywrightDependencies } from "@utils/dependencies";

import { Schema } from "./schema";
import { packageJsonExtender as packageJsonCypressExtender } from "./utils/cypress/packageJsonExtender";
import { packageJsonExtender as packageJsonPlaywrightExtender } from "./utils/playwright/packageJsonExtender";
import { tsConfigExtender as tsConfigPlaywrightExtender } from "./utils/playwright/tsConfigExtender";

export const e2eFrameworkGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    switch (options.e2eModule) {
      case E2ERunner.CYPRESS:
        for (const nodeDependency of e2eCypressDependencies) {
          addPackageJsonDependency(tree, nodeDependency, WEB_PACKAGE_JSON_PATH);
        }

        return chain([
          mergeWith(
            apply(url("./files/cypress/base"), [
              applyTemplates({
                ...options,
                ...strings,
              }),
              move(`${Schematic.WEB}/cypress`),
            ]),
            MergeStrategy.Overwrite,
          ),
          options.modules.includes(Module.AUTHENTICATION)
            ? mergeWith(
                apply(url("./files/shared/selectors"), [
                  applyTemplates({
                    ...options,
                    ...strings,
                  }),
                  move(`${Schematic.WEB}/cypress/support/selectors`),
                ]),
              )
            : stubArg,
          options.modules.includes(Module.AUTHENTICATION)
            ? mergeWith(
                apply(url("./files/cypress/authentication"), [
                  applyTemplates({
                    ...options,
                    ...strings,
                  }),
                  move(`${Schematic.WEB}/cypress`),
                ]),
                MergeStrategy.Overwrite,
              )
            : stubArg,
          packageJsonCypressExtender,
          schematic("applyPrettier", {}),
        ]);

      case E2ERunner.PLAYWRIGHT:
        for (const nodeDependency of e2ePlaywrightDependencies) {
          addPackageJsonDependency(tree, nodeDependency, WEB_PACKAGE_JSON_PATH);
        }

        return chain([
          mergeWith(
            apply(url("./files/playwright/base"), [
              applyTemplates({
                ...options,
                ...strings,
              }),
              move(`${Schematic.WEB}/playwright`),
            ]),
            MergeStrategy.Overwrite,
          ),
          options.modules.includes(Module.AUTHENTICATION)
            ? mergeWith(
                apply(url("./files/shared/selectors"), [
                  applyTemplates({
                    ...options,
                    ...strings,
                  }),
                  move(`${Schematic.WEB}/playwright/page-objects/selectors`),
                ]),
                MergeStrategy.Overwrite,
              )
            : stubArg,
          options.modules.includes(Module.AUTHENTICATION)
            ? mergeWith(
                apply(url("./files/playwright/authentication"), [
                  applyTemplates({
                    ...options,
                    ...strings,
                  }),
                  move(`${Schematic.WEB}/playwright`),
                ]),
                MergeStrategy.Overwrite,
              )
            : stubArg,
          packageJsonPlaywrightExtender,
          tsConfigPlaywrightExtender,
          schematic("applyPrettier", {}),
        ]);
      default:
        throw new Error("E2E schema misconfiguration");
    }
  };
};
