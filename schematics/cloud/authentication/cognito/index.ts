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

import { IdentityProviders, UsersManagement } from "@enums/Module";
import { CloudSchematic, Schematic } from "@enums/Schematic";
import { Janush } from "@interfaces/Janush";
import { readJanushJSON } from "@utility/janushJson";

import { Schema } from "./schema";
import { addCognitoConstructToCloudStack, addEnvironmentValidation } from "./utils";

const { FACEBOOK, GOOGLE, APPLE } = IdentityProviders;
const { DEFAULT_GROUPS } = UsersManagement;
const checkModuleExists = (janush: Janush) =>
  Object.entries(janush.cloud.module).some(([_, moduleExist]) => moduleExist);

export const cloudAuthenticationCognitoGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const janushFile = readJanushJSON(tree);

    const name = strings.dasherize(janushFile.name);

    options.name = name;
    options.timeStamp = new Date().getTime().toString();
    options.isFacebook = options.idP.includes(FACEBOOK);
    options.isGoogle = options.idP.includes(GOOGLE);
    options.isApple = options.idP.includes(APPLE);
    options.defaultGroups = options.usersManagement.includes(DEFAULT_GROUPS);

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
        MergeStrategy.Overwrite,
      ),
      mergeWith(
        apply(url("./otherFiles/env"), [
          applyTemplates({
            ...options,
            ...strings,
          }),
          move(Schematic.CLOUD),
        ]),
        MergeStrategy.Overwrite,
      ),
      mergeWith(
        apply(url("./otherFiles/envValidation"), [
          applyTemplates({
            ...options,
            ...strings,
          }),
          move(`${Schematic.CLOUD}/bin/environment`),
        ]),
        MergeStrategy.Overwrite,
      ),
      addEnvironmentValidation(),
      addCognitoConstructToCloudStack(name),
      options.emails ? schematic(CloudSchematic.AUTHENTICATION_EMAILS, { name }) : noop(),
      options.idP.length ? schematic(CloudSchematic.AUTHENTICATION_IDP, options) : noop(),
      options.usersManagement.length
        ? schematic(CloudSchematic.AUTHENTICATION_USERS_MANAGEMENT, options)
        : noop(),
      schematic("applyPrettier", {}),
    ]);
  };
};
