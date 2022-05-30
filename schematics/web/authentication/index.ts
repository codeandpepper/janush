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
import { readJanushJSON } from "@utility/janushJson";
import { webJanushAuthenticationNodeDependencies } from "@utils/dependencies";

import { authenticationChanges } from "../../web/authentication/utils";
import { Schema } from "./schema";

export const webAuthenticationGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const janushFile = readJanushJSON(tree);

    const name = strings.dasherize(janushFile.name);

    options.name = name;

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
      ...authenticationChanges(name),
      options.idP.length ? schematic(WebSchematic.IDP, options) : noop(),
    ]);
  };
};
