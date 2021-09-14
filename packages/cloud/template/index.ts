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
import { installDependencies } from "../../utility/scripts";

import { CloudSchematic, Schematic } from "../../../types/enums/Schematic";
import { Module } from "../../../types/enums/Module";

import { Schema } from "./schema";

const isEmptyModules = (options: Schema) => options.modules.length === 0;
const isAuthorizationModule = (options: Schema) => options.modules.includes(Module.AUTHORIZATION);

export const cloudTemplateGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const janushFile = readJanushJSON(tree);

    const name = strings.dasherize(janushFile.name);

    const workingDirectory = `${name}/${Schematic.CLOUD}`;

    if (!options.skipInstall) {
      _context.addTask(installDependencies(workingDirectory), []);
    }

    return chain([
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
      !isEmptyModules(options)
        ? schematic(CloudSchematic.JANUSH, {
            name: options.name,
          })
        : noop(),
      isAuthorizationModule(options) ? schematic(CloudSchematic.AUTHORIZATION, options) : noop(),
    ]);
  };
};
