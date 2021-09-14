import {
  apply,
  applyTemplates,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  noop,
  Rule,
  schematic,
  SchematicContext,
  Tree,
  url,
} from "@angular-devkit/schematics";
import { strings } from "@angular-devkit/core";

import { readJanushJSON } from "../../utility/janush-json";

import { Schema } from "./schema";
import { CloudSchematic, Schematic } from "../../../types/enums/Schematic";
import { Janush } from "../../../types/interfaces/Janush";

const checkModuleExists = (janush: Janush) =>
  Object.entries(janush.cloud.module).some(([_, moduleExist]) => moduleExist);

export const cloudAuthorizationGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const janushFile = readJanushJSON(tree);

    const name = strings.dasherize(janushFile.name);

    options.name = name;

    return chain([
      !checkModuleExists(janushFile)
        ? schematic(CloudSchematic.JANUSH, {
            name,
          })
        : noop(),
      mergeWith(
        apply(url("./files"), [
          applyTemplates({
            ...options,
            ...strings,
          }),
          move(Schematic.CLOUD),
        ]),
        MergeStrategy.Overwrite,
      ),
    ]);
  };
};
