import { strings } from "@angular-devkit/core";
import {
  apply,
  applyTemplates,
  filter,
  MergeStrategy,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicContext,
  Tree,
  url,
} from "@angular-devkit/schematics";

import { Schematic } from "@enums/Schematic";

import { Schema } from "../cognito/schema";

export const cloudAuthenticationIdentityProviderGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const { isFacebook, isGoogle, isApple } = options;
    return mergeWith(
      apply(url("./files"), [
        isFacebook ? noop() : filter((path) => !path.includes("facebookIdentity")),
        isGoogle ? noop() : filter((path) => !path.includes("googleIdentity")),
        isApple ? noop() : filter((path) => !path.includes("appleIdentity")),
        applyTemplates({
          ...options,
          ...strings,
        }),
        move(`${Schematic.CLOUD}/lib/authentication/identityProviders`),
      ]),
      MergeStrategy.Overwrite,
    )(tree, _context);
  };
};
