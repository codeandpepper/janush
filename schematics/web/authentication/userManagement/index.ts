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

import { Schematic } from "@enums/Schematic";

import { Schema } from "../schema";

export const userManagementGenerator = (options: Schema): Rule => {
  return (_tree: Tree, _context: SchematicContext) => {
    return chain([
      mergeWith(
        apply(url("./files"), [
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
