import {
  apply,
  applyTemplates,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  Tree,
  url,
} from "@angular-devkit/schematics";
import { strings } from "@angular-devkit/core";

import { readJanushJSON } from "@utility/janush-json";

import { Schematic } from "@enums/Schematic";
import { Schema } from "./schema";

export const webJanushGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const janushFile = readJanushJSON(tree);

    options.name = strings.dasherize(janushFile.name);

    return mergeWith(
      apply(url("./files"), [
        applyTemplates({
          ...options,
          ...strings,
        }),
        move(Schematic.WEB),
      ]),
      MergeStrategy.Overwrite
    );
  };
};