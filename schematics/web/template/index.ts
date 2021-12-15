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

import { Schematic, WebSchematic } from "@enums/Schematic";
import { Schema } from "./schema";
import { Module } from "@enums/Module";

const isEmptyModules = (options: Schema) => options.modules.length === 0;
const isAuthenticationModule = (options: Schema) =>
  options.modules.includes(Module.AUTHENTICATION);

export const webTemplateGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const janushFile = readJanushJSON(tree);

    const name = strings.dasherize(janushFile.name);

    const workingDirectory = `${name}/${Schematic.WEB}`;

    if (!options.skipInstall) {
      _context.addTask(installDependencies(workingDirectory), []);
    }

    if (!isEmptyModules(options)) {
      janushFile.web.module[Module.AUTHENTICATION] =
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
          move(Schematic.WEB),
        ]),
        MergeStrategy.Overwrite
      ),
      !isEmptyModules(options)
        ? schematic(WebSchematic.JANUSH, {
            name: options.name,
          })
        : noop(),
      isAuthenticationModule(options)
        ? schematic(WebSchematic.AUTHENTICATION, options)
        : noop(),
    ]);
  };
};
