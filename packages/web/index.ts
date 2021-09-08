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

import { readJanushJSON, updateJanushJSON } from "../../utils/janush";

import { Schema } from "./schema";

export const webGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const sourceTemplates = url("./files");

    if (!options.name) {
      throw new SchematicsException(`Invalid options, "name" is required.`);
    }

    const janushFile = readJanushJSON(tree);
    updateJanushJSON(tree, {
      ...janushFile,
      web: true,
    });

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
