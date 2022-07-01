import { strings } from "@angular-devkit/core";
import {
  apply,
  applyTemplates,
  chain,
  // filter,
  MergeStrategy,
  mergeWith,
  move,
  // noop,
  Rule,
  schematic,
  SchematicContext,
  Tree,
  url,
} from "@angular-devkit/schematics";

import { Module } from "@enums/Module";
import { Schematic } from "@enums/Schematic";

import { Schema } from "../schema";

export const userManagementGenerator = (options: Schema): Rule => {
  const isAuth = options.modules.includes(Module.AUTHENTICATION);

  return (_tree: Tree, _context: SchematicContext) => {
    return chain([
      mergeWith(
        apply(url("./files"), [
          applyTemplates({
            isAuth,
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
