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
import { strings } from "@angular-devkit/core";

import { readJanushJSON } from "@utility/janush-json";

import { addCognitoConstructToCloudStack } from "./utils";

import { CloudSchematic, Schematic } from "@enums/Schematic";
import { Janush } from "@interfaces/Janush";
import { Schema } from "./schema";

const checkModuleExists = (janush: Janush) =>
  Object.entries(janush.cloud.module).some(([_, moduleExist]) => moduleExist);

export const cloudAuthenticationCognitoGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const janushFile = readJanushJSON(tree);

    const name = strings.dasherize(janushFile.name);

    options.name = name;

    return chain([
      !checkModuleExists(janushFile)
        ? schematic(CloudSchematic.JANUSH, {
            name,
          })
        : noop(),
      mergeWith(
        apply(url("./files"), [
          applyTemplates({
            ...options,
            ...strings,
          }),
          move(`${Schematic.CLOUD}/lib/authentication`),
        ]),
        MergeStrategy.Overwrite
      ),
      // TODO temporary solution for service purpose enum with one module (authentication),
      //  when other modules come need to move this into "addCognitoConstructCToCloudStack" function
      mergeWith(
        apply(url("./other-files/service-purpose"), [
          applyTemplates({
            ...options,
            ...strings,
          }),
          move(`${Schematic.CLOUD}/enums`),
        ]),
        MergeStrategy.Overwrite
      ),
      addCognitoConstructToCloudStack(name),
      options.emails
        ? schematic(CloudSchematic.AUTHENTICATION_EMAILS, { name })
        : noop(),
    ]);
  };
};
