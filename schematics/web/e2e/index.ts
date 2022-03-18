import { chain, noop, Rule, schematic, SchematicContext, Tree } from "@angular-devkit/schematics";

import { WebE2ESchematic } from "@enums/Schematic";
import { Schema } from "./schema";

export const e2eGate = (options: Schema): Rule => {
  return (_tree: Tree, _context: SchematicContext) => {
    return chain([options.e2e ? schematic(WebE2ESchematic.FRAMEWORK, options) : noop()]);
  };
};
