import {
  apply,
  applyTemplates,
  chain,
  mergeWith,
  noop,
  Rule,
  schematic,
  SchematicContext,
  Tree,
  url,
} from "@angular-devkit/schematics";

import { dasherize } from "@angular-devkit/core/src/utils/strings";
import { strings } from "@angular-devkit/core";

import { Schematic } from "../../types/enum/Schematic";
import { Schema } from "./schema";

export const isCloud = (options: Schema) => options.types.includes(Schematic.CLOUD);
export const isWeb = (options: Schema) => options.types.includes(Schematic.WEB);

export const applicationGenerator = (options: Schema): Rule => {
  return (_: Tree, _context: SchematicContext) => {
    const sourceTemplates = url("./files");

    console.log(__dirname);

    return chain([
      mergeWith(
        apply(sourceTemplates, [
          applyTemplates({
            ...options,
            ...strings,
          }),
        ]),
      ),
      isCloud(options)
        ? schematic(Schematic.CLOUD, options, { scope: dasherize(options.name) })
        : noop(),
      isWeb(options)
        ? schematic(Schematic.WEB, options, { scope: dasherize(options.name) })
        : noop(),
    ]);
  };
};
