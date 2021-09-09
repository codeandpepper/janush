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

import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";

import { readJanushJSON, updateJanushJSON } from "../../utils/janush";

import { Schematic } from "../../types/enum/Schematic";
import { Schema } from "./schema";

export const webGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const name = strings.dasherize(options.name);
    const sourceTemplates = url("./files");

    const janushFile = readJanushJSON(tree);

    updateJanushJSON(tree, {
      ...janushFile,
      web: true,
    });

    if (options.install)
      _context.addTask(
        new NodePackageInstallTask({
          workingDirectory: `${name}/${Schematic.WEB}`,
          hideOutput: false,
        }),
        [],
      );

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
