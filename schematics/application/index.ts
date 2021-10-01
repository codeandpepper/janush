import {
  apply,
  applyTemplates,
  chain,
  MergeStrategy,
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

import { Schematic } from "@enums/Schematic";
import { Schema } from "./schema";

export const isCloud = (options: Schema) =>
  options.types.includes(Schematic.CLOUD);
export const isWeb = (options: Schema) => options.types.includes(Schematic.WEB);

export const applicationGenerator = (options: Schema): Rule => {
  return (_: Tree, _context: SchematicContext) => {
    const scope = dasherize(options.name);

    return chain([
      mergeWith(
        apply(url("./files"), [
          applyTemplates({
            ...options,
            ...strings,
          }),
        ]),
        MergeStrategy.Overwrite
      ),
      isCloud(options)
        ? schematic(Schematic.CLOUD, options, { scope })
        : noop(),
      isWeb(options) ? schematic(Schematic.WEB, options, { scope }) : noop(),
    ]);
  };
};
