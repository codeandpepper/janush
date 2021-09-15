import {
  apply,
  applyTemplates,
  mergeWith,
  Rule,
  SchematicContext,
  Tree,
  url,
} from "@angular-devkit/schematics";
import { strings } from "@angular-devkit/core";

import { readJanushJSON, updateJanushJSON } from "@utility/janush-json";
import { installDependencies } from "@utility/scripts";

import { Schematic } from "@enums/Schematic";
import { Schema } from "./schema";

export const cloudTemplateGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const name = strings.dasherize(options.name);
    const sourceTemplates = url("./files");

    const janushFile = readJanushJSON(tree);

    updateJanushJSON(tree, {
      ...janushFile,
      cloud: true,
    });

    if (!options.skipInstall) {
      _context.addTask(installDependencies(`${name}/${Schematic.CLOUD}`), []);
    }

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
