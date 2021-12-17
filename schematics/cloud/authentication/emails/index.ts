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

import { CLOUD_PACKAGE_JSON_PATH } from "@consts/index";
import { Schematic } from "@enums/Schematic";
import { addPackageJsonDependency } from "@schematics/angular/utility/dependencies";
import { authenticationEmailsNodeDependencies } from "@utils/dependencies";
import { Schema } from "./schema";
import { addEmailsConstructToCognitoConstruct } from "./utils";

export const cloudAuthenticationEmailsGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    for (let nodeDependency of authenticationEmailsNodeDependencies) {
      addPackageJsonDependency(tree, nodeDependency, CLOUD_PACKAGE_JSON_PATH);
    }

    return chain([
      mergeWith(
        apply(url("./files"), [
          applyTemplates({
            ...options,
            ...strings,
          }),
          move(`${Schematic.CLOUD}/lib/authentication/emails`),
        ]),
        MergeStrategy.Overwrite
      ),
      mergeWith(
        apply(url("./other-files/enums"), [
          applyTemplates({
            ...options,
            ...strings,
          }),
          move(`${Schematic.CLOUD}/enums`),
        ]),
        MergeStrategy.Overwrite
      ),
      addEmailsConstructToCognitoConstruct(),
      schematic("apply-prettier", {}),
    ]);
  };
};
