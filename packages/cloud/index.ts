import {
  apply,
  applyTemplates,
  mergeWith,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  url,
} from "@angular-devkit/schematics";
import { strings } from "@angular-devkit/core";

import { Schema } from "./schema";

export const cloudGenerator = (options: Schema): Rule => {
  return (_: Tree, _context: SchematicContext) => {
    if (!options.name) {
      throw new SchematicsException(`Invalid options, "name" is required.`);
    }

    const sourceTemplates = url("./files");

    return mergeWith(
      apply(sourceTemplates, [
        applyTemplates({
          ...options,
          ...strings,
        }),
      ]),
    );
  };
};
