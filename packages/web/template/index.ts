import {
  apply,
  applyTemplates,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  Tree,
  url,
} from "@angular-devkit/schematics";
import { strings } from "@angular-devkit/core";

import { readJanushJSON } from "@utility/janush-json";
import { installDependencies } from "@utility/scripts";

import { Schematic } from "@enums/Schematic";
import { Schema } from "./schema";

export const webTemplateGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const janushFile = readJanushJSON(tree);

    const name = strings.dasherize(janushFile.name);

    const workingDirectory = `${name}/${Schematic.CLOUD}`;

    if (!options.skipInstall) {
      _context.addTask(installDependencies(workingDirectory), []);
    }

    return mergeWith(
      apply(url("./files"), [
        applyTemplates({
          ...options,
          ...strings,
        }),
        move(Schematic.WEB),
      ])
    );
  };
};
