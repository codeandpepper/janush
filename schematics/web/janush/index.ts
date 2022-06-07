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

import { Module } from "@enums/Module";
import { Schematic, WebSchematic } from "@enums/Schematic";

import { Schema } from "../template/schema";

export const webJanushGenerator = (options: Schema): Rule => {
  return (_tree: Tree, _context: SchematicContext) => {
    const isEmptyModules = options.modules.length === 0;
    if (isEmptyModules) return noop();

    const isAuth = options.modules.includes(Module.AUTHENTICATION);

    return chain([
      mergeWith(
        apply(url("./files"), [
          applyTemplates({
            isAuth,
            ...options,
            ...strings,
          }),
          move(Schematic.WEB),
        ]),
        MergeStrategy.Overwrite,
      ),
      isAuth ? schematic(WebSchematic.AUTHENTICATION, options) : noop(),
      schematic("applyPrettier", {}),
    ]);
  };
};
