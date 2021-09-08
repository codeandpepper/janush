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

export const cloudGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    if (!options.name) {
      throw new SchematicsException(`Invalid options, "name" is required.`);
    }

    const janushFile = readJanushJSON(tree);

    updateJanushJSON(tree, {
      ...janushFile,
      cloud: true,
    });

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
