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

import { readJanushJSON, updateJanushJSON } from "@utility/janush-json";
import { installDependencies } from "@utility/scripts";

import { CloudSchematic, Schematic } from "@enums/Schematic";
import { Module } from "@enums/Module";

import { Schema } from "./schema";

const isEmptyModules = (options: Schema) => options.modules.length === 0;
const isAuthenticationModule = (options: Schema) =>
  options.modules.includes(Module.AUTHENTICATION);

export const cloudTemplateGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    let janushFile = readJanushJSON(tree);

    const name = strings.dasherize(janushFile.name);

    const workingDirectory = `${name}/${Schematic.CLOUD}`;

    if (!isEmptyModules(options)) {
      janushFile.cloud.module[Module.AUTHENTICATION] =
        isAuthenticationModule(options);
      updateJanushJSON(tree, janushFile);
    }

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
        MergeStrategy.Overwrite
      ),
      !isEmptyModules(options)
        ? schematic(CloudSchematic.JANUSH, {
            name: options.name,
          })
        : noop(),
      isAuthenticationModule(options)
        ? schematic(CloudSchematic.AUTHENTICATION, options)
        : noop(),
    ]);
  };
};
