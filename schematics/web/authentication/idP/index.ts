import { strings } from "@angular-devkit/core";
import {
  apply,
  applyTemplates,
  chain,
  filter,
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

import { IdentityProviders } from "@enums/Module";
import { Schematic } from "@enums/Schematic";

import { Schema } from "../schema";

const { FACEBOOK, GOOGLE, APPLE } = IdentityProviders;

export const identityProvidersGenerator = (options: Schema): Rule => {
  return (_tree: Tree, _context: SchematicContext) => {
    const isFacebook = options.idP.includes(FACEBOOK);
    const isGoogle = options.idP.includes(GOOGLE);
    const isApple = options.idP.includes(APPLE);

    return chain([
      mergeWith(
        apply(url("./files"), [
          isFacebook ? noop() : filter((path) => !path.includes("FacebookIcon")),
          isGoogle ? noop() : filter((path) => !path.includes("GoogleIcon")),
          isApple ? noop() : filter((path) => !path.includes("AppleIcon")),
          applyTemplates({
            ...strings,
            ...options,
          }),
          move(Schematic.WEB),
        ]),
        MergeStrategy.Overwrite,
      ),
      schematic("applyPrettier", {}),
    ]);
  };
};
