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

import { readJanushJSON } from "../../utility/janush-json";

import { Schema } from "./schema";
import { Schematic } from "../../../types/enums/Schematic";

export const cloudAuthorizationGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const janushFile = readJanushJSON(tree);

    options.name = strings.dasherize(janushFile.name);

    return mergeWith(
      apply(url("./files"), [
        applyTemplates({
          ...options,
          ...strings,
        }),
        move(Schematic.CLOUD),
      ]),
      MergeStrategy.Overwrite,
    );
  };
};
